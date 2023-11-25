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
    let ispravniKriteriji = [
      "tip_nekretnine",
      "max_cijena",
      "min_cijena",
      "max_kvadratura",
      "min_kvadratura",
    ];

    for (let i = 0; i < keys.length; i++) {
      if (!ispravniKriteriji.includes(keys[i])) return listNekretnine;
    }

    for (let i = 0; i < listNekretnine.length; i++) {
      let brojKriterija = 0;
      for (let j = 0; j < keys.length; j++) {
        if (keys[j] === ispravniKriteriji[0]) {
          if (listNekretnine[i].tip_nekretnine === kriterij.tip_nekretnine)
            brojKriterija++;
        }
        if (keys[j] === ispravniKriteriji[1]) {
          if (listNekretnine[i].cijena < kriterij.max_cijena) brojKriterija++;
        }
        if (keys[j] === ispravniKriteriji[2]) {
          if (listNekretnine[i].cijena > kriterij.min_cijena) brojKriterija++;
        }
        if (keys[j] === ispravniKriteriji[3]) {
          if (listNekretnine[i].kvadratura < kriterij.max_kvadratura)
            brojKriterija++;
        }
        if (keys[j] === ispravniKriteriji[4]) {
          if (listNekretnine[i].kvadratura > kriterij.min_kvadratura)
            brojKriterija++;
        }
      }
      if (brojKriterija === keys.length) {
        filtriraneNekretnine.push(listNekretnine[i]);
      }
    }

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
