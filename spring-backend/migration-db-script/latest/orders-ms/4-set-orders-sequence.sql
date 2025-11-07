-- ============================================================
-- Script: 4-set-orders-sequence.sql
-- Descripción: Crea y sincroniza la secuencia para order_number
-- Servicio: orders_service
-- Autor: Agustín Tomás Crespo
-- ============================================================

-- Asegurar que estamos en el esquema correcto
SET search_path TO orders_service, public;

-- ============================================================
-- 1️⃣ Crear secuencia (solo si no existe)
-- ============================================================
DO $$
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'order_number_seq') THEN
            CREATE SEQUENCE orders_service.order_number_seq
                START WITH 1
                INCREMENT BY 1
                OWNED BY orders_service.orders.order_number;
        END IF;
    END $$;

-- ============================================================
-- 2️⃣ Sincronizar la secuencia con los datos existentes
--    Esto asegura que el siguiente valor continúe después del máximo actual
-- ============================================================
SELECT setval(
               'orders_service.order_number_seq',
               COALESCE((SELECT MAX(order_number) FROM orders_service.orders), 0)
       );

-- ============================================================
-- 3️⃣ Asignar la secuencia como valor por defecto del campo order_number
-- ============================================================
ALTER TABLE orders_service.orders
    ALTER COLUMN order_number
        SET DEFAULT nextval('orders_service.order_number_seq');

-- ============================================================
-- 4️⃣ (Opcional) Verificar el valor actual de la secuencia
-- ============================================================
-- SELECT last_value FROM orders_service.order_number_seq;
