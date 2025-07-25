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
pgloader migracion.load
