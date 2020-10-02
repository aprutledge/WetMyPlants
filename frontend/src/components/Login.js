import React, { useState, useRef } from "react";
import { Button, Form, FormGroup, FormCheck } from "react-bootstrap";

import AuthService from "../services/authService";

const Login = (props) => {
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const handleLogin = () => {
    props.updateLoginStatus();
    console.log(username + ": " + password);
    AuthService.login(username, password)
      .then(() => {
        //setIsLoggedIn = true;
      })
      .catch();
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Form>
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="username"
          placeholder="Enter username"
          onChange={onChangeUsername}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={onChangePassword}
        />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={handleLogin}>
        Submit
      </Button>
    </Form>
  );
};

export default Login;
