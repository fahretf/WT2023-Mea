let listaNekretnina = [
  {
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
      {
        korisnik_id: 1,
        tekst_upita: "Nullam eu pede mollis.",
      },
      {
        korisnik_id: 2,
        tekst_upita: "Phasellus viverra nulla.",
      },
    ],
  },
  {
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
    upiti: [
      {
        korisnik_id: 2,
        tekst_upita: "Integer tincidunt.",
      },
    ],
  },
  {
    id: 3,
    tip_nekretnine: "Stan",
    naziv: "Novi stan u Sarajevu",
    kvadratura: 75,
    cijena: 280000,
    tip_grijanja: "plin",
    lokacija: "Stari Grad",
    godina_izgradnje: 2020,
    datum_objave: "15.11.2023.",
    opis: "Lorem ipsum dolor sit amet.",
    upiti: [
      {
        korisnik_id: 3,
        tekst_upita: "Aenean commodo ligula eget dolor.",
      },
    ],
  },
  {
    id: 4,
    tip_nekretnine: "Poslovni prostor",
    naziv: "Veliki poslovni prostor",
    kvadratura: 100,
    cijena: 150000,
    tip_grijanja: "centralno",
    lokacija: "Novi Grad",
    godina_izgradnje: 2010,
    datum_objave: "10.09.2023.",
    opis: "Vestibulum dapibus, mauris nec malesuada.",
    upiti: [
      {
        korisnik_id: 4,
        tekst_upita: "Maecenas tempus, tellus eget condimentum rhoncus.",
      },
    ],
  },
];

let SpisakNekretnina = function () {
  let listNekretnine = [];
  let listKorisnici = [];

  let init = function (listaNekretnina, listaKorisnika) {
    listNekretnine = listaNekretnina;
    listKorisnici = listaKorisnika;
  };

  let filtrirajNekretnine = function (kriterij) {
    let filtriraneNekretnine = [];
    let keys = Object.keys(kriterij);

    console.log("Nekretnine: ");
    console.log(listNekretnine);
    console.log(keys);

    for (let i = 0; i < listNekretnine.length; i++) {
      let brojKriterija = 0;
      for (let j = 0; j < keys.length; j++) {
        if (keys[j] === "tip_nekretnine") {
          console.log("nasli smo stan");
          if (listNekretnine[i].tip_nekretnine === kriterij.tip_nekretnine)
            brojKriterija++;
          console.log(brojKriterija);
        }
        if (keys[j] === "max_cijena") {
          console.log("Nasli smo max cijenu");
          if (listNekretnine[i].cijena < kriterij.max_cijena) brojKriterija++;
          console.log(brojKriterija);
        }
        if (keys[j] === "min_cijena") {
          if (listNekretnine[i].cijena > kriterij.min_cijena) brojKriterija++;
        }
        if (keys[j] === "max_kvadratura") {
          if (listNekretnine[i].kvadratura < kriterij.max_kvadratura)
            brojKriterija++;
        }
        if (keys[j] === "min_kvadratura") {
          if (listNekretnine[i].kvadratura > kriterij.min_kvadratura)
            brojKriterija++;
        }
      }
      if (brojKriterija === keys.length) {
        console.log("Nasli smoo i nekretninu????");
        filtriraneNekretnine.push(listNekretnine[i]);
        console.log(filtriraneNekretnine);
      }
    }
    console.log(filtriraneNekretnine);
    if (filtriraneNekretnine.length === 0) return listNekretnine;

    return filtriraneNekretnine;
  };

  let ucitajDetaljeNekretnine = function (id) {
    for (let i = 0; i < listNekretnine.length; i++) {
      if (listNekretnine[i].id === id) return listNekretnine[i];
    }
    return null;
  };

  return {
    init: init,
    filtrirajNekretnine: filtrirajNekretnine,
    ucitajDetaljeNekretnine: ucitajDetaljeNekretnine,
  };
};

const spisakNekretninaInstance = SpisakNekretnina();
spisakNekretninaInstance.init(listaNekretnina, []);

const kriterij = {
  tip_nekretnine: "Stan",
  max_cijena: 240000,
};

const filteredNekretnine =
  spisakNekretninaInstance.filtrirajNekretnine(kriterij);
console.log("I EVO???????????");
console.log(filteredNekretnine);
