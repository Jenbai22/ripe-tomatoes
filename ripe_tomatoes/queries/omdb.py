import requests
import os

key = os.environ['OMDB_KEY']

class OmdbQueries:
    def get_by_name(self, name):
        res = requests.get(f'https://www.omdbapi.com/?apikey={key}&t={name}&plot=full')
        return res.json()
