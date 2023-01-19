from fastapi.testclient import TestClient
from queries.reviews import ReviewQueries
from authenticator import authenticator

from main import app

client = TestClient(app)

def get_current_account_data_mock():
    return {
        'username': 'Mo'
    }

class ReviewQueriesMock():
    def delete_review(self, review_id: int) -> bool:
        return True

def test_delete_review():
    app.dependency_overrides[ReviewQueries] = ReviewQueriesMock
    app.dependency_overrides[authenticator.get_current_account_data] = get_current_account_data_mock
    review_id = 1
    response = client.delete(f"/reviews/{review_id}" )
    assert response.status_code == 200
    assert response.json() == True
    app.dependency_overrides = {}