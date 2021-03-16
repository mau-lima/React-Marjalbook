import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Container, Header, Segment, Image } from "semantic-ui-react";
import { useThunkDispatch } from "../..";
import { setLoading } from "../../actions/loading/set";
import { openModal } from "../../actions/modal/open";
import { removeToken } from "../../actions/token/remove";
import { getUser } from "../../actions/user/get";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { IRootState } from "../../app/models/rootState";
import { LoginForm } from "../user/LoginForm";
import { RegisterForm } from "../user/RegisterForm";

export const HomePage = () => {
  const user = useSelector((state: IRootState) => state.user);
  const loading = useSelector((state: IRootState) => state.loading);
  const dispatch = useThunkDispatch();
  const isLoggedIn = !!user;

  const token = useSelector((state: IRootState) => state.token);

  
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          Reactivities
        </Header>
        {loading ? (
          <LoadingComponent content="Loading..." />
        ) : isLoggedIn && user ? (
          <Fragment>
            <Header
              as="h2"
              inverted
              content={`Welcome back ${user.displayName}`}
            />
            <Button as={Link} to="/activities" size="huge" inverted>
              Go to activities!
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <Header as="h2" inverted content="Welcome to Reactivities" />
            <Button
              onClick={() => dispatch(openModal(<LoginForm />))}
              to="/login"
              size="huge"
              inverted
            >
              Login
            </Button>
            <Button
              onClick={() => dispatch(openModal(<RegisterForm />))}
              to="/register"
              size="huge"
              inverted
            >
              Register
            </Button>
          </Fragment>
        )}
      </Container>
    </Segment>
  );
};
