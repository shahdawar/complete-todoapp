if (localStorage.getItem("isLoggedIn") === "true") {
  window.location.href = "dashboard.html";
}
const registerBtn = document.getElementById("rgbtn");

registerBtn.addEventListener("click", function () {
  const email = document.querySelector("input[type='email']").value;
  const password = document.querySelector("input[type='password']").value;

  if (email && password) {
    // Save user data
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);

    alert("Account created successfully!");

    window.location.href = "index.html";
  } else {
    alert("Please fill all fields");
  }
});
