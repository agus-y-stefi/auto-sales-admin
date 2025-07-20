#!/bin/sh

echo "Esperando que MySQL esté listo..."
while ! nc -z mysql-db 3306; do
  sleep 2
done

echo "Esperando que PostgreSQL esté listo..."
while ! pg_isready -h postgres-db -p 5432 -U postgres; do
  sleep 2
done

echo "Ambas bases están listas. Ejecutando pgloader..."
pgloader migracion.load
