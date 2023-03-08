"use strict";

import { loginUser } from "./common.js";
import { checkLogin } from "./common.js";
const signupForm = document.getElementById("signupForm");
const isUserLoggedIn = localStorage.getItem("user-token");

if (checkLogin()) {
  window.location.href = "../dashboard.html";
}

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const route = "/auth/signin";

  const userInfo = {
    email: loginForm.elements["email"].value,
    password: loginForm.elements["password"].value,
  };

  loginUser(userInfo, route).then((res) => {
    console.log(res);

    if (res.token != "") {
      localStorage.setItem("user-token", res.token);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "You are successfully signed up!",
        showConfirmButton: false,
        timer: 2500,
      });

      setTimeout(() => {
        window.location.href = "../dashboard.html";
      }, 2600);
    } else {
      console.error(res.error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${res.error}`,
        showConfirmButton: false,
        timer: 2500,
      });
    }
  });
});