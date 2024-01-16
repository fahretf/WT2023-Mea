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
  console.log(req.session);
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
  fs.readFile("data/korisnici.json", "utf-8", (err, data) => {
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

app.post("/upit", function (req, res) {
  console.log(req);
  if (!req.session.data) {
    return res.status(401).send({ greska: "Neautorizovan pristup" });
  }
  fs.readFile("data/nekretnine.json", "utf-8", (err, data) => {
    var nekretnine = JSON.parse(data);

    var trazenaNekretnina = nekretnine.find((nekretnina) => {
      console.log(nekretnina.id);
      console.log(req.body.nekretnina_id);
      console.log(nekretnina.id === req.body.nekretnina_id);
      return nekretnina.id === req.body.nekretnina_id;
    });

    if (!trazenaNekretnina)
      res.status(401).send({
        greska: `Nekretnina sa id-em ${req.body.nekretnina_id} ne postoji`,
      });

    trazenaNekretnina.upiti.push({
      korisnik_id: req.session.data.id,
      tekst_upita: req.body.tekst_upita,
    });
    const updated = JSON.stringify(nekretnine);

    fs.writeFile("data/nekretnine.json", updated, "utf-8", (err) => {
      if (err) console.error(err);
      else {
        res.status(200).send({ poruka: "Upit je uspješno dodan" });
      }
    });
  });
});

app.put("/korisnik", function (req, res) {
  if (!req.session.data) {
    return res.status(401).send({ greska: "Neautorizovan pristup" });
  }

  fs.readFile("data/korisnici.json", function (err, data) {
    let listaKorisnika = JSON.parse(data);
    let trazeniKorisnik = listaKorisnika.find(
      (korisnik) => korisnik.username === req.session.data.username
    );

    if (!trazeniKorisnik) {
      res.status(400).send({ poruka: "Korisnik ne postoji" });
    }

    if (req.body.ime) trazeniKorisnik.ime = req.body.ime;
    if (req.body.prezime) trazeniKorisnik.prezime = req.body.prezime;
    if (req.body.username) trazeniKorisnik.username = req.body.username;
    if (req.body.password) {
      // Hash the password before storing it
      bcrypt.hash(
        req.body.password,
        saltRounds,
        function (err, hashedPassword) {
          if (err) {
            console.error(err);
            return res
              .status(500)
              .send({ poruka: "Greška pri hashiranju lozinke" });
          }

          trazeniKorisnik.password = hashedPassword;

          fs.writeFile(
            "data/korisnici.json",
            JSON.stringify(listaKorisnika),
            "utf-8",
            (err) => {
              if (err) {
                console.error(err);
                return res
                  .status(500)
                  .send({ poruka: "Greška pri pisanju korisnika" });
              }
              res.status(200).send({ poruka: "Upit je uspješno dodan" });
            }
          );
        }
      );
    }

    fs.writeFile(
      "data/korisnici.json",
      JSON.stringify(listaKorisnika),
      "utf-8",
      (err) => {
        if (err) console.error(err);
        else {
          res.status(200).send({ poruka: "Upit je uspješno dodan" });
        }
      }
    );
  });
});

app.listen(PORT, () => console.log("Server running"));
