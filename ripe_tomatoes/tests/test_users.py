from fastapi.testclient import TestClient
from queries.users import UserQueries

from main import app

client = TestClient(app)


class UserQueriesMock:
    def get_all_users(self):
        return []


def test_get_users():
    app.dependency_overrides[UserQueries] = UserQueriesMock

    response = client.get("/users")

    assert response.status_code == 200
    assert response.json() == {"users": []}

    app.dependency_overrides = {}
