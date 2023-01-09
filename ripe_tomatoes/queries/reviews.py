from psycopg_pool import ConnectionPool
from models.reviews import Review, ReviewIn, ReviewOut, ReviewsOut
import os

pool = ConnectionPool(conninfo=os.environ['DATABASE_URL'])

class ReviewQueries:
    # def get_specific_review(self, review_id: int) -> Review:
    #     with pool.connection() as conn:
    #         with conn.cursor() as db:
    #             result = db.execute(
    #                 """
    #                 SELECT id, body, imdb, date, posted
    #                 FROM reviews
    #                 WHERE id = %s
    #                 ORDER BY date;
    #             """,
    #                 [review_id]
    #             ),

    #             review = result.fetchone()
    #             if review is None:
    #                 return None
    #             return Review(
    #                 id=review[0],
    #                 imdb=review[1],
    #                 body=review[2],
    #                 posted=review[3],
    #                 username=review[4],
    #             )

    def get_all_reviews(self):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, body, imdb, posted, username
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
                    INSERT INTO reviews (body, imdb, username)
                    VALUES (%s, %s, %s)
                    RETURNING id, posted, body, imdb, username;
                    """,
                    [
                    data.body,
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

    def update_review(self, review_id, data):
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    params = [
                        data.body,
                        data.imdb,
                        data.posted,
                        data.username,
                        review_id,
                    ]
                    cur.execute(
                        """
                        UPDATE reviews
                        SET body = %s
                        , imdb = %s
                        , posted = %s
                        , username = %s
                        WHERE id = %s
                        RETURNING id, body, imdb, posted, username
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
