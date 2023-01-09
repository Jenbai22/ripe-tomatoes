from pydantic import BaseModel
from datetime import datetime

class Review(BaseModel):
    id: int
    body: str
    imdb: str
    posted: datetime
    username: str

class ReviewIn(BaseModel):
    body: str
    imdb: str
    username: str

class ReviewOut(ReviewIn):
    id: int
    posted: datetime

class ReviewsOut(BaseModel):
    reviews: list[Review]
