from psycopg_pool import ConnectionPool
import os

pool = ConnectionPool(conninfo=os.environ['DATABASE_URL'])

class FavoriteQueries:
    def get_favorites_by_username(self, username:str):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, imdb, username
                    FROM favorites
                    WHERE username = %s
                    ORDER BY id;
                """,
                    [username]
                )

                results = []
                for row in cur.fetchall():
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    results.append(record)

                return results

    def get_all_favorites(self):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, imdb, username
                    FROM favorites
                    ORDER BY id;
                """
                )

                results = []
                for row in cur.fetchall():
                    review = {}
                    for i, column in enumerate(cur.description):
                        review[column.name] = row[i]
                    results.append(review)

                return results

    def create_favorite(self, data):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO favorites (imdb, username)
                    VALUES (%s, %s)
                    RETURNING id, imdb, username;
                    """,
                    [
                    data.imdb,
                    data.username,
                ]
                )

                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]

                return record

    def delete_favorite(self, id):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE FROM favorites
                    WHERE id = %s
                    """,
                    [id],
                )

                return True
