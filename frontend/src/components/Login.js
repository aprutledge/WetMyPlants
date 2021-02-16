import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

import AuthService from "../services/authService";
import { useAuth } from "../contexts/AuthContext";

import "./Login.css";

const Login = (props) => {
  const { setIsAuthenticated } = useAuth();

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    AuthService.login(username, password)
      .then((response) => {
        console.log(response);
        setIsAuthenticated(true);
      })
      .catch((err) => {
        //console.log(err);
      });
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="Login">
      <Form onSubmit={handleLogin}>
        <Form.Group size="lg" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter username"
            onChange={onChangeUsername}
          />
        </Form.Group>

        <Form.Group size="lg" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={onChangePassword}
          />
        </Form.Group>

        <Button block size="lg" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Login;
