from fastapi import APIRouter, Depends
from queries.omdb import OmdbQueries

router = APIRouter(tags=["omdb"])

@router.get('/search/{name}')
def get_by_name(name: str, repo: OmdbQueries = Depends()):
    return repo.get_by_name(name)
