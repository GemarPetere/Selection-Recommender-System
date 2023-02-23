"use strict";

import { registerUser } from "./common.js";

const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const route = "/auth/signup";

  const userInfo = {
    name:
      signupForm.elements["firstname"].value +
      " " +
      signupForm.elements["lastname"].value,
    email: signupForm.elements["email"].value,
    password: signupForm.elements["password"].value,
    address: signupForm.elements["address"].value,
  };

  registerUser(userInfo, route).then((res) => {
    if (res.message === "successfully signup") {
      localStorage.setItem("user-token", res.body.salt);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "You are successfully signed up!",
        showConfirmButton: false,
        timer: 2500,
      });

      setTimeout(() => {
        window.location.href = "../pages/login.html";
      }, 3000);
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
