from fastapi.testclient import TestClient
from queries.reviews import ReviewQueries

from main import app

client = TestClient(app)

class ReviewQueriesMock():
    def get_reviews_by_imdb(self, imdb):
        return []

def test_get_reviews_by_imdb():
    app.dependency_overrides[ReviewQueries] = ReviewQueriesMock
    response = client.get(f"/reviews/{1}", )
    assert response.status_code == 200
    assert response.json() == {"reviews": []}
    app.dependency_overrides = {}