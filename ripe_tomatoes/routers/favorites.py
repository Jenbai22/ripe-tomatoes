from fastapi import (
    APIRouter,
    Depends,
)
from models.favorites import FavoriteIn, Favorite, FavoritesOut
from queries.favorites import FavoriteQueries
from authenticator import authenticator

router = APIRouter(tags=["favorites"])


@router.get("/favorites/count/{imdb}")
def get_favorite_count_by_imdb(
    imdb: str, queries: FavoriteQueries = Depends()
):
    return {"favorites": queries.get_favorite_count_by_imdb(imdb)}


@router.get("/favorites/{username}", response_model=FavoritesOut)
def get_favorites_by_username(
    username: str,
    queries: FavoriteQueries = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
):
    if user_data:
        return {"favorites": queries.get_favorites_by_username(username)}


@router.get("/favorites")
def get_all_favorites(
    queries: FavoriteQueries = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
):
    if user_data:
        return queries.get_all_favorites()


@router.post("/favorites", response_model=Favorite)
def create_favorite(
    favorite: FavoriteIn,
    queries: FavoriteQueries = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
):
    if user_data:
        return queries.create_favorite(favorite)


@router.delete("/favorites/{id}", response_model=bool)
def delete_favorite(
    id: int,
    queries: FavoriteQueries = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
):
    if user_data:
        return queries.delete_favorite(id)
