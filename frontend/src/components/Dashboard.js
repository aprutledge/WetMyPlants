import React from "react";

import PlantList from "./PlantList";
import AuthService from "../services/authService";

import "./Dashboard.css";

const Dashboard = (props) => {
  return (
    <div className="Home">
      <div className="lander">
        <h1>WetMyPlants</h1>
        <h2 className="welcome-message">
          {"Welcome! " + AuthService.getCurrentUser().username}
        </h2>
        <p className="text-muted">A simple plant watering app</p>
      </div>
      <PlantList />
    </div>
  );
};

export default Dashboard;
