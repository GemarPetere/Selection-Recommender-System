"use strict";

// Initialize header and footer components
window.addEventListener("load", function () {
  $(function () {
    $("#header").load("../components/header.html");
  });
  $(function () {
    $("#footer").load("components/footer.html");
  });
});
// Initialize Jquery
let jqueryScript = document.createElement("script");
jqueryScript.src = "https://code.jquery.com/jquery-3.6.3.min.js";
document.head.appendChild(jqueryScript);
// Initialize sweet alert
let sweetAlertScript = document.createElement("script");
sweetAlertScript.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
document.head.appendChild(sweetAlertScript);
