const APP_PREFIX = "WetMyPlants-";

export default function authHeader() {
  const user = JSON.parse(localStorage.getItem(APP_PREFIX + "user"));

  if (user && user.accessToken) {
    return { "x-access-token": user.accessToken };
  } else {
    return {};
  }
}
