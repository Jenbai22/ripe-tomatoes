from pydantic import BaseModel


class Favorite(BaseModel):
    id: int
    imdb: str
    username: str
    poster: str


class FavoriteIn(BaseModel):
    imdb: str
    username: str
    poster: str


class FavoritesOut(BaseModel):
    favorites: list[Favorite]
