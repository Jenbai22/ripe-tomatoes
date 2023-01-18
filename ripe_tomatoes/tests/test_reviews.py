from fastapi.testclient import TestClient
from queries.reviews import ReviewQueries

from main import app

client = TestClient(app)

class ReviewQueriesMock():
    def get_all_reviews(self):
        return []

def test_get_all_reviews():
    app.dependency_overrides[ReviewQueries] = ReviewQueriesMock

    response = client.get("/reviews")

    assert response.status_code == 200
    assert response.json() == {"reviews": []}
    
    app.dependency_overrides = {}