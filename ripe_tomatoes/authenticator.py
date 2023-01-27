import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.users import UserQueries
from models.users import UserOut, User


class MyAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        users: UserQueries,
    ):
        return users.get(username)

    def get_account_getter(
        self,
        users: UserQueries = Depends(),
    ):
        return users

    def get_hashed_password(self, user: User):
        return user.hashed_password

    def get_user_data_for_cookie(self, user: User):
        return user.username, UserOut(**user.dict())


authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
