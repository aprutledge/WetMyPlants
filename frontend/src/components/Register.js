import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import AuthService from "../services/authService";
import { useAuth } from "../contexts/AuthContext";

import "./Register.css";

const Register = (props) => {
  const { setIsAuthenticated } = useAuth();
  const history = useHistory();

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeConfPassword = (e) => {
    const confPassword = e.target.value;
    setPassword(confPassword);
  };

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(username + ": " + password);
    AuthService.register(username, email, password)
      .then((response) => {
        console.log(response);
        setIsAuthenticated(true);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="Register">
      <Form onSubmit={handleRegister}>
        <Form.Group size="lg" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter username"
            onChange={onChangeUsername}
          />
        </Form.Group>

        <Form.Group size="lg" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={onChangeEmail}
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

        <Form.Group size="lg" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="confirmPassword"
            placeholder="Confirm Password"
            onChange={onChangeConfPassword}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Register;
