import React, { useState, useEffect } from "react";

import PlantCard from "./PlantCard";

import UserService from "../services/userService";

const PlantList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [plants, setPlants] = useState([]);

  //Empty dependency array to run once aka componentDidMount()
  useEffect(() => {
    console.log("Mounting PlantList.");
    UserService.getUsersPlants().then((plantsList) => {
      for (let i = 0; i < plantsList.length; i++) {
        setPlants((plants) => [
          ...plants,

          <PlantCard
            key={plantsList[i].plant_id}
            plantName={plantsList[i].name}
            plantType={plantsList[i].type}
            plantDesc={plantsList[i].description}
          />,
        ]);
      }
      setIsLoading(false);
      console.log(plants);
    });
  }, []);

  if (isLoading) {
    return <div> Loading </div>;
  } else {
    return (
      <>
        {plants.map((plant) => {
          return plant;
        })}
      </>
    );
  }
};
export default PlantList;
