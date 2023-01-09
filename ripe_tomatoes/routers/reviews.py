from fastapi import APIRouter, Depends, Response, HTTPException, status, Request
from authenticator import authenticator
from models.reviews import ReviewsOut
from queries.reviews import ReviewQueries

router = APIRouter(tags=["reviews"])


@router.get("/reviews", response_model=ReviewsOut)
async def get_reviews(user_data: dict = Depends(authenticator.get_current_account_data), queries: ReviewQueries = Depends()):
    if user_data:
        return {
            "reviews": queries.get_all_reviews(),
        }
