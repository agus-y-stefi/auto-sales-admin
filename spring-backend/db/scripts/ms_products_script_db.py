from script_insert_data import main

main(
    DB_CONFIG={
        "host": "localhost",
        "port": 5433,
        "dbname": "ms_productos_db",
        "user": "postgres",
        "password": "postgres"
    },
    insert_order=[
        "product_lines",
        "products",
        "order_details"
    ]
)
