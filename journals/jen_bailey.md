## Jan 5

Today, we worked on:

Today we setup the project from the template. We completed the docker-compose.yml file, requirements.txt file.
We created a table and migrated.

## Jan 6

Today we worked on:
We created a router and query file for users and tested the api calls in swagger.
We spent the rest of the day working on the the authentication. We managed to get the authentication working and tested that we could log in with a token and logout successfully.
On Monday we are going to work on the protected routers and creating all the crud functions for reviews.

## Jan 9

Today we worked on:
We created the protected routers for all the crud functions for reviews and the reviews queries. We created the router and queries for our 3rd party api OMDB.
We experimented with protecting the edit review to only be edited by the user that created the view. We managed to get that working but did not manage to get it to work for the delete function. We discussed handling this on the front end.
We realized that out response codes are not working so are going to fix that tomorrow along with starting the front end with react.

## Jan 10

Today we worked on:
We fixed the response codes and now they all work. We also fixed a bug that we noticed in the update user function.
Gavin had worked on some react pages last night so we all looked over those and decided we would not use Redux.
We started on the frontend authentication, we are able to login and get the token although are having some issues with setting the state which we will need to fix tomorrow.

## Jan 11

Today we worked on:
We fixed the front end login. We started working on the navbar and login modal. We had some issues with the bootstrap but realized we had not imported the bootstrap CSS into the index file. We then had issues with being able to log out but fixed it by taking a closer look at the Auth file. We now have a navbar and functioning logout button and login modal. Tomorrow we will work on the signup modal and home page.
