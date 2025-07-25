from tools.connector_manager import ConnectorManager


def add_order_number_column(conn: ConnectorManager):
    try:
        print("🛠️ Agregando columna 'order_number' a payments...")
        conn.execute("ALTER TABLE payments ADD COLUMN order_number INT NULL;")
        print("✔️ Columna 'order_number' agregada.")
    except Exception as e:
        print(f"❌ Error agregando columna 'order_number': {e}")


def assign_payments_to_orders(conn: ConnectorManager):
    print("🔄 Cargando órdenes ordenadas por fecha ascendente...")
    orders = conn.execute_fetch('''
        SELECT order_number, order_date, customer_number
        FROM orders
        WHERE order_date IS NOT NULL
        ORDER BY order_date ASC
    ''')

    print("🔄 Cargando pagos sin asignar orden...")
    payments = conn.execute_fetch('''
        SELECT customer_number, check_number, payment_date
        FROM payments
        WHERE order_number IS NULL
        ORDER BY payment_date ASC
    ''')

    pagos_por_cliente = {}
    for cust_num, check_num, pay_date in payments:
        pagos_por_cliente.setdefault(cust_num, []).append((check_num, pay_date))

    asignados = 0
    print("🔄 Asignando pagos a órdenes...")

    for order_number, order_date, customer_number in orders:
        if customer_number in pagos_por_cliente and pagos_por_cliente[customer_number]:
            check_number, _ = pagos_por_cliente[customer_number].pop(0)
            try:
                conn.execute(f'''
                    UPDATE payments
                    SET order_number = {order_number}
                    WHERE customer_number = {customer_number} AND check_number = '{check_number}'
                ''')
                asignados += 1
                print(f"✔️ Pago '{check_number}' asignado a orden {order_number}.")
            except Exception as e:
                print(f"❌ Error asignando pago '{check_number}' a orden {order_number}: {e}")
        else:
            print(f"⚠️ No hay pagos disponibles para cliente {customer_number} en orden {order_number}")

    print(f"✅ Asignación completada. Pagos asignados: {asignados}")


def drop_customer_fk_and_column(conn: ConnectorManager):
    print("🛠️ Eliminando FK de customer_number y columna customer_number de payments...")

    # Primero hay que dropear FK
    try:
        conn.execute("ALTER TABLE payments DROP FOREIGN KEY payments_ibfk_1;")
        print("✔️ FK payments_ibfk_1 eliminada.")
    except Exception as e:
        print(f"⚠️ Error eliminando FK payments_ibfk_1 (puede que no exista): {e}")

    # Luego eliminar columna customer_number
    try:
        conn.execute("ALTER TABLE payments DROP COLUMN customer_number;")
        print("✔️ Columna 'customer_number' eliminada.")
    except Exception as e:
        print(f"❌ Error eliminando columna 'customer_number': {e}")


def update_primary_key_and_add_fk(conn: ConnectorManager):
    print("🛠️ Cambiando primary key y agregando FK a orders...")

    try:
        # Dropear PK vieja (customer_number, check_number)
        conn.execute("ALTER TABLE payments DROP PRIMARY KEY;")
        print("✔️ PK vieja eliminada.")
    except Exception as e:
        print(f"⚠️ Error eliminando PK vieja (puede que no exista): {e}")

    try:
        # Crear nueva PK con (order_number, check_number)
        conn.execute("ALTER TABLE payments ADD PRIMARY KEY (order_number, check_number);")
        print("✔️ Nueva PK (order_number, check_number) creada.")
    except Exception as e:
        print(f"❌ Error creando nueva PK: {e}")

    try:
        # Crear índice para order_number
        conn.execute("CREATE INDEX idx_payments_order_number ON payments(order_number);")
        print("✔️ Índice para order_number creado.")
    except Exception as e:
        print(f"⚠️ Error creando índice para order_number (puede que ya exista): {e}")

    try:
        # Crear FK payments.order_number -> orders.order_number
        conn.execute("""
            ALTER TABLE payments
            ADD CONSTRAINT payments_ibfk_order
            FOREIGN KEY (order_number) REFERENCES orders(order_number);
        """)
        print("✔️ FK payments_ibfk_order creada.")
    except Exception as e:
        print(f"❌ Error creando FK payments_ibfk_order: {e}")


def run_full_migration(conn: ConnectorManager):
    try:
        add_order_number_column(conn)
        assign_payments_to_orders(conn)
        drop_customer_fk_and_column(conn)
        update_primary_key_and_add_fk(conn)
    except Exception as e:
        print(f"❌ Error durante la migración completa: {e}")
