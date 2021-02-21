import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/plants";
const authheader = authHeader();

const getUsersPlants = () => {
  return axios
    .get(API_URL, {
      headers: authheader,
    })
    .then((res) => {
      console.log(res.data.plants);
      return res.data.plants;
    })
    .catch((err) => {
      console.log(err);
    });
};

export default {
  getUsersPlants,
};
