const express = require("express");
const path = require("path");
const axios = require("axios");

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

async function getTopPostsFromSubreddit(url) {
  var slimmedPosts = [];
  await axios
    .get(url)
    .then(response => {
      console.log("Got response");
      posts = response.data.data.children;
      posts.forEach(function(post) {
        postData = post.data;
        slimmedPost = {
          subreddit: postData.subreddit,
          gilded: postData.gilded,
          title: postData.title,
          score: postData.score,
          created: postData.created,
          spoiler: postData.spoiler,
          nsfw: postData.over_18,
          author: postData.author,
          num_comments: postData.num_comments,
          stickied: postData.stickied,
          url: postData.url,
          text: postData.selftext,
          is_video: postData.is_video,
          id: postData.id,
          locked: postData.locked,
          thumbnail: postData.thumbnail
        };

        slimmedPosts.push(slimmedPost);
      });
    })
    .catch(error => {
      console.log(error);
    });
  console.log("Returning titles");
  return slimmedPosts;
}

// An api endpoint that returns a short list of items
app.get("/api/:subreddit/articles", async (req, res) => {
  var sub = req.params.subreddit;
  var url = "https://www.reddit.com/r/" + sub + "/.json?limit=20";
  const posts = await getTopPostsFromSubreddit(url);
  res.json(posts);
  console.log("Sent list of items");
});

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);
