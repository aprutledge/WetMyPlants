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
  localStorage.removeItem(APP_PREFIX + "user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem(APP_PREFIX + "user"));
};

const refresh = () => {
  //console.log("Hello from refresh");
  let data = JSON.parse(localStorage.getItem(APP_PREFIX + "user"));
  let refreshToken = "";
  if (data !== null) {
    refreshToken = data.refreshToken;
  }
  return axios
    .post(API_URL + "token", {
      refreshToken,
    })
    .then((response) => {
      if (refreshToken === "") {
        throw new Error("No current user");
      } else {
        data.accessToken = response.data.accessToken;
      }
      localStorage.setItem(APP_PREFIX + "user", JSON.stringify(data));
      return response.data;
    })
    .catch((err) => {
      //console.log(err);
      return err.message;
    });
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
  refresh,
};
