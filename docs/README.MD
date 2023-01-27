# Ripe Tomatoes

Your one stop shop movie community~!

Search up, review and favorite over 280,000 titles!

## Team Members

- Gavin Andrew
- Leo Galvan
- Jen Bailey
- Mohammed (Mo) Khan
- Michael Stuart

## Design

[API Design](/docs/api-design.md)

[Data Models](/docs/data-models.md)

[GHI](/docs/ghi.md)

[Integrations](/docs/integrations.md)

## Intended Market

Any and all watchers of movies

## Functionality

- Visitors to the site can take a look around search for movies:
  - They can click on a movie and see info regarding the movie and reviews left by users.
  - A visitor can also create an account, log in, and out.
- A registed user can leave, edit and delete their reviews on a movie.
- A registed user can add and remove movies to and from their favorites list.

## Non-deliverable functionality

- Considering implementing a user page to allow a user to change account information, and see past activity such as their reviews
- Considering the implementation of a second third party api to add movie trailers to the move detail

## Project Initialization

### To fully enjoy this application on your local machine, please make sure to follow these steps:

1. Clone the repository down to your local machine
2. CD into the new project directory
3. Run `docker volume create pg-admin`
4. Run `docker volume create postgres-data`
5. If using Mac M1 chip run `export DOCKER_DEFAULT_PLATFORM=linux/amd64`
6. Run `docker compose build`
7. Run `docker compose up`

## Tests

- [Test Reviews](ripe_tomatoes/tests/test_reviews_get.py) / Leo Galvan
- [Test Delete Review](/ripe_tomatoes/tests/test_reviews_delete.py) / Mohammed (Mo) Khan
- [Test Get Reviews by IMDB](/ripe_tomatoes/tests/test_reviews_get_by_imdb.py) / Gavin Andrew
- [Test Create Review](/ripe_tomatoes/tests/test_reviews_create.py) / Jen Bailey
- [Test Get Users by Username](/ripe_tomatoes/tests/test_users_get_by_username.py) / Michael Stuart
- [Test Update Reviews](/ripe_tomatoes/test/test_reviews_update.py) / Group
- [Test Get Users](/ripe_tomatoes/test/test_users_get.py) / Group
