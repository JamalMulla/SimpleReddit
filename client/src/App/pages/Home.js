import React, { Component } from "react";
import { Link } from "react-router-dom";
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
  Col
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

  postsToItems(posts) {
    const items = posts.map(function(post) {
      return (
        <div key={post.title}>
          <div className="card border box frosted-dark text-white">
            <div className="card-header">Score: {post.score}</div>
            <div className="card-body">
              <h4 className="card-title">
                <a href={post.url}>{post.title}</a>
              </h4>
              <p className="card-text">
                <Markdown>{post.text}</Markdown>
              </p>
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
      <div className="posts-body container-fluid h-100 m-100">
        {this.state.posts.length == 0 && (
          <Container className="align-items-center">
            <Row className="justify-content-center">
              <Col xs="6">
                <Card>
                  <CardBody>
                    <CardText>
                      <Form>
                        <FormGroup>
                          <Input
                            type="text"
                            name="text"
                            id="subreddit"
                            placeholder="Subreddit"
                            onChange={this.changeSubreddit}
                          />
                        </FormGroup>
                      </Form>
                    </CardText>
                    <Button onClick={this.getPosts}>Submit</Button>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        )}
        {this.state.items.length > 0 && (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {this.state.items}
          </Masonry>
        )}
      </div>
    );
  }
}
export default Home;
