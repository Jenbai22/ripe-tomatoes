# db stuff goes here - ALL THE SQL
from psycopg_pool import ConnectionPool
import os

pool = ConnectionPool(conninfo=os.environ['DATABASE_URL'])

class UserQueries:
    def get_all_users(self):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, firstname, lastname, password, email, username
                    FROM users
                    ORDER BY lastname, firstname
                """
                )

                results = []
                for row in cur.fetchall():
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    results.append(record)

                return results

    def create_user(self, data):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    data.firstname,
                    data.lastname,
                    data.password,
                    data.email,
                    data.username,
                ]
                cur.execute(
                    """
                    INSERT INTO users (firstname, lastname, password, email, username)
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING id, firstname, lastname, password, email, username
                    """,
                    params,
                )

                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]

                return record

    def update_user(self, user_id, data):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    data.firstname,
                    data.lastname,
                    data.password,
                    data.email,
                    data.username,
                    user_id,
                ]
                cur.execute(
                    """
                    UPDATE users
                    SET firstname = %s
                      , lastname = %s
                      , password = %s
                      , email = %s
                      , username = %s
                    WHERE id = %s
                    RETURNING id, firstname, lastname, password, email, username
                    """,
                    params,
                )

                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]

                return record

    def delete_user(self, user_id):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE FROM users
                    WHERE id = %s
                    """,
                    [user_id],
                )
