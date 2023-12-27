const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const session = require("express-session");
const bcrypt = require("bcrypt");
const { Console } = require("console");

const PORT = 3000;
const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());

//rutice :))

app.get("/meni.html", function (req, res) {
  res.sendFile(__dirname + "/public/html/meni.html");
});

app.get("/nekretnine.html", function (req, res) {
  res.sendFile(__dirname + "/public/html/nekretnine.html");
});

app.get("/detalji.html", function (req, res) {
  res.sendFile(__dirname + "/public/html/detalji.html");
});

app.get("/profil.html", function (req, res) {
  res.sendFile(__dirname + "/public/html/profil.html");
});

app.get("/prijava.html", function (req, res) {
  res.sendFile(__dirname + "/public/html/prijava.html");
});

app.post("/login", function (req, res) {
  fs.readFile("public/data/korisnici.js", "utf-8", (err, data) => {
    const listaKorisnika = JSON.parse(data);
    var trazeniKorisnik = listaKorisnika.find(
      (korisnik) => korisnik.username == req.body.username
    );

    bcrypt.compare(
      req.body.password,
      trazeniKorisnik.password,
      function (err, hash) {
        if (err) {
          console.error(err);
          res_json({ greska: "Neuspješna prijava" });
        } else if (hash) {
          username = trazeniKorisnik.username;
          req.session.data = JSON.stringify({ username });
          res_json({ poruka: "Uspješna prijava" });
        }
      }
    );
  });
});

app.listen(PORT, () => console.log("Server running"));
