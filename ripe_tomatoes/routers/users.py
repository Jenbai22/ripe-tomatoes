from fastapi import APIRouter, Depends, Response
from models.users import UserIn, UserOut, UsersOut
from queries.users import UserQueries


router = APIRouter(tags=["users"])

@router.post("/users/", response_model=UserOut)
def create_user(user_in: UserIn, queries: UserQueries = Depends()):
    return queries.create_user(user_in)

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
