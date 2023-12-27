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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "your-secret-key", // You should use a secure, random key for production
    resave: false,
    saveUninitialized: true,
  })
);

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
  fs.readFile("data/korisnici.json", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      res.send({ greska: "Greška pri čitanju korisnika" });
      return;
    }

    try {
      const listaKorisnika = JSON.parse(data);
      var trazeniKorisnik = listaKorisnika.find(
        (korisnik) => korisnik.username === req.body.username
      );

      if (!trazeniKorisnik) {
        res.send({ greska: "Korisnik nije pronađen" });
        return;
      }

      bcrypt.hash(trazeniKorisnik.password, 10, function (err, hash) {
        console.log(hash);
      });

      bcrypt.compare(
        req.body.password,
        trazeniKorisnik.password,
        function (err, hash) {
          console.log(req.body.password);
          console.log(trazeniKorisnik.password);
          if (err) {
            console.error(err);
            res.send({ greska: "Neuspješna prijava" });
          } else if (hash) {
            username = trazeniKorisnik.username;
            req.session.data = JSON.stringify({ username });
            res.send({ poruka: "Uspješna prijava" });
          } else {
            res.send({ greska: "Pogrešna lozinka" });
          }
        }
      );
    } catch (parseError) {
      console.error(parseError);
      res.send({ greska: "Greška pri parsiranju JSON-a" });
    }
  });
});

app.listen(PORT, () => console.log("Server running"));
