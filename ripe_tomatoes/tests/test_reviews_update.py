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
    def update_review(self, review_id:int, review: ReviewIn) -> ReviewIn:
        review_dict = review.dict()
        return ReviewIn(**review_dict)


def test_update_review():
    app.dependency_overrides[ReviewQueries] = ReviewQueriesMock
    app.dependency_overrides[authenticator.get_current_account_data] = get_current_account_data_mock
    review_id = 1
    review_body = {
        'body': 'Love this movie!',
        'imdb': 'tt4106306',
        'username': 'Jen',
        'edited': 1
    }

    res = client.put(f'/reviews/{review_id}', json.dumps(review_body))

    assert res.status_code == 200
    assert res.json()['username'] == 'Jen'
    assert res.json()['body'] == 'Love this movie!'
    assert res.json()['imdb'] == 'tt4106306'
    assert res.json()['edited'] == 1


    app.dependency_overrides = {}
