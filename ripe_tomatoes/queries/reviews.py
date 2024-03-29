from psycopg_pool import ConnectionPool
from models.reviews import Review
import os

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class ReviewQueries:
    def get_reviews_by_imdb(self, imdb: int) -> Review:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, body, imdb, username, posted, edited
                    FROM reviews
                    WHERE imdb = %s
                    ORDER BY posted DESC;
                """,
                    [imdb],
                )

                results = []
                for row in cur.fetchall():
                    review = {}
                    for i, column in enumerate(cur.description):
                        review[column.name] = row[i]
                    results.append(review)

                return results

    def get_all_reviews(self):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, body, imdb, posted, username, edited
                    FROM reviews
                    ORDER BY posted;
                """
                )

                results = []
                for row in cur.fetchall():
                    review = {}
                    for i, column in enumerate(cur.description):
                        review[column.name] = row[i]
                    results.append(review)

                return results

    def create_review(self, data):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO reviews (body, imdb, username, edited)
                    VALUES (%s, %s, %s, %s)
                    RETURNING id, posted, body, imdb, username, edited;
                    """,
                    [
                        data.body,
                        data.imdb,
                        data.username,
                        data.edited,
                    ],
                )

                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]

                return record

    def update_review(self, review_id, data):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    data.body,
                    data.imdb,
                    data.username,
                    data.edited,
                    review_id,
                ]
                cur.execute(
                    """
                        UPDATE reviews
                        SET body = %s
                        , imdb = %s
                        , username = %s
                        , edited = %s
                        WHERE id = %s
                        RETURNING id, body, imdb, posted, username, edited
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

    def delete_review(self, review_id):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE FROM reviews
                    WHERE id = %s
                    """,
                    [review_id],
                )

                return True
