FROM python:3.11-slim

RUN apt-get update && apt-get install -y \
    default-mysql-client \
    postgresql-client \
    netcat-openbsd \
    dos2unix

RUN pip install mysql-connector-python

WORKDIR /app

COPY main.py .
COPY entrypoint.sh .
COPY tools ./tools/
COPY actions ./actions/

RUN dos2unix entrypoint.sh && chmod +x entrypoint.sh

CMD ["./entrypoint.sh"]
