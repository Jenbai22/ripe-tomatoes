### User authentication

### Get a List of Users

- Endpoint path: /users
- Endpoint method: GET

- Headers:

  - Authorization: Bearer token

- Response: A list of all users
- Response shape:
  ```json
  {
    "users": [
      {
        "id": int,
        "username": str,
        "firstname": str,
        "lastname": str,
        "email": str,
        "hashed_password": str
      }
    ]
  }
  ```

### Create an Account

- Endpoint path: /users
- Endpoint method: POST

- Request shape (form):

  ```json
  {
    "username": str,
    "firstname": str,
    "lastname": str,
    "email": str,
    "password": str
  }
  ```

- Response: Create an account
- Response shape:
  ```json
  {
    "access_token": str,
    "token_type": str,
    "user": {
      "id": int,
      "username": str
    }
  }
  ```

### Get User by Username

- Endpoint path: /users/<str:username>
- Endpoint method: GET

- Response: Get user by username
- Response shape:
  ```json
     {
      "id": int,
      "username": str,
      "firstname": str,
      "lastname": str,
      "email": str,
      "hashed_password": str
    }
  ```

### Update User

- Endpoint path: /users/<int:user_id>
- Endpoint method: PUT

- Request shape (form):

  ```json
  {
    "username": str,
    "firstname": str,
    "lastname": str,
    "email": str
  }
  ```

- Response: Update user
- Response shape:
  ```json
  {
    "id": int,
    "username": str
  }
  ```

### Delete User

- Endpoint path: /users/<int:id>
- Endpoint method: DELETE

- Response: Delete user
- Response shape (JSON):
  ```json
  true
  ```

### Get Token

- Endpoint path: /token
- Endpoint method: GET

- Headers:

  - Authorization: Bearer token

- Response: Token
- Response shape:
  ```json
  {
    "access_token": str,
    "token_type": str,
    "user": {
      "id": int,
      "username": str
    }
  }
  ```

### Login

- Endpoint path: /token
- Endpoint path: POST

- Request shape (form):

  ```json
    {
      "username": str,
      "password": str
    }
  ```

- Response: Account information and a token
- Response shape (JSON):
  ```json
  {
    "access_token": str,
    "token_type": str
  }
  ```

### Log Out

- Endpoint path: /token
- Endpoint method: DELETE

- Headers:

  - Authorization: Bearer token

- Response: Always true
- Response shape (JSON):
  ```json
  true
  ```

### List Reviews by Corresponding IMDB#

- Endpoint path: /reviews/<str:imdb>
- Endpoint method: GET

- Response: List reviews by imdb
- Response shape:
  ```json
  {
    "reviews": [
      {
        "id": int,
        "body" : str,
        "imdb" : str,
        "posted": datetime,
        "username" : str,
        "edited": bit
      }
    ]
  }
  ```

### List All Reviews

- Endpoint path: /reviews
- Endpoint method: GET

- Response: List of all existing reviews
- Response shape:
  ```json
  {
    "reviews": [
      {
        "id": int,
        "body" : str,
        "imdb" : str,
        "posted": datetime,
        "username" : int,
        "edited": bit
      }
    ]
  }
  ```

### Create Review

- Endpoint path: /reviews
- Endpoint method: POST

- Headers:

  - Authorization: Bearer token

- Request shape (form):

  ```json
  {
    "body" : str,
    "imdb" : str,
    "username" : str,
    "edited" : bit,
  }
  ```

- Response: Create a review
- Response shape:
  ```json
  {
    "body" : str,
    "imdb" : str,
    "username" : str,
    "edited" : bit,
    "id": int,
    "posted": date
  }
  ```

### Update Review

- Endpoint path: /reviews/<int:id>
- Endpoint method: PUT

- Headers:

  - Authorization: Bearer token

- Request shape (form):

  ```json
  {
    "body" : str,
    "imdb" : str,
    "username" : int,
    "edited" : bit,
  }
  ```

- Response: Update a review
- Response shape:
  ```json
  {
    "body" : str,
    "imdb" : str,
    "username" : int,
    "edited" : bit,
  }
  ```

### Delete a Review

- Endpoint path: /reviews/<int:id>
- Endpoint method: DELETE

- Headers:

  - Authorization: Bearer token

- Response: Delete a review
- Response shape (JSON):
  ```json
  true
  ```

### Get Favorite Count By IMDb

- Endpoint path: /favorites/count/<int:id>
- Endpoint method: GET

- Response: How many times a movie has been favorited
- Response shape:

  ```json
  {
    "favorites": int
  }
  ```

### Get Favorites By Username

- Endpoint path: /favorites/<str:username>
- Endpoint method: GET

- Response: List of favorites by username
- Response shape:

  ```json
  {
    "favorites": [
      {
        "id": int,
        "imdb": str,
        "username": str,
        "poster":str
      }
    ]
  }
  ```

### Get All Favorites

- Endpoint path: /favorites>
- Endpoint method: GET

- Response: List of all favorites
- Response shape:

  ```json
  {
    "favorites": [
      {
        "id": int,
        "imdb": str,
        "username": str,
        "poster":str
      }
    ]
  }
  ```

### Create a Favorite

- Endpoint path: /favorites
- Endpoint method: POST

- Request shape (form):

  ```json
  {
    "imdb": str,
    "username": str,
    "poster": str,
  }
  ```

- Response: Create a Favorite
- Response shape:
  ```json
  {
    "id": int,
    "imdb": str,
    "username": str,
    "poster": str
  }
  ```

### Delete a Favorite

- Endpoint path: /favorites/<int:id>
- Endpoint method: DELETE

- Headers:

  - Authorization: Bearer token

- Response: Delete a Favorite
- Response shape (JSON):
  ```json
  true
  ```

### Search For Movies by Name

- Endpoint path: /searchname/<str:name>
- Endpoint method: GET

- Response: List of Movies
- Response shape:

  ```json
  {
  "Search": [
    {
      "Title": str,
      "Year": int,
      "imdbID": str,
      "Type": str,
      "Poster": url
    }
  ],
  "totalResults": int,
  "Response": bool
  }
  ```

### Search For a Movie by IMDb

- Endpoint path: /searchname/<str:imdb>
- Endpoint method: GET

- Response: A movie's details
- Response shape:

  ```json
  {
    "Title": str,
    "Year": int,
    "Rated": str,
    "Released": date,
    "Runtime": str,
    "Genre": str,
    "Director": str,
    "Writer": str,
    "Actors": str,
    "Plot": str,
    "Language": str,
    "Country": str,
    "Awards": str,
    "Poster": url,
    "Ratings": [
      {
        "Source": str,
        "Value": str
      }
    ],
    "Metascore": int,
    "imdbRating": float,
    "imdbVotes": int,
    "imdbID": str,
    "Type": str,
    "DVD": date,
    "BoxOffice": str,
    "Production": str,
    "Website": str,
    "Response": bool
  }
  ```
