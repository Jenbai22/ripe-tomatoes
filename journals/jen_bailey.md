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
We created the protected routers for all the crud functions for reviews and the reviews queries. We created the router and queries for our 3rd party api OMDb.
We experimented with protecting the edit review to only be edited by the user that created the view. We managed to get that working but did not manage to get it to work for the delete function. We discussed handling this on the front end.
We realized that out response codes are not working so are going to fix that tomorrow along with starting the front end with react.

## Jan 10

Today we worked on:
We fixed the response codes and now they all work. We also fixed a bug that we noticed in the update user function.
Gavin had worked on some react pages last night so we all looked over those and decided we would not use Redux.
We started on the frontend authentication, we are able to login and get the token although are having some issues with setting the state which we will need to fix tomorrow.

## Jan 11

Today we worked on:
We fixed the front end login. We started working on the navbar and login modal. We had some issues with the bootstrap but realized we had not imported the bootstrap CSS into the index file. We then had issues with being able to log out but fixed it by taking a closer look at the Auth file. We now have a navbar and functioning logout button and login modal. Tomorrow we will work on the sign up modal and home page.

## Jan 12

Today we worked on:
We completed the sign up modal with code Gavin had prepared earlier. We contemplated routing the sign up modal to the login modal after submission but instead decided to automatically log the user in. We then worked on the home page showing a few movies and adding the search functionality. Once the search functionality is submitted the cards displayed contain a link that redirects the user to the movie detail page when they click on it. We added the movie details to the detail page along with the list of reviews and post function. Tomorrow we will work on allowing users to edit or delete their own reviews, rerouting the logout to the home page and adding a home button in the Navbar.

## Jan 13

Today we worked on:
We attempted to create an edit modal for logged in users to be able to edit their reviews. We could not get the modal to access the correct review id and spent some time trying to get it to work. We are going to move away from the modal and have the user edit the review in the bottom text input bar.

## Jan 17

Today we worked on:
Gavin worked on the edit and delete button over the weekend so we checked through the code. We added error alerts on the post review method, login, sign up and search bar. We fixed the user update endpoint. Tomorrow we are going to work on the tests.

## Jan 18

Today we worked on:
We each created a test for our an endpoint and managed to get all the tests to pass. We then thought about stretch goals. We decided to create a favorites page so we created a favorites table and finished the backend models, queries and routers for it. We started working on the front end and made a favorite button on the detail page that creates a favorite. Tomorrow we will work on the favorites react page.
