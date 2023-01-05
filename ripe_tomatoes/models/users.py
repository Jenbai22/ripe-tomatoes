from pydantic import BaseModel

class UserIn(BaseModel):
    username: str
    firstname: str
    lastname: str
    email: str
    password: str

class UserOut(UserIn):
    id: int
