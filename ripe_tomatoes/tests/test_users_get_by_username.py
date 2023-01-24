from fastapi.testclient import TestClient
from queries.users import UserQueries
from authenticator import authenticator
from main import app

client = TestClient(app)


def get_current_account_data_mock():
    return {"username": "JJ"}


class UserQueriesMock:
    def get(self, user_username: str):
        return {
            "id": 1,
            "username": user_username,
            "firstname": "John",
            "lastname": "Jones",
            "email": "j@j.com",
            "hashed_password": "$2b$12$xgYwasyV0/4lWZQ.cd5Tcu.QBpJ5.M/4reT7ABEGqB5niOZ1WXPB6",
        }


def test_get():
    app.dependency_overrides[UserQueries] = UserQueriesMock
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = get_current_account_data_mock
    user_username = "JJ"

    res = client.get(f"/users/{user_username}")

    assert res.status_code == 200
    assert res.json()["username"] == "JJ"
    assert res.json()["id"] == 1
    assert res.json()["email"] == "j@j.com"

    app.dependency_overrides = {}
