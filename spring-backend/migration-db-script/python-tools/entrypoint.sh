#!/bin/sh

echo "Esperando que MySQL esté listo..."
while ! nc -z mysql-db 3306; do
  sleep 2
done

echo "✅ MySQL disponible. Ejecutando renombrador..."
python main.py

echo "✅ Migración Python finalizada. Creando bandera de sincronización..."
touch /shared/done.flag
