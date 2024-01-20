const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const session = require("express-session");
const bcrypt = require("bcrypt");
const { Console } = require("console");
const db = require("./public/scripts/baza.js");

const PORT = 3000;
const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "your-secret-key", 
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
  db.Korisnik.findOne({ where: { username: req.body.username } }).then(
    function (korisnik) {
      if (!korisnik) {
        res.send({ greska: "Korisnik nije pronađen" });
        return;
      }
      bcrypt.hash(korisnik.password, 10, function (err, hash) {});
      bcrypt.compare(
        req.body.password,
        korisnik.password,
        function (err, result) {
          if (err) {
            console.error(err);
            res.send({ greska: "Neuspješna prijava" });
          } else if (result) {
            req.session.data = {
              username: korisnik.username,
              id: korisnik.id,
              ime: korisnik.ime,
              prezime: korisnik.prezime,
            };
            res.send({ poruka: "Uspješna prijava" });
          } else {
            // Incorrect password
            res.send({ greska: "Pogrešna lozinka" });
          }
        }
      );
    }
  );
});

app.post("/logout", function (req, res) {
  if (req.session) {
    req.session.data = JSON.stringify(req.body);
    req.session.destroy;
    res.status(200).send({ poruka: "Uspješno ste se odjavili" });
  }
});

app.get("/korisnik", function (req, res) {
  if (req.session && req.session.data && req.session.data.username) {
    res.status(200).send(req.session.data);
  } else {
    res.status(401).send({ greska: "Neautorizovan pristup" });
  }
});

app.get("/nekretnine", function (req, res) {
  db.Nekretnina.findAll().then(function (nekretnine) {
    res.status(200).json(nekretnine);
  });
});

app.get("/korisnici", function (req, res) {
  db.Korisnik.findAll().then(function (korisnici) {
    if (!korisnici)
      res.status(500).send({ greska: "Greška pri čitanju korisnika" });
    res.status(200).json(korisnici);
  });
});

app.post("/upit", function (req, res) {
  try {
    let upit = req.body;
    upit.KorisnikId = req.session.data.id;

    db.Upit.create(upit).then((upit2) => {
      res.status(200).send({ poruka: "Upit je uspješno dodan" });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ greska: "Greška prilikom upisa u bazu podataka" });
  }
});

app.put("/korisnik", function (req, res) {
  if (!req.session.data) {
    return res.status(401).send({ greska: "Neautorizovan pristup" });
  }
  var korisnik = db.Korisnik.findByPk(req.data.korisnik_id);
  if (!korisnik) res.status(400).send({ poruka: "Korisnik ne postoji" });
  if (req.body.ime) korisnik.ime = req.body.ime;
  if (req.body.prezime) korisnik.prezime = req.body.prezime;
  if (req.body.username) korisnik.username = req.body.username;
  if (req.body.password) {
    bcrypt.hash(req.body.password, saltRounds, function (err, hashedPassword) {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .send({ poruka: "Greška pri hashiranju lozinke" });
      }
      korisnik.password = hashedPassword;
    });
  }
});

app.get("/nekretnina/:id", function (req, res) {
  db.Nekretnina.findByPk(req.params.id, {
    include: [
      {
        model: db.Upit,
        include: [db.Korisnik],
      },
    ],
  }).then((nekretnina) => {
    if (!nekretnina)
      res.status(400).send({ greska: `Nekretnina sa id-em ${id} ne postoji.` });
    else res.status(200).send(JSON.stringify(nekretnina));
  });
});

app.listen(PORT, () => console.log("Server running"));
