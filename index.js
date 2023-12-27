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
        function (err, result) {
          if (err) {
            console.error(err);
            res.send({ greska: "Neuspješna prijava" });
          } else if (result) {
            req.session.data = {
              username: trazeniKorisnik.username,
              ime: trazeniKorisnik.ime,
              prezime: trazeniKorisnik.prezime,
            };
            res.send({ poruka: "Uspješna prijava" });
          } else {
            // Incorrect password
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

app.post("/logout", function (req, res, next) {
  if (!req.session.username) {
    res.status(401).send("{“greska”:”Neautorizovan pristup”}");
  }
  req.session.data = JSON.stringify(req.body);
  req.session.destroy;
  res.status(200).send("{“poruka”:”Uspješno ste se odjavili”}");
});

app.get("/korisnik", function (req, res) {
  if (req.session && req.session.data && req.session.data.username) {
    res.status(200).send(req.session.data);
  } else {
    res.status(401).send({ greska: "Neautorizovan pristup" });
  }
});

app.get("/nekretnine", function (req, res) {
  fs.readFile("data/nekretnine.json", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send({ greska: "Greška pri čitanju nekretnina" });
      return;
    }
    try {
      // Parse the JSON data
      const nekretnine = JSON.parse(data);
      // Send the nekretnine as a JSON response
      res.status(200).json(nekretnine);
    } catch (parseError) {
      console.error(parseError);
      res.status(500).send({ greska: "Greška pri parsiranju JSON-a" });
    }
  });
});

app.listen(PORT, () => console.log("Server running"));
