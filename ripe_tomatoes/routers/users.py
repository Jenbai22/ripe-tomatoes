from fastapi import APIRouter, Depends, Response, HTTPException, status, Request
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator
from .token import UserToken
from pydantic import BaseModel
from models.users import UserIn, UserOut, UsersOut
from queries.users import UserQueries



class UserForm(BaseModel):
    username: str
    password: str

class HttpError(BaseModel):
    detail: str

router = APIRouter(tags=["users"])

# @router.post("/users/", response_model=UserOut)
# def create_user(user_in: UserIn, queries: UserQueries = Depends()):
#    return queries.create_user(user_in)

@router.post("/users", response_model=UserToken | HttpError)
async def create_account(
    info: UserIn,
    request: Request,
    response: Response,
    repo: UserQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    # try:
    user = repo.create_user(info, hashed_password)
    # except DuplicateAccountError:
    #     raise HTTPException(
    #         status_code=status.HTTP_400_BAD_REQUEST,
    #         detail="Cannot create an account with those credentials",
    #     )
    form = UserForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return UserToken(user=user, **token.dict())


@router.get("/users", response_model=UsersOut)
def users_list(queries: UserQueries = Depends()):
    return {
        "users": queries.get_all_users(),
    }

@router.put("/users/{user_id}", response_model=UserOut)
def update_user(
    user_id: int,
    user_in: UserIn,
    response: Response,
    queries: UserQueries = Depends(),
):
    record = queries.update_user(user_id, user_in)
    if record is None:
        response.status_code = 404
    else:
        return record

@router.delete("/users/{user_id}", response_model=bool)
def delete_user(user_id: int, queries: UserQueries = Depends()):
    queries.delete_user(user_id)
    return True
