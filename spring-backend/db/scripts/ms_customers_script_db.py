from script_insert_data import main

main(
    DB_CONFIG={
        "host": "localhost",
        "port": 5433,
        "dbname": "ms_customers_db",
        "user": "postgres",
        "password": "postgres"
    },
    insert_order=[
        "customers"
    ]
)