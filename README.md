# WebAppCisco
Simple web app to display top reddit articles for a specific subreddit

# Frameworks
The webapp is using Express as the backend server and React as the frontend.

# Running locally
To run locally you need to run both the server and frontend. You can do this by running `npm start` in both the root directory and the client/ directory. The root contains the server and the client/ directory contains the webapp.

# Overview
The frontend has a simple input for the user to put in a subreddit name. When the user presses submit, this is sent to the Express server by using the following endpoint `/api/:subreddit/articles`. The server then requests the top 20 posts for that subreddit from Reddit and parses the JSON to only get the most relevant fields. This new JSON object is then returned. 
Currently this new object includes:

* subreddit - Subreddit name
* gold - Number of gold awards
* silver - Number of silver awards
* platinum - Number of platinum awards
* title - Title of post
* score - Score of post. Shows upvotes - downvotes (roughly)
* created - When the post was created as a unix timestamp
* spoiler - If it is marked as a spoiler
* nsfw - If the post is marked as NSFW/Over 18
* author - User that created the post
* num\_comments - Number of comments
* stickied - If the post is stickied by a moderator
* url - Context dependant URL. Could be image, video, external link or link to the post if it is a selftext post
* text - Text of post if there is any
* id - Id of post
* locked - If the post has been locked by a moderator
* thumbnail - Small image preview if there is one
* link - Full permanent link to post

# Demo
The webapp is running on Heroku [here](https://cisco-webapp.herokuapp.com/)
