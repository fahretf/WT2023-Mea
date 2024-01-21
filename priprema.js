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
      password: "$2a$12$hpuOGWLIenQppIX.JE5ZRe5NPyatEfllRjF1VMn4mVZ0Pl.pzxnTa",
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
      password: "$2a$12$YqLHqohSKl/Y337b/sy2meSTdEOH2Dsg66ejiVpwKmlenziOkLYL2",
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
    });

    db.Nekretnina.create({
      id: 4,
      tip_nekretnine: "Stan",
      naziv: "Renovirani stan Vogošća",
      kvadratura: 40,
      cijena: 150000,
      tip_grijanja: "električno",
      lokacija: "Vogošća",
      godina_izgradnje: 2020,
      datum_objave: "20.05.2023.",
      opis: "Moderan studio idealan za pojedince ili parove.",
    });

    db.Nekretnina.create({
      id: 5,
      tip_nekretnine: "Stan",
      naziv: "Moderni dvosoban stan Sarajevo",
      kvadratura: 65,
      cijena: 280000,
      tip_grijanja: "centralno",
      lokacija: "Marijin Dvor",
      godina_izgradnje: 2022,
      datum_objave: "10.02.2024.",
      opis: "Suvremeni stan u samom srcu Sarajeva s prekrasnim pogledom na grad.",
    });

    db.Nekretnina.create({
      id: 6,
      tip_nekretnine: "Stan",
      naziv: "Renovirani trosoban stan Ilidža",
      kvadratura: 85,
      cijena: 320000,
      tip_grijanja: "plinsko",
      lokacija: "Ilidža",
      godina_izgradnje: 2016,
      datum_objave: "25.06.2023.",
      opis: "Prostran stan u mirnom dijelu Ilidže, nedaleko od Vrelo Bosne.",
    });

    db.Nekretnina.create({
      id: 7,
      tip_nekretnine: "Stan",
      naziv: "Luksuzni penthouse Centar",
      kvadratura: 150,
      cijena: 650000,
      tip_grijanja: "podno",
      lokacija: "Centar",
      godina_izgradnje: 2018,
      datum_objave: "05.09.2023.",
      opis: "Ekskluzivni penthouse s vrhunskim sadržajima, smješten u samom centru Sarajeva.",
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
    });

    db.Nekretnina.create({
      id: 9,
      tip_nekretnine: "Poslovni prostor",
      naziv: "Trgovinski prostor Baščaršija",
      kvadratura: 60,
      cijena: 250000,
      tip_grijanja: "plin",
      lokacija: "Baščaršija",
      godina_izgradnje: 2015,
      datum_objave: "18.07.2023.",
      opis: "Prostran trgovinski prostor na jednoj od najpoznatijih lokacija u Sarajevu, pogodan za različite vrste poslovanja.",
    });

    db.Nekretnina.create({
      id: 8,
      tip_nekretnine: "Poslovni prostor",
      naziv: "Elegantan ured Marijin Dvor",
      kvadratura: 40,
      cijena: 120000,
      tip_grijanja: "centralno",
      lokacija: "Marijin Dvor",
      godina_izgradnje: 2010,
      datum_objave: "12.03.2024.",
      opis: "Moderan poslovni prostor s visokokvalitetnim uređenjem, idealan za profesionalne usluge.",
    });

    db.Nekretnina.create({
      id: 10,
      tip_nekretnine: "Poslovni prostor",
      naziv: "Kancelarije Ilidža",
      kvadratura: 80,
      cijena: 180000,
      tip_grijanja: "toplinska pumpa",
      lokacija: "Ilidža",
      godina_izgradnje: 2012,
      datum_objave: "05.11.2023.",
      opis: "Funkcionalan poslovni prostor s modernim kancelarijama i konferencijskom salom.",
    });

    db.Nekretnina.create({
      id: 3,
      tip_nekretnine: "Kuca",
      naziv: "Kuca na Bistriku",
      kvadratura: 120,
      cijena: 120000,
      tip_grijanja: "struja",
      lokacija: "Stari Grad",
      godina_izgradnje: 2009,
      datum_objave: "20.08.2023.",
      opis: "Magnis dis parturient montes.",
    });

    db.Nekretnina.create({
      id: 12,
      tip_nekretnine: "Kuća",
      naziv: "Moderna vila Centar",
      kvadratura: 300,
      cijena: 550000,
      tip_grijanja: "podno",
      lokacija: "Centar",
      godina_izgradnje: 2018,
      datum_objave: "22.09.2023.",
      opis: "Luksuzna vila s modernim sadržajima u samom srcu Sarajeva.",
    });

    db.Nekretnina.create({
      id: 11,
      tip_nekretnine: "Kuća",
      naziv: "Porodična kuća Ilidža",
      kvadratura: 180,
      cijena: 250000,
      tip_grijanja: "plinsko",
      lokacija: "Ilidža",
      godina_izgradnje: 2015,
      datum_objave: "10.04.2024.",
      opis: "Prostrana porodična kuća s vrtom i garažom, idealna za miran život u prirodi.",
    });

    db.Nekretnina.create({
      id: 13,
      tip_nekretnine: "Kuća",
      naziv: "Tradicionalna seoska kuća Vogošća",
      kvadratura: 150,
      cijena: 120000,
      tip_grijanja: "drva",
      lokacija: "Vogošća",
      godina_izgradnje: 2005,
      datum_objave: "15.11.2023.",
      opis: "Šarmantna seoska kuća s dvorištem, pogodna za ljubitelje prirode.",
    });

    db.Upit.create({
      id: 1,
      tekst_upita: "Magnus opum mea hrbenci",
      NekretninaId: 1,
      KorisnikId: 2,
    });

    db.Upit.create({
      id: 2,
      tekst_upita: "Integer sunce sija ova kuca nije lijepa.",
      NekretninaId: 1,
      KorisnikId: 1,
    });

    db.Upit.create({
      id: 3,
      tekst_upita: "Integer tincidunt.",
      NekretninaId: 1,
      KorisnikId: 2,
    });

    db.Upit.create({
      id: 8,
      tekst_upita: "Kako izgleda okolina kuće?",
      NekretninaId: 3,
      KorisnikId: 3,
    });

    db.Upit.create({
      id: 9,
      tekst_upita: "Da li postoji teretana u blizini?",
      NekretninaId: 3,
      KorisnikId: 1,
    });

    db.Upit.create({
      id: 6,
      tekst_upita: "Da li je moguće dogovoriti cijenu?",
      NekretninaId: 2,
      KorisnikId: 2,
    });

    db.Upit.create({
      id: 7,
      tekst_upita: "Ima li parking u blizini?",
      NekretninaId: 2,
      KorisnikId: 1,
    });

    db.Upit.create({
      id: 4,
      tekst_upita: "Pogled na grad je li predivan?",
      NekretninaId: 1,
      KorisnikId: 1,
    });

    db.Upit.create({
      id: 5,
      tekst_upita: "Možete li mi poslati više slika stana?",
      NekretninaId: 1,
      KorisnikId: 3,
    });

    db.Upit.create({
      id: 10,
      tekst_upita: "Ima li ova kuća vrt?",
      NekretninaId: 4,
      KorisnikId: 2,
    });

    db.Upit.create({
      id: 11,
      tekst_upita: "Koliko prostora ima u dnevnoj sobi?",
      NekretninaId: 4,
      KorisnikId: 1,
    });

    db.Upit.create({
      id: 12,
      tekst_upita: "Da li je ovaj poslovni prostor dostupan odmah?",
      NekretninaId: 5,
      KorisnikId: 3,
    });

    db.Upit.create({
      id: 13,
      tekst_upita: "Koliko je prometna ova lokacija?",
      NekretninaId: 5,
      KorisnikId: 1,
    });

    db.Upit.create({
      id: 14,
      tekst_upita: "Da li je moguće dogovoriti kraći najamni rok?",
      NekretninaId: 6,
      KorisnikId: 2,
    });

    db.Upit.create({
      id: 15,
      tekst_upita: "Postoji li parking prostor za posjetitelje?",
      NekretninaId: 6,
      KorisnikId: 3,
    });

    db.Upit.create({
      id: 16,
      tekst_upita: "Ima li ova kuća garažu?",
      NekretninaId: 7,
      KorisnikId: 1,
    });

    db.Upit.create({
      id: 17,
      tekst_upita: "Kako izgleda okolina?",
      NekretninaId: 7,
      KorisnikId: 2,
    });

    db.Upit.create({
      id: 18,
      tekst_upita: "Koliko spavaćih soba ima ova kuća?",
      NekretninaId: 8,
      KorisnikId: 3,
    });

    db.Upit.create({
      id: 19,
      tekst_upita: "Da li je ovo područje sigurno za djecu?",
      NekretninaId: 8,
      KorisnikId: 1,
    });

    db.Upit.create({
      id: 20,
      tekst_upita: "Kako izgledaju kancelarije iznutra?",
      NekretninaId: 9,
      KorisnikId: 2,
    });

    db.Upit.create({
      id: 21,
      tekst_upita: "Postoji li kafić u blizini?",
      NekretninaId: 9,
      KorisnikId: 3,
    });

    db.Upit.create({
      id: 22,
      tekst_upita: "Da li je moguće organizirati sastanke u prostoru?",
      NekretninaId: 10,
      KorisnikId: 1,
    });

    db.Upit.create({
      id: 23,
      tekst_upita: "Koliko je blizu javni prijevoz?",
      NekretninaId: 10,
      KorisnikId: 2,
    });

    db.Upit.create({
      id: 24,
      tekst_upita: "Ima li bazen u dvorištu?",
      NekretninaId: 11,
      KorisnikId: 3,
    });

    db.Upit.create({
      id: 25,
      tekst_upita: "Koliko je udaljena od centra grada?",
      NekretninaId: 11,
      KorisnikId: 1,
    });
  });
}
