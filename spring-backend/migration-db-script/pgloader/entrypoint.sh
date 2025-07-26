#!/bin/sh

echo "Esperando que MySQL esté listo..."
while ! nc -z mysql-db 3306; do
  sleep 2
done

echo "Esperando que PostgreSQL esté listo..."
while ! pg_isready -h postgres-db -p 5432 -U postgres; do
  sleep 2
done

echo "Esperando que Python termine la migración inicial..."
while [ ! -f /shared/done.flag ]; do
  sleep 2
done

echo "✅ Bases listas y Python finalizado. Ejecutando pgloader..."

# Crear archivo de log
touch /shared/pgloader.log

# Ejecutar pgloader con logging detallado
echo "📝 Iniciando pgloader con logging detallado..."
pgloader migracion.load 2>&1 | tee /shared/pgloader.log

# Verificar el código de salida de pgloader
exit_code=$?
echo "🔍 pgloader terminó con código de salida: $exit_code"

# Verificar que las tablas se crearon
echo "🔍 Verificando tablas creadas en PostgreSQL..."
PGPASSWORD=postgres psql -h postgres-db -p 5432 -U postgres -d classicmodels_pg \
  -c "SELECT schemaname, tablename FROM pg_tables WHERE schemaname NOT IN ('information_schema', 'pg_catalog');" \
  2>&1 | tee -a /shared/pgloader.log

# Contar registros en cada tabla si existen
echo "🔍 Contando registros en tablas migradas..."
PGPASSWORD=postgres psql -h postgres-db -p 5432 -U postgres -d classicmodels_pg \
  -c "SELECT schemaname, tablename,
      (xpath('/row/c/text()', query_to_xml('SELECT COUNT(*) as c FROM ' || schemaname || '.' || tablename, false, true, '')))[1]::text::int as row_count
      FROM pg_tables
      WHERE schemaname NOT IN ('information_schema', 'pg_catalog');" \
  2>&1 | tee -a /shared/pgloader.log

# Solo crear ready.flag si pgloader fue exitoso
if [ $exit_code -eq 0 ]; then
    echo "✅ pgloader completado exitosamente"
    touch /shared/ready.flag
else
    echo "❌ pgloader falló con código: $exit_code"
    echo "❌ NO se creará ready.flag debido al error"
    exit $exit_code
fi

echo "📄 Log completo guardado en /shared/pgloader.log"