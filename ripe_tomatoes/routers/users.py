from fastapi import APIRouter
from models.users import UserIn, UserOut

router = APIRouter(tags=["users"])

@router.post("/users/")
def create_user(user: UserIn):
    pass

@router.get("/users/{user_id}")
def read_user(user_id: int):
    pass

@router.put("/users/{user_id}")
def update_user(user_id: int, user: UserIn):
    pass

@router.delete("/users/{user_id}")
def delete_user(user_id: int):
    pass
