from fastapi import (
    APIRouter,
    Depends,
    Response,
    HTTPException,
    Request,
)

from authenticator import authenticator
from .token import UserToken
from pydantic import BaseModel
from models.users import UserIn, UserOut, UsersOut, UserUpdate, User
from queries.users import UserQueries


class UserForm(BaseModel):
    username: str
    password: str


class HttpError(BaseModel):
    detail: str


router = APIRouter(tags=["users"])


@router.post("/users", response_model=UserToken | HttpError)
async def create_account(
    info: UserIn,
    request: Request,
    response: Response,
    repo: UserQueries = Depends(),
):
    try:
        hashed_password = authenticator.hash_password(info.password)
        user = repo.create_user(info, hashed_password)
        form = UserForm(username=info.username, password=info.password)
        token = await authenticator.login(response, request, form, repo)
        return UserToken(user=user, **token.dict())
    except:
        raise HTTPException(status_code=409, detail="Username or Email already exists")


@router.get("/users", response_model=UsersOut)
def users_list(queries: UserQueries = Depends()):
    return {
        "users": queries.get_all_users(),
    }


@router.get("/users/{user_username}", response_model=User)
def user_get(user_username: str, queries: UserQueries = Depends()):
    record = queries.get(user_username)
    if record is None:
        raise HTTPException(status_code=404, detail="No Such User Exists")

    else:
        return record


@router.put("/users/{user_id}", response_model=UserOut)
def update_user(
    user_id: int,
    user_update: UserUpdate,
    response: Response,
    queries: UserQueries = Depends(),
):
    record = queries.update_user(user_id, user_update)
    if record is None:
        raise HTTPException(status_code=404, detail="No Such User Exists")

    else:
        return record


@router.delete("/users/{user_id}", response_model=bool)
def delete_user(user_id: int, queries: UserQueries = Depends()):
    queries.delete_user(user_id)
    return True
