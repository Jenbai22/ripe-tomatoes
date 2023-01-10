from jwtdown_fastapi.authentication import Token
from fastapi import Depends, Request, APIRouter
from authenticator import authenticator
from models.users import UserOut,User

router = APIRouter(tags=["token"])

class UserToken(Token):
    user: UserOut


@router.get("/token")
async def get_token(
    request: Request,
    user: User = Depends(authenticator.get_user_data_for_cookie)
):
    if user and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "user": user,
        }

