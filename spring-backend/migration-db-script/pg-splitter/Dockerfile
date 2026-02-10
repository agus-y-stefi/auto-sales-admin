FROM postgres:15

# Instalar herramientas necesarias
RUN apt-get update && apt-get install -y \
    postgresql-client \
    netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*

# Copiar los scripts de distribución
COPY splitter.sh /usr/local/bin/splitter.sh
COPY manage_foreign_keys.sh /usr/local/bin/manage_foreign_keys.sh
RUN chmod +x /usr/local/bin/splitter.sh /usr/local/bin/manage_foreign_keys.sh

# Definir el comando por defecto
CMD ["/usr/local/bin/splitter.sh"]