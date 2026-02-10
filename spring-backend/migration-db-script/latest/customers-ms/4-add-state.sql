-- Establecer el schema para customers_service
SET search_path TO customers_service, public;

-- 1. Agregar la columna status a la tabla customers
ALTER TABLE customers
    ADD COLUMN status VARCHAR(20) DEFAULT 'active';

-- 2. Crear un tipo ENUM para los estados (opcional, pero recomendado para integridad)
-- Comentado porque algunos DBs no soportan ENUM, usar constraint en su lugar
-- CREATE TYPE customer_status AS ENUM ('active', 'inactive', 'vip', 'overdue', 'new', 'review');
-- ALTER TABLE customers ALTER COLUMN status TYPE customer_status USING status::customer_status;

-- 3. Agregar constraint para validar los valores permitidos
ALTER TABLE customers
    ADD CONSTRAINT check_status_values
        CHECK (status IN ('active', 'inactive', 'vip', 'overdue', 'new', 'review'));

-- 4. Función para generar estados aleatorios y actualizar todas las filas
WITH status_options AS (
    SELECT unnest(ARRAY['active', 'inactive', 'vip', 'overdue', 'new', 'review']) AS status_value
),
     random_statuses AS (
         SELECT
             customer_number,
             (ARRAY['active', 'inactive', 'vip', 'overdue', 'new', 'review'])[
                 floor(random() * 6 + 1)::int
                 ] AS random_status
         FROM customers
     )
UPDATE customers
SET status = rs.random_status
FROM random_statuses rs
WHERE customers.customer_number = rs.customer_number;

-- 5. Verificar la distribución de estados generados
SELECT
    status,
    COUNT(*) as count,
    ROUND((COUNT(*) * 100.0 / SUM(COUNT(*)) OVER()), 2) as percentage
FROM customers
GROUP BY status
ORDER BY count DESC;

-- 6. Mostrar algunos ejemplos de los datos actualizados
SELECT
    customer_number,
    customer_name,
    city,
    country,
    credit_limit,
    status
FROM customers
ORDER BY customer_number
LIMIT 10;