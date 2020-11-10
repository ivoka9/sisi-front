import React from "react";
import { Form, Container } from "semantic-ui-react";
import "../../Css/login.css";

function Login(props) {
  return (
    <div className="loginBlock">
      <Container textAlign="center" text className="loginContainter">
        <Form onSubmit={props.login}>
          <Form.Input
            size="huge"
            focus
            icon="user"
            type="text"
            name="username"
            placeholder="Username"
          ></Form.Input>
          <Form.Input
            size="huge"
            focus
            icon="eye"
            type="password"
            name="password"
            placeholder="Password"
          ></Form.Input>
          <Form.Button type="submit" size="huge" className="mt-2" primary>
            Submit
          </Form.Button>
        </Form>
      </Container>
    </div>
  );
}

export default Login;
