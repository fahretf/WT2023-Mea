var loginButton;
var logoutButton;

document.addEventListener("DOMContentLoaded", function () {
  // Get the iframe element
  var iframeMeni = document.getElementById("iframeMeniID");

  iframeMeni.addEventListener("load", function () {
    // Access the contentDocument of the iframe
    var iframeDocument =
      iframeMeni.contentDocument || iframeMeni.contentWindow.document;
    console.log(iframeDocument);
    // Access the element inside the iframe
    loginButton = iframeDocument.getElementById("prijava");
    logoutButton = iframeDocument.getElementById("logoutButton");
    // Now you can manipulate the element as needed
    console.log("evo onaj event :)");
    console.log(loginButton);
  });
});

var podaci = {
  username,
  password,
};

function postLoginCallback(err, data) {
  if (data) {
    if (data.poruka.toString() == "Neuspješna prijava") {
      document.getElementById("poruka").innerHTML =
        "Pogrešan username ili password!";
    } else {
      console.log(loginButton);
      localStorage.setItem("isLogOutVisable", "true");
    }
    window.location.href = "nekretnine.html";
  } else {
    console.log("server vraca error: ", err);
  }
}

// Pozivi middleware-a
document.getElementById("forma").addEventListener("submit", function (event) {
  event.preventDefault();

  podaci.username = document.getElementById("username").value;
  podaci.password = document.getElementById("password").value;
  console.log(podaci);
  PoziviAjax.postLogin(podaci.username, podaci.password, postLoginCallback);
});
