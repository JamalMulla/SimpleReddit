var request = require("supertest");

const fields = [
  "subreddit",
  "gold",
  "silver",
  "platinum",
  "title",
  "score",
  "created",
  "spoiler",
  "nsfw",
  "author",
  "num_comments",
  "stickied",
  "url",
  "text",
  "id",
  "locked",
  "thumbnail",
  "link"
];
describe("loading express server", function() {
  var server;
  beforeEach(() => {
    server = require("./server");
  });
  afterEach(() => {
    server.close();
  });
  it("responds to /", function testSlash(done) {
    request(server)
      .get("/")
      .expect(200, done);
  });
  it("returns valid posts for a subreddit that exists", async done => {
    const res = await request(server).get("/api/news/articles");

    expect(res.statusCode).toEqual(200);
    res.body.forEach(post => {
      fields.forEach(field => {
        expect(post).toHaveProperty(field);
      });
    });
    done();
  });
  it("returns 422 for invalid subreddit", async done => {
    const res = await request(server).get("/api/amish/articles");

    expect(res.statusCode).toEqual(422);
    done();
  });
});
