from script_insert_data import main

main(
    DB_CONFIG={
        "host": "localhost",
        "port": 5434,
        "dbname": "ms_ordenes_db",
        "user": "postgres",
        "password": "postgres"
    },
    insert_order=[
        "customers",
        "payments",
        "orders",
    ]
)
