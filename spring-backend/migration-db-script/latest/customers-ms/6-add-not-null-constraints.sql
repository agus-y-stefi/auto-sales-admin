-- Establecer el schema para customers_service
SET search_path TO customers_service, public;

-- Actualizar registros existentes que puedan tener valores nulos para evitar errores al aplicar la restricción
UPDATE customers SET customer_name = 'Unknown' WHERE customer_name IS NULL;
UPDATE customers SET contact_last_name = 'Unknown' WHERE contact_last_name IS NULL;
UPDATE customers SET contact_first_name = 'Unknown' WHERE contact_first_name IS NULL;
UPDATE customers SET credit_limit = 0.00 WHERE credit_limit IS NULL;

-- Aplicar restricciones NOT NULL
ALTER TABLE customers ALTER COLUMN customer_name SET NOT NULL;
ALTER TABLE customers ALTER COLUMN contact_last_name SET NOT NULL;
ALTER TABLE customers ALTER COLUMN contact_first_name SET NOT NULL;
ALTER TABLE customers ALTER COLUMN credit_limit SET NOT NULL;
