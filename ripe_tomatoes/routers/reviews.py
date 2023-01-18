from fastapi import APIRouter, Depends, Response, HTTPException, status, Request
from authenticator import authenticator
from models.reviews import ReviewsOut, Review, ReviewIn, ReviewOut
from queries.reviews import ReviewQueries

router = APIRouter(tags=["reviews"])

@router.get("/reviews/{imdb}", response_model=ReviewsOut)
def get_reviews_by_imdb(imdb: str, queries: ReviewQueries = Depends()):
    return {
        "reviews": queries.get_reviews_by_imdb(imdb)
    }

@router.get("/reviews", response_model=ReviewsOut)
async def get_reviews(
    queries: ReviewQueries = Depends()
):
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
    queries: ReviewQueries = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data)
):
    if review_in.dict()['username'] == user_data['username']:
        review = queries.update_review(review_id, review_in)
        if review is None:
            raise HTTPException(status_code = 404, detail= "No Such Review Exists")
        else:
            return review
    else:
        raise HTTPException(status_code = 403, detail= "Access Denied")


@router.delete("/reviews/{review_id}", response_model=bool)
async def delete_review(
    review_id: int,
    queries: ReviewQueries = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data)
):
    if user_data:
        return queries.delete_review(review_id)
