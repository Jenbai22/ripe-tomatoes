from psycopg_pool import ConnectionPool
import os

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class FavoriteQueries:
    def get_favorite_count_by_imdb(self, imdb):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT COUNT(*)
                    FROM favorites
                    WHERE imdb = %s;
                    """,
                    [imdb],
                )

                return cur.fetchall()[0][0]

    def get_favorites_by_username(self, username: str):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, imdb, username, poster
                    FROM favorites
                    WHERE username = %s
                    ORDER BY id;
                """,
                    [username],
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
                    SELECT id, imdb, username, poster
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
                    INSERT INTO favorites (imdb, username, poster)
                    VALUES (%s, %s, %s)
                    RETURNING id, imdb, username, poster;
                    """,
                    [
                        data.imdb,
                        data.username,
                        data.poster,
                    ],
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
