FROM dimitri/pgloader:latest

RUN apt-get update && apt-get install -y \
    default-mysql-client \
    postgresql-client \
    netcat-openbsd

WORKDIR /app
COPY migracion.load .
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]
