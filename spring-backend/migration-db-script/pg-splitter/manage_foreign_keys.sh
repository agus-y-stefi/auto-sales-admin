#!/bin/bash

# Script para manejar foreign keys entre microservicios
# Este script se ejecuta después de la migración principal

set -e

echo "🔗 Manejando Foreign Keys entre microservicios..."

# Función para ejecutar SQL en un microservicio específico
execute_sql() {
    local host=$1
    local port=$2
    local db=$3
    local user=$4
    local password=$5
    local sql=$6
    local service_name=$7
    
    echo "   - Ejecutando en $service_name: $sql"
    
    PGPASSWORD="$password" psql \
        -h "$host" \
        -p "$port" \
        -U "$user" \
        -d "$db" \
        -c "$sql" \
        -v ON_ERROR_STOP=1
}

# Remover foreign keys que apuntan a otras bases de datos
echo "🗑️  Removiendo foreign keys entre microservicios..."

# En MS-Orders: remover FK hacia customers y products
execute_sql "$MS_ORDERS_HOST" "$MS_ORDERS_PORT" "$MS_ORDERS_DB" "$MS_ORDERS_USER" "$MS_ORDERS_PASSWORD" \
    "ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_ibfk_1;" "MS-Orders"

execute_sql "$MS_ORDERS_HOST" "$MS_ORDERS_PORT" "$MS_ORDERS_DB" "$MS_ORDERS_USER" "$MS_ORDERS_PASSWORD" \
    "ALTER TABLE orders DROP CONSTRAINT IF EXISTS fk_orders_sales_rep_employee_number;" "MS-Orders"

execute_sql "$MS_ORDERS_HOST" "$MS_ORDERS_PORT" "$MS_ORDERS_DB" "$MS_ORDERS_USER" "$MS_ORDERS_PASSWORD" \
    "ALTER TABLE orderdetails DROP CONSTRAINT IF EXISTS orderdetails_ibfk_2;" "MS-Orders"

execute_sql "$MS_ORDERS_HOST" "$MS_ORDERS_PORT" "$MS_ORDERS_DB" "$MS_ORDERS_USER" "$MS_ORDERS_PASSWORD" \
    "ALTER TABLE payments DROP CONSTRAINT IF EXISTS payments_ibfk_order;" "MS-Orders"

# En MS-Customers: remover FK hacia otras tablas si existen
execute_sql "$MS_CUSTOMERS_HOST" "$MS_CUSTOMERS_PORT" "$MS_CUSTOMERS_DB" "$MS_CUSTOMERS_USER" "$MS_CUSTOMERS_PASSWORD" \
    "ALTER TABLE employees DROP CONSTRAINT IF EXISTS employees_ibfk_2;" "MS-Customers"

# Crear índices para mejorar rendimiento en campos que eran FK
echo "📊 Creando índices en campos de referencia externa..."

execute_sql "$MS_ORDERS_HOST" "$MS_ORDERS_PORT" "$MS_ORDERS_DB" "$MS_ORDERS_USER" "$MS_ORDERS_PASSWORD" \
    "CREATE INDEX IF NOT EXISTS idx_orders_customer_number ON orders(customer_number);" "MS-Orders"

execute_sql "$MS_ORDERS_HOST" "$MS_ORDERS_PORT" "$MS_ORDERS_DB" "$MS_ORDERS_USER" "$MS_ORDERS_PASSWORD" \
    "CREATE INDEX IF NOT EXISTS idx_orders_sales_rep_employee_number ON orders(sales_rep_employee_number);" "MS-Orders"

execute_sql "$MS_ORDERS_HOST" "$MS_ORDERS_PORT" "$MS_ORDERS_DB" "$MS_ORDERS_USER" "$MS_ORDERS_PASSWORD" \
    "CREATE INDEX IF NOT EXISTS idx_orderdetails_product_code ON orderdetails(product_code);" "MS-Orders"

execute_sql "$MS_ORDERS_HOST" "$MS_ORDERS_PORT" "$MS_ORDERS_DB" "$MS_ORDERS_USER" "$MS_ORDERS_PASSWORD" \
    "CREATE INDEX IF NOT EXISTS idx_payments_order_number ON payments(order_number);" "MS-Orders"

echo "✅ Foreign Keys entre microservicios manejadas correctamente"