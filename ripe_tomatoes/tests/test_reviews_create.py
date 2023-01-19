import json
from fastapi.testclient import TestClient
from queries.reviews import ReviewQueries
from routers.reviews import ReviewIn, ReviewOut
from authenticator import authenticator
from main import app

client = TestClient(app)

def get_current_account_data_mock():
    return {
        'username': 'Jen'
    }

class ReviewQueriesMock():
    def create_review(self, review: ReviewIn) -> ReviewOut:
        review_dict = review.dict()
        return ReviewOut(id = 222, posted = "2023-01-18T17:54:43.832Z", **review_dict)


def test_create_review():
    app.dependency_overrides[ReviewQueries] = ReviewQueriesMock
    app.dependency_overrides[authenticator.get_current_account_data] = get_current_account_data_mock

    review_body = {
        'body': 'Love this movie!',
        'imdb': 'tt4106306',
        'username': 'Jen',
        'edited': 0
    }

    res = client.post('/reviews', json.dumps(review_body))

    assert res.status_code == 200
    assert res.json()['username'] == 'Jen'
    assert res.json()['body'] == 'Love this movie!'
    assert res.json()['imdb'] == 'tt4106306'
    assert res.json()['edited'] == 0

    app.dependency_overrides = {}

