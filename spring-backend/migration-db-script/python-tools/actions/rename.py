from tools.transforms import camel_to_snake


def rename_fields(conn):

    tables = [t[0] for t in conn.execute_fetch("SHOW TABLES")]

    for table in tables:
        new_table = camel_to_snake(table)
        if new_table != table:
            print(f"Renombrando tabla: {table} -> {new_table}")
            conn.execute(f"RENAME TABLE `{table}` TO `{new_table}`")
        else:
            new_table = table  # ya está en snake_case

        for col in conn.execute_fetch(f"SHOW COLUMNS FROM `{new_table}`"):
            col_name = col[0]
            col_type = col[1]
            new_col = camel_to_snake(col_name)
            if new_col != col_name:
                print(f"Renombrando columna: {new_table}.{col_name} -> {new_col}")
                conn.execute_fetch(
                    f"ALTER TABLE `{new_table}` CHANGE `{col_name}` `{new_col}` {col_type}"
                )
