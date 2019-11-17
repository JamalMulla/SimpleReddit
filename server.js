const express = require("express");
const path = require("path");
const axios = require("axios");

const app = express();

app.use(express.static(path.join(__dirname, "client/build")));

async function getTopPostsFromSubreddit(url) {
  let slimmedPosts = [];
  await axios
    .get(url)
    .then(response => {
      posts = response.data.data.children;
      posts.forEach(post => {
        postData = post.data;
        const gildings = postData.gildings;
        let platinum = 0;
        let gold = 0;
        let silver = 0;
        if (gildings.gid_3) {
          platinum = gildings.gid_3;
        }
        if (gildings.gid_2) {
          gold = gildings.gid_2;
        }
        if (gildings.gid_1) {
          silver = gildings.gid_1;
        }

        slimmedPost = {
          subreddit: postData.subreddit,
          gold: gold,
          silver: silver,
          platinum: platinum,
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
          id: postData.id,
          locked: postData.locked,
          thumbnail: postData.thumbnail,
          link: "https://reddit.com" + postData.permalink
        };

        slimmedPosts.push(slimmedPost);
      });
    })
    .catch(error => {
      console.log(error);
    });
  return slimmedPosts;
}

// An api endpoint that returns a short list of items
app.get("/api/:subreddit/articles", async (req, res) => {
  var sub = req.params.subreddit;
  var url = "https://www.reddit.com/r/" + sub + "/.json?limit=20";
  const posts = await getTopPostsFromSubreddit(url);
  if (!posts || posts.length == 0) {
    res.sendStatus(422);
  } else {
    res.json(posts);
  }
});

// Handles any requests that don't match the ones above
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
server = app.listen(port);
console.log("App is listening on port " + port);
module.exports = server;
