var imeInput;
var prezimeInput;
var usernameInput;
var passwordInput;

document.addEventListener("DOMContentLoaded", function () {
  imeInput = document.getElementById("ime");
  prezimeInput = document.getElementById("prezime");
  usernameInput = document.getElementById("username");
  passwordInput = document.getElementById("password");

  PoziviAjax.getKorisnik(popuniFormu);
});

function popuniFormu(err, data) {
  if (err) return;
  console.log(data);
  imeInput.value = JSON.parse(data).ime;
  prezimeInput.value = JSON.parse(data).prezime;
}
