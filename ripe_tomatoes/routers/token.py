from jwtdown_fastapi.authentication import Token
from fastapi import Depends, Request, APIRouter
from authenticator import authenticator
from models.users import UserOut,User

router = APIRouter(tags=["token"])

class UserToken(Token):
    user: UserOut


@router.get("/token", response_model=UserToken | None)
async def get_token(
    request: Request,
    user: User = Depends(authenticator.try_get_current_account_data)
) -> UserToken | None:
    if user and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "user": user,
        }
