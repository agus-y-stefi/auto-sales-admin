-- init.sql

-- Asegurarse de que no exista previamente (puede quedar cacheado si no hacemos down -v)
DROP USER IF EXISTS 'migracion'@'%';

-- Crear con el plugin correcto
CREATE USER 'migracion'@'%' IDENTIFIED WITH mysql_native_password BY 'migracion123';

-- Darle permisos si es necesario
GRANT ALL PRIVILEGES ON classicmodels.* TO 'migracion'@'%';

-- Aplicar cambios
FLUSH PRIVILEGES;
