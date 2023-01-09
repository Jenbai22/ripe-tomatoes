from psycopg_pool import ConnectionPool
from models.reviews import Review
import os

pool = ConnectionPool(conninfo=os.environ['DATABASE_URL'])

class ReviewQueries:
    def get_specific_review(self, review_id: int) -> Review:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id, body, imdb, date, posted
                    FROM reviews
                    WHERE id = %s
                    ORDER BY date;
                """,
                    [review_id]
                ),

                review = result.fetchone()
                if review is None:
                    return None
                return Review(
                    id=review[0],
                    imdb=review[1],
                    body=review[2],
                    posted=review[3],
                    username=review[4],
                )

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
