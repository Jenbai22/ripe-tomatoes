from fastapi import APIRouter, Depends, Response, HTTPException, status, Request
from authenticator import authenticator
from models.reviews import ReviewsOut, Review, ReviewIn, ReviewOut
from queries.reviews import ReviewQueries

router = APIRouter(tags=["reviews"])


@router.get("/reviews", response_model=ReviewsOut)
async def get_reviews(
    user_data: dict = Depends(authenticator.get_current_account_data),
    queries: ReviewQueries = Depends()
):
    if user_data:
        return {
            "reviews": queries.get_all_reviews(),
        }

@router.post("/reviews", response_model=ReviewOut)
async def create_review(
    review: ReviewIn,
    user_data: dict = Depends(authenticator.get_current_account_data),
    queries: ReviewQueries = Depends()
):
    if user_data:
        return queries.create_review(review)

@router.put("/reviews/{review_id}", response_model=ReviewIn)
def update_review(
    review_id: int,
    review_in: ReviewIn,
    response: Response,
    queries: ReviewQueries = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data)
):
    if user_data:
        review = queries.update_review(review_id, review_in)
        if review is None:
            response.status_code = 404
        else:
            return review

@router.delete("/reviews/{review_id}", response_model=bool)
async def delete_review(
    review_id: int,
    queries: ReviewQueries = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data)
):
    if user_data:
        queries.delete_review(review_id)
        return True
