import mysql.connector

from tools.connector_manager import ConnectorManager

FIELDS_TO_DELETE = {
    'customers': [
        'address_line1',
        'address_line2',
        'state',
        'postal_code'
    ],
    'employees': [
        'email',
        'job_title'
    ],
    'offices': [],
    'orders': [],
    'payments': [],
    'orderdetails': [
        'order_line_number'
    ],
    'products': [],
    'productlines': [
        'html_description',
        'image'
    ]

}

FIELDS_TO_DELETE_WITH_FK = {
    'employees': [
        'reports_to',
    ],
}


def get_foreign_keys(connector, table_name, column_name):
    query = f"""
    SELECT constraint_name
    FROM information_schema.key_column_usage
    WHERE table_name = '{table_name}'
      AND column_name = '{column_name}';
    """
    return connector.execute_fetch(query)


def drop_fields(conn: ConnectorManager):
    for table, columns in FIELDS_TO_DELETE.items():
        for column in columns:
            try:
                print(f"Intentando eliminar {table}.{column}...")
                conn.execute(f"ALTER TABLE `{table}` DROP COLUMN `{column}`;")
                print(f"✔️  Eliminado: {table}.{column}")
            except mysql.connector.Error as err:
                print(f"⚠️  No se pudo eliminar {table}.{column}: {err}")


def drop_fields_with_fk(conn: ConnectorManager):
    for table, columns in FIELDS_TO_DELETE_WITH_FK.items():
        for column in columns:
            try:
                print(f"Intentando eliminar FK y columna {table}.{column}...")
                fks = get_foreign_keys(conn, table, column)
                if fks:
                    for fk in fks:
                        print(f"Eliminando FK {fk[0]}...")
                        conn.execute(f"ALTER TABLE `{table}` DROP FOREIGN KEY `{fk[0]}`;")
                conn.execute(f"ALTER TABLE `{table}` DROP COLUMN `{column}`;")
                print(f"✔️  Eliminado: {table}.{column}")
            except mysql.connector.Error as err:
                print(f"⚠️  No se pudo eliminar {table}.{column}: {err}")
