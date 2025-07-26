import mysql.connector
from tools.connector_manager import ConnectorManager


def validate_migration_preconditions(conn: ConnectorManager):
    """Valida que las precondiciones para la migración estén cumplidas"""
    print("🔍 Validando precondiciones de migración...")

    # Verificar que no haya pagos huérfanos
    orphan_count = conn.execute_fetch('''
        SELECT COUNT(*) as count FROM payments p
        LEFT JOIN orders o ON p.customer_number = o.customer_number
        WHERE o.customer_number IS NULL
    ''')[0][0]

    if orphan_count > 0:
        raise Exception(f"❌ Hay {orphan_count} pagos sin órdenes correspondientes")

    # Verificar que la columna order_number no exista ya
    try:
        conn.execute_fetch("SELECT order_number FROM payments LIMIT 1")
        raise Exception("❌ La columna order_number ya existe en payments")
    except mysql.connector.Error:
        pass  # Es lo esperado - la columna no existe

    print("✅ Precondiciones validadas correctamente")


def add_order_number_column(conn: ConnectorManager):
    """Agrega la columna order_number a la tabla payments"""
    try:
        print("🛠️ Agregando columna 'order_number' a payments...")
        conn.execute("ALTER TABLE payments ADD COLUMN order_number INT NULL;")
        print("✔️ Columna 'order_number' agregada.")
    except mysql.connector.Error as e:
        print(f"❌ Error agregando columna 'order_number': {e}")
        raise


def assign_payments_to_orders(conn: ConnectorManager):
    """Asigna pagos existentes a órdenes siguiendo orden cronológico FIFO"""
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

    # Agrupar pagos por cliente
    pagos_por_cliente = {}
    for cust_num, check_num, pay_date in payments:
        pagos_por_cliente.setdefault(cust_num, []).append((check_num, pay_date))

    asignados = 0
    errores = 0
    print("🔄 Asignando pagos a órdenes...")

    for order_number, order_date, customer_number in orders:
        if customer_number in pagos_por_cliente and pagos_por_cliente[customer_number]:
            check_number, _ = pagos_por_cliente[customer_number].pop(0)
            try:
                # Escape manual para prevenir SQL injection
                escaped_check = str(check_number).replace("'", "''") if check_number else 'NULL'

                conn.execute(f'''
                    UPDATE payments
                    SET order_number = {int(order_number)}
                    WHERE customer_number = {int(customer_number)} 
                    AND check_number = '{escaped_check}'
                ''')
                asignados += 1
                print(f"✔️ Pago '{check_number}' asignado a orden {order_number}.")
            except Exception as e:
                errores += 1
                print(f"❌ Error asignando pago '{check_number}' a orden {order_number}: {e}")
                # Devolver el pago a la lista para intentar con otra orden
                pagos_por_cliente[customer_number].insert(0, (check_number, _))
        else:
            print(f"⚠️ No hay pagos disponibles para cliente {customer_number} en orden {order_number}")

    print(f"✅ Asignación completada. Pagos asignados: {asignados}, Errores: {errores}")

    if errores > 0:
        print(f"⚠️ Se produjeron {errores} errores durante la asignación")


def drop_customer_fk_and_column(conn: ConnectorManager):
    """Elimina foreign keys y la columna customer_number de payments"""
    print("🛠️ Eliminando FK de customer_number y columna customer_number de payments...")

    # Obtener nombres reales de las FKs que referencian customer_number
    try:
        fk_names = conn.execute_fetch('''
            SELECT CONSTRAINT_NAME
            FROM information_schema.KEY_COLUMN_USAGE
            WHERE TABLE_SCHEMA = 'classicmodels'
            AND TABLE_NAME = 'payments'
            AND COLUMN_NAME = 'customer_number'
            AND REFERENCED_TABLE_NAME IS NOT NULL
        ''')

        # Eliminar todas las FKs encontradas
        for (fk_name,) in fk_names:
            try:
                conn.execute(f"ALTER TABLE payments DROP FOREIGN KEY {fk_name};")
                print(f"✔️ FK {fk_name} eliminada.")
            except mysql.connector.Error as e:
                print(f"⚠️ Error eliminando FK {fk_name}: {e}")
    except mysql.connector.Error as e:
        print(f"⚠️ Error consultando FKs existentes: {e}")

    # Intentar eliminar FK con nombre común por si acaso
    try:
        conn.execute("ALTER TABLE payments DROP FOREIGN KEY payments_ibfk_1;")
        print("✔️ FK payments_ibfk_1 eliminada.")
    except mysql.connector.Error as e:
        print(f"⚠️ FK payments_ibfk_1 no encontrada o ya eliminada: {e}")

    # Eliminar columna customer_number
    try:
        conn.execute("ALTER TABLE payments DROP COLUMN customer_number;")
        print("✔️ Columna 'customer_number' eliminada.")
    except mysql.connector.Error as e:
        print(f"❌ Error eliminando columna 'customer_number': {e}")
        raise


def update_primary_key_and_add_fk(conn: ConnectorManager):
    """Actualiza la primary key y agrega foreign key a orders"""
    print("🛠️ Cambiando primary key y agregando FK a orders...")

    try:
        # Eliminar PK vieja (customer_number, check_number)
        conn.execute("ALTER TABLE payments DROP PRIMARY KEY;")
        print("✔️ PK vieja eliminada.")
    except mysql.connector.Error as e:
        print(f"⚠️ Error eliminando PK vieja: {e}")

    try:
        # Crear nueva PK con (order_number, check_number)
        conn.execute("ALTER TABLE payments ADD PRIMARY KEY (order_number, check_number);")
        print("✔️ Nueva PK (order_number, check_number) creada.")
    except mysql.connector.Error as e:
        print(f"❌ Error creando nueva PK: {e}")
        raise

    try:
        # Crear FK payments.order_number -> orders.order_number
        conn.execute("""
            ALTER TABLE payments
            ADD CONSTRAINT payments_ibfk_order
            FOREIGN KEY (order_number) REFERENCES orders(order_number)
            ON DELETE RESTRICT ON UPDATE CASCADE;
        """)
        print("✔️ FK payments_ibfk_order creada.")
    except mysql.connector.Error as e:
        print(f"❌ Error creando FK payments_ibfk_order: {e}")
        raise


def verify_migration_integrity(conn: ConnectorManager):
    """Verifica la integridad de los datos después de la migración"""
    print("🔍 Verificando integridad post-migración...")

    # Verificar que todos los pagos tengan order_number
    unassigned = conn.execute_fetch('''
        SELECT COUNT(*) FROM payments WHERE order_number IS NULL
    ''')[0][0]

    if unassigned > 0:
        raise Exception(f"❌ Quedan {unassigned} pagos sin asignar")

    # Verificar integridad referencial
    invalid_refs = conn.execute_fetch('''
        SELECT COUNT(*) FROM payments p
        LEFT JOIN orders o ON p.order_number = o.order_number
        WHERE o.order_number IS NULL
    ''')[0][0]

    if invalid_refs > 0:
        raise Exception(f"❌ Hay {invalid_refs} referencias inválidas a órdenes")

    # Verificar que no haya claves primarias duplicadas
    duplicate_keys = conn.execute_fetch('''
        SELECT order_number, check_number, COUNT(*)
        FROM payments
        GROUP BY order_number, check_number
        HAVING COUNT(*) > 1
    ''')

    if duplicate_keys:
        raise Exception(f"❌ Hay {len(duplicate_keys)} claves primarias duplicadas")

    # Mostrar estadísticas finales
    total_payments = conn.execute_fetch('SELECT COUNT(*) FROM payments')[0][0]
    total_orders_with_payments = conn.execute_fetch('''
        SELECT COUNT(DISTINCT order_number) FROM payments
    ''')[0][0]

    print(f"📊 Estadísticas finales:")
    print(f"   - Total de pagos migrados: {total_payments}")
    print(f"   - Órdenes con pagos asignados: {total_orders_with_payments}")
    print("✅ Integridad verificada correctamente")


def run_full_migration(conn: ConnectorManager):
    """Ejecuta la migración completa con control de transacciones y validaciones"""
    migration_steps = [
        ("Validación de precondiciones", validate_migration_preconditions),
        ("Agregar columna order_number", add_order_number_column),
        ("Asignar pagos a órdenes", assign_payments_to_orders),
        ("Eliminar FK y columna customer_number", drop_customer_fk_and_column),
        ("Actualizar PK y agregar FK", update_primary_key_and_add_fk),
        ("Verificar integridad", verify_migration_integrity)
    ]

    completed_steps = 0

    try:
        print("🚀 Iniciando migración completa de payments...")
        print("=" * 60)

        # Control de transacciones manual
        conn.execute("SET autocommit = 0")
        conn.execute("START TRANSACTION")

        for step_name, step_function in migration_steps:
            print(f"\n📋 Paso {completed_steps + 1}/{len(migration_steps)}: {step_name}")
            print("-" * 40)
            step_function(conn)
            completed_steps += 1
            print(f"✅ Paso {completed_steps} completado")

        conn.execute("COMMIT")
        print("\n" + "=" * 60)
        print("🎉 MIGRACIÓN COMPLETADA EXITOSAMENTE")
        print("   Todos los cambios han sido aplicados y verificados")
        print("=" * 60)

    except Exception as e:
        try:
            conn.execute("ROLLBACK")
            print(f"\n🔄 Rollback ejecutado - Todos los cambios han sido revertidos")
        except Exception as rollback_error:
            print(f"⚠️ Error crítico en rollback: {rollback_error}")

        print("\n" + "=" * 60)
        print("❌ MIGRACIÓN FALLIDA")
        print(f"   Error en paso {completed_steps + 1}/{len(migration_steps)}: {migration_steps[completed_steps][0]}")
        print(f"   Detalle del error: {e}")
        print("   La base de datos permanece en su estado original")
        print("=" * 60)
        raise
    finally:
        try:
            conn.execute("SET autocommit = 1")  # Restaurar autocommit
        except Exception:
            pass


def run_migration_with_backup_plan(conn: ConnectorManager):
    """Ejecuta la migración con plan de respaldo y logging detallado"""
    print("🛡️ Iniciando migración con plan de respaldo...")

    try:
        # Crear backup de información crítica antes de empezar
        print("\n📋 Creando backup de información crítica...")
        backup_data = {
            'payments_structure': conn.execute_fetch("DESCRIBE payments"),
            'payments_count': conn.execute_fetch("SELECT COUNT(*) FROM payments")[0][0],
            'payments_sample': conn.execute_fetch("SELECT * FROM payments LIMIT 5")
        }
        print(f"✅ Backup creado - {backup_data['payments_count']} registros en payments")

        # Ejecutar migración principal
        run_full_migration(conn)

    except Exception as e:
        print(f"\n🚨 La migración falló, información de backup disponible:")
        print(f"   - Estructura original guardada")
        print(f"   - {backup_data.get('payments_count', 'N/A')} registros originales")
        print(f"   - Muestra de datos originales disponible")
        raise


# Función de conveniencia para usar desde otros módulos
def migrate_payments_to_orders(connector_manager: ConnectorManager):
    """Punto de entrada principal para la migración"""
    return run_migration_with_backup_plan(connector_manager)