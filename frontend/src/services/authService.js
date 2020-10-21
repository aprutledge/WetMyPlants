import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";
const APP_PREFIX = "WetMyPlants-";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  console.log("hello from auth service");
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem(
          APP_PREFIX + "user",
          JSON.stringify(response.data)
        );
      }

      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem(APP_PREFIX + "user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
