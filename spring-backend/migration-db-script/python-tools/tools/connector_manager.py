import mysql.connector


class ConnectorManager:
    def __init__(self):
        self.conn = mysql.connector.connect(
            host='mysql-db',
            user='root',
            password='root',
            database='classicmodels'
        )

    def execute_fetch(self, query):
        cursor = self.conn.cursor()
        cursor.execute(query)
        result = cursor.fetchall()
        cursor.close()
        return result

    def execute(self, query):
        cursor = self.conn.cursor()
        cursor.execute(query)
        self.conn.commit()
        cursor.close()

    def close(self):
        if self.conn.is_connected():
            self.conn.close()
            print("Connection closed.")
        else:
            print("Connection already closed.")
