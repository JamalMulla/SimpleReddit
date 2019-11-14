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

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      subreddit: null
    };
    this.getPosts = this.getPosts.bind(this);
    this.changeSubreddit = this.changeSubreddit.bind(this);
  }

  getPosts = () => {
    console.log(this.state.subreddit);
    console.log("Getting posts");
    fetch("/api/" + this.state.subreddit + "/articles")
      .then(res => res.json())
      .then(posts => {
        this.setState({ posts });
        console.log(posts);
      });
  };

  changeSubreddit = event => {
    this.setState({ subreddit: event.target.value });
  };

  render() {
    // assuming you are getting your card data in a large json object
    let postList = [];
    this.state.posts.forEach(post => {
      postList.push(
        <Card>
          <CardTitle>{post.title}</CardTitle>
          <CardText>
            <Markdown>{post.text}</Markdown>
          </CardText>
        </Card>
      );
    });
    return (
      <React.Fragment>
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
        {this.state.posts.length > 0 && postList}
      </React.Fragment>
    );
  }
}
export default Home;
