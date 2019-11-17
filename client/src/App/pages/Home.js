import React, { Component } from "react";
import { IconContext } from "react-icons";
import { FaMedal, FaArrowLeft } from "react-icons/fa";
import {
  Container as FabContainer,
  Button as FabButton
} from "react-floating-action-button";
import {
  Card,
  CardText,
  CardBody,
  Button,
  Form,
  FormGroup,
  Input,
  Row,
  Col,
  Badge,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap";
import { toast } from "react-toastify";
import Markdown from "markdown-to-jsx";
import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
  default: 5,
  1400: 4,
  1100: 3,
  700: 2,
  500: 1
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      subreddit: null,
      items: [],
      toastId: null,
      modal: false,
      modalHeader: "",
      modalText: "",
      modalLink: ""
    };
    this.getPosts = this.getPosts.bind(this);
    this.changeSubreddit = this.changeSubreddit.bind(this);
    this.postsToItems = this.postsToItems.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  notify = error => {
    if (!toast.isActive(this.state.toastId)) {
      const toastId = toast.error(error, {
        position: toast.POSITION.TOP_RIGHT
      });
      this.setState({ toastId });
    }
  };

  reset = () => {
    this.setState({
      posts: [],
      subreddit: null,
      items: [],
      toastId: null,
      modal: false,
      modalHeader: "",
      modalText: "",
      modalLink: ""
    });
  };

  dismissAll = () => toast.dismiss();

  getPosts = () => {
    const url = "/api/" + this.state.subreddit + "/articles";
    fetch(url)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Could not load posts");
        }
      })
      .then(posts => {
        this.setState({ posts }, () => {
          this.postsToItems(posts);
          this.dismissAll();
        });
      })
      .catch(error => {
        this.notify(error.message);
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

  toggleModal = () => {
    this.setState({ modal: !this.state.modal });
  };

  showModal = (title, text, link) => {
    this.setState(
      { modalHeader: title, modalText: text, modalLink: link },
      () => {
        this.toggleModal();
      }
    );
  };

  postsToItems(posts) {
    const items = posts.map(post => {
      return (
        <div key={post.title}>
          <div className="card border box frosted-dark text-white">
            <div className="card-header">
              <div className="row m-0 justify-content-between">
                <div>
                  <div style={{ fontSize: "13px" }}>Score: {post.score}</div>
                  <div style={{ fontSize: "13px" }}>
                    Comments: {post.num_comments}
                  </div>
                </div>
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
                {post.locked && (
                  <div>
                    <Badge color="primary">Locked</Badge>
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
              <Row className="align-items-between">
                {(post.platinum !== 0 ||
                  post.gold !== 0 ||
                  post.silver !== 0) && (
                  <Row className="ml-2">
                    {post.platinum !== 0 && (
                      <Col>
                        <IconContext.Provider value={{ color: "#e5e4e2" }}>
                          <div>
                            <FaMedal size={16} />
                          </div>
                        </IconContext.Provider>
                        <p className="gild-text">x{post.platinum}</p>
                      </Col>
                    )}
                    {post.gold !== 0 && (
                      <Col>
                        <IconContext.Provider value={{ color: "#FFD700" }}>
                          <div>
                            <FaMedal size={16} />
                          </div>
                        </IconContext.Provider>
                        <p className="gild-text">x{post.gold}</p>
                      </Col>
                    )}
                    {post.silver !== 0 && (
                      <Col>
                        <IconContext.Provider value={{ color: "#c0c0c0" }}>
                          <div>
                            <FaMedal size={16} />
                          </div>
                        </IconContext.Provider>
                        <p className="gild-text">x{post.silver}</p>
                      </Col>
                    )}
                  </Row>
                )}
                {post.text !== "" && (
                  <Col>
                    <Button
                      outline
                      className="frosted-dark"
                      color="light"
                      onClick={e => {
                        e.preventDefault();
                        this.showModal(post.title, post.text, post.link);
                      }}
                    >
                      Expand
                    </Button>
                  </Col>
                )}
                <Col className="text-right">by {post.author}</Col>
              </Row>
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
        {this.state.posts.length > 0 && (
          <FabContainer className="above">
            <FabButton
              tooltip="Go back"
              onClick={e => {
                e.preventDefault();
                this.reset();
              }}
              styles={{ backgroundColor: "#ff8880", color: "#fff" }}
            >
              <FaArrowLeft size={32} />
            </FabButton>
          </FabContainer>
        )}
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          centered={true}
          size={"lg"}
          className="custom-modal"
        >
          <ModalHeader toggle={this.toggleModal}>
            {this.state.modalHeader}
          </ModalHeader>
          <ModalBody>
            <Markdown>{this.state.modalText}</Markdown>
          </ModalBody>
          <ModalFooter>
            <Button outline className="frosted-dark" color="light">
              <a
                href={this.state.modalLink}
                target="_blank"
                style={{ textDecoration: "none" }}
              >
                Open
              </a>
            </Button>
            <Button
              outline
              className="frosted-dark"
              color="dark"
              onClick={e => {
                e.preventDefault();
                this.toggleModal();
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </Modal>
        {this.state.posts.length == 0 && (
          <Row className="justify-content-center m-100 align-items-center">
            <Col md="6">
              <Card className="border border-light frosted-glass">
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
                    className="frosted-dark"
                    color="light"
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
          </Row>
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
