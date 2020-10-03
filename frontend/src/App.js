import React, { useState, useEffect } from "react";
//import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { Card, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedTab, setSelectedTab] = useState("#login");

  const updateLoginStatus = (status) => {
    setIsLoggedIn(status);
    console.log("switching logged in to: " + status);
  };

  return (
    <>
      <div className="app-title">Wet My Plants</div>
      <div>
        {isLoggedIn ? (
          <div>Hello Logged In User</div>
        ) : (
          <Card className="login-card">
            <Card.Header className="login-header">
              <Nav
                variant="pills"
                defaultActiveKey="#login"
                onSelect={(selectedKey) => setSelectedTab(selectedKey)}
              >
                <Nav.Item>
                  <Nav.Link href="#login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="#register">Register</Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body>
              {selectedTab === "#login" ? (
                <Login updateLoginStatus={updateLoginStatus} />
              ) : (
                <Register updateLoginStatus={updateLoginStatus} />
              )}
            </Card.Body>
          </Card>
        )}
      </div>
    </>
  );
};

export default App;
