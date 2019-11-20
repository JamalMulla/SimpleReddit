import React from "react";
import renderer from "react-test-renderer";
import { mount, shallow } from "enzyme";
import Home from "../../App/pages/Home";
import fetchMock from "fetch-mock";
import makeRequest from "fetch-mock";
import { MemoryRouter } from "react-router-dom";
import { Input, Button, Badge } from "reactstrap";
import { FaMedal, FaArrowLeft } from "react-icons/fa";
import { IconContext } from "react-icons";
import "../../jest.setup";
// import "../../../jest.setup";
import {
  Container as FabContainer,
  Button as FabButton
} from "react-floating-action-button";

const fakePost = {
  subreddit: "/r/subreddit",
  gold: 0,
  silver: 1,
  platinum: 0,
  title: "Test post",
  score: 2000,
  created: "1574278647",
  spoiler: true,
  nsfw: false,
  author: "Jamal",
  num_comments: 0,
  stickied: false,
  url: "/r/subreddit/skiaso/test_post",
  text: "Lorem ipsum",
  id: 0,
  locked: false,
  thumbnail: null,
  link: "https://reddit.com/r/subreddit/skiaso/test_post"
};

describe("Homepage", () => {
  it("renders the subreddit form", () => {
    const wrapper = mount(<Home />);
    expect(wrapper.find(Input).length).toEqual(1);
    expect(wrapper.find(Button).length).toEqual(1);
    expect(wrapper.find(FabContainer).length).toEqual(0);
    expect(wrapper.find(FabButton).length).toEqual(0);
  });

  it("no longer renders input but does renders fab when we get some posts", () => {
    const wrapper = mount(<Home />);
    expect(wrapper.find(Input).length).toEqual(1);
    expect(wrapper.find(Button).length).toEqual(1);
    wrapper.setState({ posts: [fakePost] });
    //Fab for going back
    expect(wrapper.find(FabContainer).length).toEqual(1);
    expect(wrapper.find(FabButton).length).toEqual(1);
    expect(wrapper.find(Input).length).toEqual(0);
  });

  it("can makes a request when the submit button is clicked", done => {
    const wrapper = mount(<Home />);

    var a = fetchMock.get("/api/" + fakePost.subreddit + "/articles", [
      fakePost
    ]);

    wrapper.setState({ subreddit: fakePost.subreddit });
    wrapper.find(Button).simulate("click");
    expect(a.called()).toEqual(true);

    fetchMock.restore();
    done();
  });
});
