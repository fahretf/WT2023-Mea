const db = require("./public/scripts/baza");
db.sequelize.sync({ force: true }).then(function () {
  inicializacija().then(function () {
    console.log("Gotovo kreiranje tabela i ubacivanje pocetnih podataka!");
    process.exit();
  });
});
function inicializacija() {
  return new Promise(function (resolve, reject) {
    //korisnici
    db.Korisnik.create({
      id: 1,
      ime: "Niko",
      prezime: "Nikic",
      username: "username11",
      password: "meahrbenic",
    });
    db.Korisnik.create({
      id: 2,
      ime: "Neko2",
      prezime: "Nekic2",
      username: "username2",
      password: "$2a$12$TIB20mM/NSJCWMI3WDnbfejpkiQ.IFQkgZzhMJZVJDtUfokhaawBW",
    });
    db.Korisnik.create({
      id: 3,
      ime: "Neko3",
      prezime: "Nekicc",
      username: "username5",
      password: "nista",
    });

    db.Nekretnina.create({
      id: 1,
      tip_nekretnine: "Stan",
      naziv: "Useljiv stan Sarajevo",
      kvadratura: 58,
      cijena: 232000,
      tip_grijanja: "plin",
      lokacija: "Novo Sarajevo",
      godina_izgradnje: 2019,
      datum_objave: "01.10.2023.",
      opis: "Sociis natoque penatibus.",
      upiti: [
        { korisnik_id: 1, tekst_upita: "Nullam eu pede mollis pretium." },
        { korisnik_id: 2, tekst_upita: "Phasellus viverra nulla." },
        { korisnik_id: 1, tekst_upita: "blabla" },
      ],
    });

    db.Nekretnina.create({
      id: 2,
      tip_nekretnine: "Poslovni prostor",
      naziv: "Mali poslovni prostor",
      kvadratura: 20,
      cijena: 70000,
      tip_grijanja: "struja",
      lokacija: "Centar",
      godina_izgradnje: 2005,
      datum_objave: "20.08.2023.",
      opis: "Magnis dis parturient montes.",
      upiti: [{ korisnik_id: 2, tekst_upita: "Integer tincidunt." }],
    });
  });
}
