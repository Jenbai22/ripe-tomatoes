from psycopg_pool import ConnectionPool
from models.users import User
import os

pool = ConnectionPool(conninfo='postgresql://username:password@postgres/tomatoes')

class UserQueries:
    def get(self, username: str) -> User:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id
                        , username
                        , firstname
                        , lastname
                        , email
                        , hashed_password
                    FROM users
                    WHERE username = %s;
                    """,
                    [username],
                )
                record = result.fetchone()
                if record is None:
                    return None
                return User(
                    id=record[0],
                    username=record[1],
                    firstname=record[2],
                    lastname=record[3],
                    email=record[4],
                    hashed_password=record[5],
                )

    def get_all_users(self):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id
                    , firstname
                    , lastname
                    , hashed_password
                    , email
                    , username
                    FROM users
                    ORDER BY lastname, firstname;
                """
                )

                results = []
                for row in cur.fetchall():
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    results.append(record)

                return results

    def create_user(self, data, hashed_password):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO users (firstname
                    , lastname
                    , hashed_password
                    , email
                    , username)
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING id, username;
                    """,
                    [
                        data.firstname,
                        data.lastname,
                        hashed_password,
                        data.email,
                        data.username,
                    ],
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
                    data.email,
                    data.username,
                    user_id,
                ]
                cur.execute(
                    """
                    UPDATE users
                    SET firstname = %s
                        , lastname = %s
                        , email = %s
                        , username = %s
                    WHERE id = %s
                    RETURNING id, firstname, lastname, email, username
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
