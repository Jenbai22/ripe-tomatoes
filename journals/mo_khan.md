## Jan 4th 2023
- As a team we shared our repo setup and made sure live-sharing within VS code was working.
- We discussed which database would probably work best for us between MongoDB and Postgres-SQL.

## Jan 5th 2023

- We started work on our docker.compose.yaml file, the requirements.txt file, and worked on the base template.
- we created some tables and made migrations.

## Jan 6th 2023

- Worked on router and query files as well as testing them with the FastAPI swagger framework.
-Worked mostly on authentication for login with a token as well as logout functionality.

## Jan 9th 2023

-Continued work on the protected router and all reminaing CRUD functaionality in terms of leaving reviews by signed in users.
-Created router and query files for the 3rd party imported API, OMDB.
-Discussed how much fuinctionality we wanted to just leave for the frontend in regards to editing and deleting a review.
-Need to work on some of our response codes - aiming to do so tomorrow.

## Jan 10th 2023

-Updated response codes so that they are functional and improved functionality on the user function.
-Discussed the pros/cons as well as "is there really a need for" React vs Redux and decided we would not use Redux.
-Started work on frontend authentication and token but still are having some issues.

## Jan 11th 2023

-Are now able to implement authentication on the frontend and able to login with a modal. Worked on the navbar and looked at how we could implement bootstrap functionality. Login and logout within the modal are working fine.

## Jan 12th 2023

-With code prepped by Gavin before hand, we finishe dthe sign up modal.
-Completed fuinctionality so that the signup modal would directly let the user login after submission.
-Fixed the home page so that a few movies and their cards would show up and added a search bar to find other movies. The cards also link to an indivdiual movie page where users can read reviews and if signed in, they can leave reviews themselves.

## Jan 13th 2023

-Attempted to create edit and delete buttons in the reviews of a signed in user.
-The edit button was suppposed to open up a modal but we ran into some issues there and ultimately decied to move away from that idea.

## Jan 17th 2023

-Gavin had worked on some new implementations on the edit and delete buttons, moving away from bootstrap and instead going back to css/html.
-We added error messages and limitations to the reviews, login, signup, and search bar.
-We plan on working on tests tomorrow but it seems like we have a mostly completed implementation from our original vision on the excalidraw.

## Jan 18th 2023

-Each of us designed tests for the project and troubleshooted as a group when any of us would come across any issues.
-Started to lay out a favorites router, query, and modal in our dream branch as we start to work towards stretch goals. We want to eventually create a user page which links certain

## Jan 19th 2023

-Today implemented favorites on the frontend with link to a user's favorites page. User's are also able to add and delete movies from their favorites lists.

## Jan 20th 2023

-Today we implemented our next set of stretch goals which worked on a loading screen in between requests. We also cleaned up some code based off of some errors we noticed during testing about movies that did not have a poster that wasn't filtering out. We also implemented a randomized layout of movies for our home page. Our next goal is to create a more responsive home button and different page/url that it will take users of the site to.

## Jan 23th 2023

-Today we mostly spendt time looking over the code for code cleanliness and testing.

## Jan 24th 2023

-Today we worked on the ReadMe file. Created the ghi gifs, created api designs, data models, and integrations to implement with the ReadMe.

## Jan 25th 2023

-Today we started working on deployment, setting up our caprover account and working through the git.ci.yml file.

## Jan 26th 2023

-We ran across multiple errors and consulted with other teams, Riley, Dalonte, as well as the helpdesk team on gitlab and were finally able to get the deployed site working.

## Jan 27th 2023

-Worked out final errors and tested to ensure that both the site was running on the server as well as locally. Needed to clear up that the Dockerfile and DockerfileDev were appropriately configured to run on ther server as well as locally.
