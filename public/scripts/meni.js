//Callback funkcije
function postlogoutCallback(err, data) {
  if (data) {
    var logoutButton = document.getElementById("logoutButton");
    //ako data nije uredu necemo ukinuti ukinuti logout button
    if (data.poruka == "Uspješno ste se odjavili" && logoutButton) {
      localStorage.setItem("isLogOutVisable", "false");
    }
    window.parent.location.href = "prijava.html";
  } else {
    console.log("Logout error:", err);
  }
}

var isLogOutVisable = localStorage.getItem("isLogOutVisable");
var logoutButton = document.getElementById("logoutButton");
var loginButton = document.getElementById("prijava");
var profilButton = document.getElementById("profilID");

if (isLogOutVisable == "true" && logoutButton) {
  logoutButton.style.display = "inline";
  profilButton.style.display = "inline";
  loginButton.style.display = "none";
} else {
  logoutButton.style.display = "none";
  profilButton.style.display = "none";
  loginButton.style.display = "inline";
}

document
  .getElementById("logoutButton")
  .addEventListener("click", function (event) {
    console.log("kliknuta odjava");
    event.preventDefault();
    PoziviAjax.postLogout(postlogoutCallback);
  });
