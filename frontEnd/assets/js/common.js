import { apiBaseUrl } from "./_hosts.js";

export function checkLogin() {
  let token = localStorage.getItem("user-token");

  if (token) {
    if (token != "" && typeof token == "string") {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export async function registerUser(userInfo, route) {
  const userData = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  };

  try {
    const response = await fetch(apiBaseUrl + route, userData);
    const data = await response.json();
    return data;
  } catch (error) {
    return `Cannot register new user, error is: ${error}`;
  }
}

export async function loginUser(userInfo, route) {
  const userData = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  };

  try {
    const response = await fetch(apiBaseUrl + route, userData);
    const data = await response.json();
    return data;
  } catch (error) {
    return `Cannot register new user, error is: ${error}`;
  }
}

export async function sendPostRequest(userInfo, route) {
  const userData = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  };

  try {
    const response = await fetch(apiBaseUrl + route, userData);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}
