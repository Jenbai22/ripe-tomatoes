from fastapi import APIRouter, Depends
from queries.omdb import OmdbQueries

router = APIRouter(tags=["omdb"])

@router.get('/searchname/{name}')
def get_by_name(name: str, repo: OmdbQueries = Depends()):
    return repo.get_by_name(name)

@router.get('/searchimdb/{imdb}')
def get_by_imdb(imdb: str, repo: OmdbQueries = Depends()):
    return repo.get_by_imdb(imdb)
