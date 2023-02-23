// Check if user is logged in
if (
  !localStorage.getItem("user-token") ||
  localStorage.getItem("user-token") == ""
) {
  window.location.href = "login.html";
}
