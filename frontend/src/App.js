import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Routes from "./Routes";
import { AuthContext } from "./contexts/AuthContext";
import AuthService from "./services/authService";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const history = useHistory();

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    AuthService.refresh()
      .then((data) => {
        //console.log(data);
        if (data !== "No current user") {
          setIsAuthenticated(true);
        }
      })
      .catch((err) => {
        if (err !== "No current user") {
          alert(err);
        }
      });

    setIsAuthenticating(false);
  };

  const handleLogout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
    history.push("/login");
  };

  return (
    !isAuthenticating && (
      <div className="App container py-3">
        <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
          <Navbar.Brand className="font-weight-bold text-muted">
            WetMyPlants
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav activeKey={window.location.pathname}>
              {isAuthenticated ? (
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              ) : (
                <>
                  <LinkContainer to="/register">
                    <Nav.Link href="/register">Register</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <Nav.Link href="/login">Login</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
          <Routes />
        </AuthContext.Provider>
      </div>
    )
  );
};

export default App;
