from actions.assign_payments_to_orders import run_full_migration
from actions.traslate_fk import translate_fk
from tools.connector_manager import ConnectorManager

from actions.rename import rename_fields
from actions.drop import drop_fields, drop_fields_with_fk

conn = ConnectorManager()

rename_fields(conn)
drop_fields(conn)
drop_fields_with_fk(conn)
translate_fk(conn)
run_full_migration(conn)

conn.close()


