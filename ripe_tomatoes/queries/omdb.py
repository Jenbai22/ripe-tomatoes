import requests
import os

key = os.environ['OMDB_KEY']

class OmdbQueries:
    def get_by_name(self, name):
        res = requests.get(f'https://www.omdbapi.com/?apikey={key}&s={name}&type=movie')
        return res.json()

    def get_by_imdb(self, imdb):
        res = requests.get(f'https://www.omdbapi.com/?apikey={key}&i={imdb}&plot=full')
        return res.json()
