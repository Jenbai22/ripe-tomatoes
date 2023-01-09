from pydantic import BaseModel

class User(BaseModel):
    id: int
    username: str
    firstname: str
    lastname: str
    email: str
    hashed_password: str


class UserIn(BaseModel):
    username: str
    firstname: str
    lastname: str
    email: str
    password: str

class UserOut(BaseModel):
    id: int
    username: str

class UsersOut(BaseModel):
    users: list[User]
