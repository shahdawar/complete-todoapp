const loginBtn = document.getElementById("loginbutton");
if (localStorage.getItem("isLoggedIn") === "true") {
  window.location.href = "dashboard.html";
}
loginBtn.addEventListener("click", function () {
  const email = document.querySelector("input[type='email']").value.trim();
  const password = document
    .querySelector("input[type='password']")
    .value.trim();
  const savedEmail = localStorage.getItem("userEmail");
  const savedPsd = localStorage.getItem("userPassword");

  if (email === savedEmail && password === savedPsd) {
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "dashboard.html";
  } else {
    alert("Please enter correct email and password");
  }
});
