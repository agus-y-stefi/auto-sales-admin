from tools.connector_manager import ConnectorManager

FK_TRANSLATE = [
    {
        "tableFrom": "customers",
        "tableTo": "orders",
        "fieldFrom": ["sales_rep_employee_number"],
        "fieldTo": ["sales_rep_employee_number"],
        "joinField": "customer_number",
        "refTable": "employees",
        "refField": "employee_number",
        "strategy": "move"
    },
]


def translate_fk(conn: ConnectorManager):
    for fk in FK_TRANSLATE:
        process_translation(conn, fk)
    print("\n🎉 ¡Migración de foreign keys completada con éxito!")


def process_translation(conn, fk):
    for from_col, to_col in zip(fk["fieldFrom"], fk["fieldTo"]):
        print(
            f"\n🔄 Procesando: {fk['tableFrom']}.{from_col} → {fk['tableTo']}.{to_col} (estrategia: {fk.get('strategy')})")

        add_column_if_missing(conn, fk["tableTo"], to_col)
        copy_column_data(conn, fk, from_col, to_col)

        strategy = fk.get("strategy", "move")
        if strategy not in ("copy-only", "virtual"):
            create_foreign_key(conn, fk, to_col)

        if strategy == "move":
            drop_old_foreign_key_and_column(conn, fk["tableFrom"], from_col)


def add_column_if_missing(conn, table, column):
    print(f"➕ Añadiendo columna '{column}' a '{table}' (si no existe)...")
    try:
        conn.execute(f"ALTER TABLE {table} ADD COLUMN {column} INT;")
    except Exception as e:
        print(f"⚠️ La columna ya existe o error al crearla: {e}")


def copy_column_data(conn, fk, from_col, to_col):
    if not column_exists(conn, fk["tableFrom"], from_col):
        print(f"⚠️ Columna '{fk['tableFrom']}.{from_col}' no existe. Saltando copia de datos.")
        return

    print(
        f"📥 Copiando datos de '{fk['tableFrom']}.{from_col}' a '{fk['tableTo']}.{to_col}' usando join en '{fk['joinField']}'...")
    conn.execute(f"""
           UPDATE {fk['tableTo']} tgt
           JOIN {fk['tableFrom']} src ON tgt.{fk['joinField']} = src.{fk['joinField']}
           SET tgt.{to_col} = src.{from_col};
       """)


def create_foreign_key(conn, fk, to_col):
    constraint_name = f"fk_{fk['tableTo']}_{to_col}"
    print(f"🔗 Creando FK '{constraint_name}' hacia '{fk['refTable']}.{fk['refField']}'...")
    try:
        conn.execute(f"""
            ALTER TABLE {fk['tableTo']}
            ADD CONSTRAINT {constraint_name}
            FOREIGN KEY ({to_col})
            REFERENCES {fk['refTable']}({fk['refField']});
        """)
        print("✅ FK creada.")
    except Exception as e:
        print(f"⚠️ No se pudo crear la FK: {e}")


def drop_old_foreign_key_and_column(conn, table, column):
    # Verificar si la columna existe
    result = conn.execute_fetch(f"""
            SELECT COUNT(*)
            FROM information_schema.COLUMNS
            WHERE TABLE_SCHEMA = DATABASE()
              AND TABLE_NAME = '{table}'
              AND COLUMN_NAME = '{column}';
        """)
    if result[0][0] == 0:
        print(f"⚠️ La columna '{column}' en la tabla '{table}' no existe, se saltea DROP COLUMN.")
        return

    # Buscar y eliminar constraint FK (igual que antes)
    fk_name = None
    constraints = conn.execute_fetch(f"""
            SELECT CONSTRAINT_NAME
            FROM information_schema.KEY_COLUMN_USAGE
            WHERE TABLE_SCHEMA = DATABASE()
              AND TABLE_NAME = '{table}'
              AND COLUMN_NAME = '{column}'
              AND REFERENCED_TABLE_NAME IS NOT NULL;
        """)
    if constraints:
        fk_name = constraints[0][0]
        print(f"🧹 Encontrado FK '{fk_name}' para columna '{column}', eliminando...")
        conn.execute(f"ALTER TABLE {table} DROP FOREIGN KEY {fk_name};")

    # Finalmente eliminar columna
    print(f"🗑 Eliminando columna '{column}' de '{table}'...")
    conn.execute(f"ALTER TABLE {table} DROP COLUMN {column};")


def column_exists(conn, table, column):
    result = conn.execute_fetch(f"""
        SELECT COUNT(*) 
        FROM information_schema.COLUMNS
        WHERE TABLE_SCHEMA = DATABASE()
          AND TABLE_NAME = '{table}'
          AND COLUMN_NAME = '{column}';
    """)
    return result[0][0] > 0
