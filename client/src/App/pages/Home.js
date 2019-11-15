import React, { Component } from "react";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaMedal } from "react-icons/fa";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardHeader,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
  Collapse,
  Badge
} from "reactstrap";
import Markdown from "markdown-to-jsx";
import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
  default: 5,
  1300: 4,
  1000: 3,
  700: 2,
  500: 1
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      subreddit: null,
      items: []
    };
    this.getPosts = this.getPosts.bind(this);
    this.changeSubreddit = this.changeSubreddit.bind(this);
    this.postsToItems = this.postsToItems.bind(this);
  }

  getPosts = () => {
    fetch("/api/" + this.state.subreddit + "/articles")
      .then(res => res.json())
      .then(posts => {
        this.setState({ posts }, () => this.postsToItems(posts));
        console.log(posts);
      });
  };

  changeSubreddit = event => {
    this.setState({ subreddit: event.target.value });
  };

  _handleKeyDown = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.getPosts();
    }
  };

  postsToItems(posts) {
    const items = posts.map(function(post) {
      return (
        <div key={post.title}>
          <div className="card border box frosted-dark text-white">
            <div className="card-header">
              <div className="row m-0 justify-content-between">
                <div>Score: {post.score}</div>
                {post.nsfw && (
                  <div>
                    <Badge color="danger">NSFW</Badge>
                  </div>
                )}
                {post.spoiler && (
                  <div>
                    <Badge color="warning">Spoiler</Badge>
                  </div>
                )}
                {post.stickied && (
                  <div>
                    <Badge color="success">Stickied</Badge>
                  </div>
                )}
              </div>
            </div>
            <div className="card-body">
              <h4 className="card-title">
                <a href={post.link} target="_blank">
                  {post.title}
                </a>
              </h4>
              <hr className="mt-4" />
              <div className="row mr-2 ml-2">
                {post.platinum !== 0 && (
                  <div className="mr-2">
                    <IconContext.Provider value={{ color: "#e5e4e2" }}>
                      <div>
                        <FaMedal size={16} />
                      </div>
                    </IconContext.Provider>
                    <p className="gild-text">x{post.platinum}</p>
                  </div>
                )}
                {post.gold !== 0 && (
                  <div className="mr-2">
                    <IconContext.Provider value={{ color: "#FFD700" }}>
                      <div>
                        <FaMedal size={16} />
                      </div>
                    </IconContext.Provider>
                    <p className="gild-text">x{post.gold}</p>
                  </div>
                )}
                {post.silver !== 0 && (
                  <div className="mr-2">
                    <IconContext.Provider value={{ color: "#c0c0c0" }}>
                      <div>
                        <FaMedal size={16} />
                      </div>
                    </IconContext.Provider>
                    <p className="gild-text">x{post.silver}</p>
                  </div>
                )}
              </div>

              {/* {post.text !== "" && (
                <div>
                  <p className="card-text">
                    <Markdown>{post.text}</Markdown>
                  </p>
                </div>
              )} */}
            </div>
          </div>
        </div>
      );
    });
    this.setState({
      items
    });
  }

  render() {
    return (
      <div className="container-fluid m-100 posts-body">
        {this.state.posts.length == 0 && (
          <div className="justify-content-center m-100 align-items-center row">
            <Col md="6">
              <Card className="border border-light bg-transparent">
                <CardBody>
                  <CardText>
                    <Form>
                      <FormGroup>
                        <Input
                          className="transparent-input"
                          type="text"
                          id="subreddit"
                          placeholder="Subreddit"
                          style={{ color: "#fff" }}
                          onKeyDown={this._handleKeyDown}
                          onChange={this.changeSubreddit}
                        />
                      </FormGroup>
                    </Form>
                  </CardText>
                  <Button
                    outline
                    color="success"
                    block
                    onClick={e => {
                      e.preventDefault();
                      this.getPosts();
                    }}
                  >
                    Submit
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </div>
        )}
        {this.state.items.length > 0 && (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="masonry-grid pt-3"
            columnClassName="masonry-grid_column"
          >
            {this.state.items}
          </Masonry>
        )}
      </div>
    );
  }
}
export default Home;
