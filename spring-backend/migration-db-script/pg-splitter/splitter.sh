#!/bin/bash

set -e

echo "🚀 Iniciando distribución de datos a microservicios..."

# Esperar que pgloader termine completamente
echo "⏳ Esperando que pgloader termine la migración..."
while [ ! -f /shared/ready.flag ]; do
    echo "   - pgloader aún no ha terminado, esperando..."
    sleep 3
done
echo "✅ pgloader ha terminado, continuando con la distribución..."

# Verificar que realmente hay datos migrados
echo "🔍 Contando registros en todas las tablas..."
table_count=$(PGPASSWORD="$SOURCE_PASSWORD" psql \
    -h "$SOURCE_HOST" \
    -p "$SOURCE_PORT" \
    -U "$SOURCE_USER" \
    -d "$SOURCE_DB" \
    -t -c "SELECT COUNT(*) FROM pg_tables WHERE schemaname NOT IN ('information_schema', 'pg_catalog');" | tr -d ' ')

echo "   - Número de tablas encontradas: $table_count"

if [ "$table_count" -eq "0" ]; then
    echo "❌ ERROR: No se encontraron tablas migradas. Verificando estado de pgloader..."
    echo "   - Contenido de /shared/:"
    ls -la /shared/ || echo "   - Error listando /shared/"
    echo "   - Finalizando con error..."
    exit 1
fi

# Función para esperar que un servicio esté disponible
wait_for_service() {
    local host=$1
    local port=$2
    local service_name=$3

    echo "⏳ Esperando que $service_name esté disponible en $host:$port..."

    while ! nc -z "$host" "$port"; do
        echo "   - $service_name no está listo, esperando..."
        sleep 2
    done

    echo "✅ $service_name está disponible"
}

# Función para exportar e importar tablas específicas
migrate_tables() {
    local target_host=$1
    local target_port=$2
    local target_db=$3
    local target_user=$4
    local target_password=$5
    local service_name=$6
    shift 6
    local tables=("$@")

    echo "📊 Migrando tablas a $service_name: ${tables[*]}"

    # Crear directorio temporal para dumps
    mkdir -p /shared/dumps

    for table in "${tables[@]}"; do
        echo "   - Verificando existencia de tabla: $table"

        # Verificar si la tabla existe y en qué schema
        table_exists=$(PGPASSWORD="$SOURCE_PASSWORD" psql \
            -h "$SOURCE_HOST" \
            -p "$SOURCE_PORT" \
            -U "$SOURCE_USER" \
            -d "$SOURCE_DB" \
            -t -c "SELECT schemaname FROM pg_tables WHERE tablename = '$table';" | tr -d ' ')

        if [ -z "$table_exists" ]; then
            echo "   ⚠️  Tabla '$table' no encontrada, saltando..."
            continue
        fi

        echo "   - Tabla '$table' encontrada en schema '$table_exists'"

        # Limpiar tabla existente en destino si existe
        echo "   - Limpiando tabla existente: $table"
        PGPASSWORD="$target_password" psql \
            -h "$target_host" \
            -p "$target_port" \
            -U "$target_user" \
            -d "$target_db" \
            -c "DROP TABLE IF EXISTS public.$table CASCADE;" \
            -q

        echo "   - Exportando tabla: $table"

        # Usar el schema correcto en el pg_dump
        full_table_name="${table_exists}.${table}"

        # Exportar esquema y datos de la tabla
        PGPASSWORD="$SOURCE_PASSWORD" pg_dump \
            -h "$SOURCE_HOST" \
            -p "$SOURCE_PORT" \
            -U "$SOURCE_USER" \
            -d "$SOURCE_DB" \
            --table="$full_table_name" \
            --schema-only \
            --no-comments \
            --no-tablespaces \
            --no-owner \
            --no-privileges \
            > "/shared/dumps/${table}_schema_raw.sql"

        PGPASSWORD="$SOURCE_PASSWORD" pg_dump \
            -h "$SOURCE_HOST" \
            -p "$SOURCE_PORT" \
            -U "$SOURCE_USER" \
            -d "$SOURCE_DB" \
            --table="$full_table_name" \
            --data-only \
            --disable-triggers \
            --no-comments \
            --no-tablespaces \
            --no-owner \
            --no-privileges \
            > "/shared/dumps/${table}_data_raw.sql"

        # Limpiar referencias de schema en datos
        sed 's/classicmodels\./public\./g' "/shared/dumps/${table}_data_raw.sql" > "/shared/dumps/${table}_data.sql"

        # Limpiar el schema dump de parámetros problemáticos y cambiar schema
        grep -v "SET transaction_timeout" "/shared/dumps/${table}_schema_raw.sql" | \
        grep -v "SET xmloption" | \
        grep -v "SET row_security" | \
        sed '/^SET /d; /^SELECT pg_catalog.set_config/d' | \
        sed 's/classicmodels\./public\./g' | \
        sed 's/CREATE SCHEMA classicmodels;//g' | \
        sed '/^CREATE SCHEMA /d' > "/shared/dumps/${table}_schema.sql"

        echo "   - Importando tabla: $table a $service_name"

        # Debug: mostrar primeras líneas del archivo limpio
        echo "   - Primeras 5 líneas del schema limpio:"
        head -5 "/shared/dumps/${table}_schema.sql" | sed 's/^/     /'

        echo "   - Primeras 5 líneas de los datos limpios:"
        head -5 "/shared/dumps/${table}_data.sql" | sed 's/^/     /'

        # Importar esquema
        PGPASSWORD="$target_password" psql \
            -h "$target_host" \
            -p "$target_port" \
            -U "$target_user" \
            -d "$target_db" \
            -f "/shared/dumps/${table}_schema.sql" \
            -v ON_ERROR_STOP=1 \
            -q

        # Importar datos
        PGPASSWORD="$target_password" psql \
            -h "$target_host" \
            -p "$target_port" \
            -U "$target_user" \
            -d "$target_db" \
            -f "/shared/dumps/${table}_data.sql" \
            -v ON_ERROR_STOP=1 \
            -q

        # Limpiar archivos temporales de esta tabla
        rm -f "/shared/dumps/${table}_schema_raw.sql" "/shared/dumps/${table}_data_raw.sql"
    done

    echo "✅ Migración completada para $service_name"
}

# Esperar que la base de datos fuente esté lista
wait_for_service "$SOURCE_HOST" "$SOURCE_PORT" "PostgreSQL-Source"

# Listar tablas disponibles para debugging
echo "🔍 Listando tablas disponibles en la base de datos fuente..."
PGPASSWORD="$SOURCE_PASSWORD" psql \
    -h "$SOURCE_HOST" \
    -p "$SOURCE_PORT" \
    -U "$SOURCE_USER" \
    -d "$SOURCE_DB" \
    -c "SELECT schemaname, tablename FROM pg_tables WHERE schemaname NOT IN ('information_schema', 'pg_catalog') ORDER BY schemaname, tablename;" \
    -t

# También listar todas las bases de datos disponibles
echo "🔍 Listando bases de datos disponibles..."
PGPASSWORD="$SOURCE_PASSWORD" psql \
    -h "$SOURCE_HOST" \
    -p "$SOURCE_PORT" \
    -U "$SOURCE_USER" \
    -d "$SOURCE_DB" \
    -c "SELECT datname FROM pg_database WHERE datistemplate = false;" \
    -t

# Intentar conectar a la base de datos específica
echo "🔍 Verificando conectividad a la base de datos específica..."
PGPASSWORD="$SOURCE_PASSWORD" psql \
    -h "$SOURCE_HOST" \
    -p "$SOURCE_PORT" \
    -U "$SOURCE_USER" \
    -d "$SOURCE_DB" \
    -c "SELECT current_database(), current_user, version();" \
    2>&1

# Intentar en otra base de datos común
echo "🔍 Verificando en base de datos 'postgres'..."
PGPASSWORD="$SOURCE_PASSWORD" psql \
    -h "$SOURCE_HOST" \
    -p "$SOURCE_PORT" \
    -U "$SOURCE_USER" \
    -d "postgres" \
    -c "SELECT schemaname, tablename FROM pg_tables WHERE schemaname NOT IN ('information_schema', 'pg_catalog') ORDER BY schemaname, tablename;" \
    -t

# Verificar si pgloader realmente terminó exitosamente
echo "🔍 Verificando logs de pgloader..."
if [ -f /shared/pgloader.log ]; then
    echo "   - Contenido completo del log de pgloader:"
    cat /shared/pgloader.log
    echo "   - Fin del log de pgloader"
else
    echo "   - No se encontró log de pgloader"
fi

# Verificar el archivo de configuración de pgloader
echo "🔍 Verificando configuración de pgloader..."
if [ -f /shared/migracion.load ]; then
    echo "   - Contenido de migracion.load:"
    cat /shared/migracion.load
else
    echo "   - No se encontró migracion.load en /shared/"
fi

# Verificar si hay algún indicador de error
echo "🔍 Verificando estado de migración..."
ls -la /shared/

# Esperar que los microservicios estén disponibles
wait_for_service "$MS_CUSTOMERS_HOST" "$MS_CUSTOMERS_PORT" "MS-Customers"
wait_for_service "$MS_ORDERS_HOST" "$MS_ORDERS_PORT" "MS-Orders"
wait_for_service "$MS_PRODUCTS_HOST" "$MS_PRODUCTS_PORT" "MS-Products"

echo "🔄 Todos los servicios están disponibles, iniciando migración..."

# Definir qué tablas van a cada microservicio
# Basado en el SQL proporcionado

# Microservicio de Customers
CUSTOMERS_TABLES=(
    "customers"
    "employees"
    "offices"
)

# Microservicio de Orders
ORDERS_TABLES=(
    "orders"
    "orderdetails"
    "payments"
)

# Microservicio de Products
PRODUCTS_TABLES=(
    "products"
    "productlines"
)

# Ejecutar migraciones
migrate_tables "$MS_CUSTOMERS_HOST" "$MS_CUSTOMERS_PORT" "$MS_CUSTOMERS_DB" "$MS_CUSTOMERS_USER" "$MS_CUSTOMERS_PASSWORD" "MS-Customers" "${CUSTOMERS_TABLES[@]}"

migrate_tables "$MS_ORDERS_HOST" "$MS_ORDERS_PORT" "$MS_ORDERS_DB" "$MS_ORDERS_USER" "$MS_ORDERS_PASSWORD" "MS-Orders" "${ORDERS_TABLES[@]}"

migrate_tables "$MS_PRODUCTS_HOST" "$MS_PRODUCTS_PORT" "$MS_PRODUCTS_DB" "$MS_PRODUCTS_USER" "$MS_PRODUCTS_PASSWORD" "MS-Products" "${PRODUCTS_TABLES[@]}"

echo "🎉 ¡Distribución de datos completada exitosamente!"

# Limpiar archivos temporales
rm -rf /shared/dumps

# Verificar si se migraron tablas antes de ejecutar FK management
migrated_tables=0
for service_name in "MS-Customers" "MS-Orders" "MS-Products"; do
    # Aquí podrías agregar lógica para contar tablas migradas por servicio
    # Por simplicidad, verificamos si alguna tabla existe en algún servicio
    case $service_name in
        "MS-Customers")
            tables=("${CUSTOMERS_TABLES[@]}")
            host="$MS_CUSTOMERS_HOST"
            port="$MS_CUSTOMERS_PORT"
            db="$MS_CUSTOMERS_DB"
            user="$MS_CUSTOMERS_USER"
            password="$MS_CUSTOMERS_PASSWORD"
            ;;
        "MS-Orders")
            tables=("${ORDERS_TABLES[@]}")
            host="$MS_ORDERS_HOST"
            port="$MS_ORDERS_PORT"
            db="$MS_ORDERS_DB"
            user="$MS_ORDERS_USER"
            password="$MS_ORDERS_PASSWORD"
            ;;
        "MS-Products")
            tables=("${PRODUCTS_TABLES[@]}")
            host="$MS_PRODUCTS_HOST"
            port="$MS_PRODUCTS_PORT"
            db="$MS_PRODUCTS_DB"
            user="$MS_PRODUCTS_USER"
            password="$MS_PRODUCTS_PASSWORD"
            ;;
    esac

    for table in "${tables[@]}"; do
        table_exists=$(PGPASSWORD="$password" psql \
            -h "$host" \
            -p "$port" \
            -U "$user" \
            -d "$db" \
            -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_name = '$table';" 2>/dev/null | tr -d ' ')

        if [ "$table_exists" = "1" ]; then
            migrated_tables=$((migrated_tables + 1))
        fi
    done
done

echo "📊 Total de tablas migradas: $migrated_tables"

# Ejecutar manejo de foreign keys solo si hay tablas migradas
if [ "$migrated_tables" -gt "0" ] && [ -f "/usr/local/bin/manage_foreign_keys.sh" ]; then
    echo "🔗 Ejecutando manejo de foreign keys..."
    /usr/local/bin/manage_foreign_keys.sh
else
    echo "⚠️  Saltando manejo de foreign keys (no hay tablas migradas)"
fi

echo "✨ Proceso finalizado. Los microservicios tienen sus datos correspondientes."