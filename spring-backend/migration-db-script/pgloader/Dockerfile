FROM dimitri/pgloader:latest

RUN apt-get update && apt-get install -y \
    default-mysql-client \
    postgresql-client \
    netcat-openbsd \
    dos2unix

WORKDIR /app

COPY entrypoint.sh .
COPY migracion.load .

RUN dos2unix entrypoint.sh && chmod +x entrypoint.sh

CMD ["./entrypoint.sh"]
