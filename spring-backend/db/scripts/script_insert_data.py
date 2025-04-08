import os
import json
import psycopg2


def load_json_file(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)


def insert_data(cursor, table_name, data):
    if not data:
        print(f"No hay datos para {table_name}")
        return

    columns = data[0].keys()
    cols_str = ", ".join(columns)
    placeholders = ", ".join([f"%({col})s" for col in columns])
    query = f"INSERT INTO {table_name} ({cols_str}) VALUES ({placeholders})"

    for row in data:
        cursor.execute(query, row)
    print(f"✓ Insertados {len(data)} registros en '{table_name}'")


def main(DB_CONFIG, JSON_DIR="../", insert_order=None):
    if insert_order is None:
        insert_order = []
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        conn.autocommit = True
        cursor = conn.cursor()

        for table in insert_order:
            json_path = os.path.join(JSON_DIR, f"{table}.json")
            if os.path.exists(json_path):
                data = load_json_file(json_path)
                insert_data(cursor, table, data)
            else:
                print(f"⚠️  Archivo no encontrado: {json_path}")

        cursor.close()
        conn.close()
        print("✅ Inserción completada con éxito.")

    except Exception as e:
        print(f"❌ Error durante la inserción: {e}")
