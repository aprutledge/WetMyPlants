import React, { useState, useEffect } from "react";
//import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const updateLoginStatus = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return isLoggedIn ? (
    <div>Hello Logged In User</div>
  ) : (
    <Login updateLoginStatus={updateLoginStatus} />
  );
};

export default App;
