let SpisakNekretnina = function () {
  let listaNekretnina = [];
  let listaKorisnika = [];

  let init = function (_listaNekretnina, _listaKorisnika) {
    listaNekretnina = _listaNekretnina;
    listaKorisnika = _listaKorisnika;
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
      if (!ispravniKriteriji.includes(keys[i])) return listaNekretnina;
    }

    for (let i = 0; i < listaNekretnina.length; i++) {
      let brojKriterija = 0;
      for (let j = 0; j < keys.length; j++) {
        if (keys[j] === ispravniKriteriji[0]) {
          if (listaNekretnina[i].tip_nekretnine === kriterij.tip_nekretnine)
            brojKriterija++;
        }
        if (keys[j] === ispravniKriteriji[1]) {
          if (listaNekretnina[i].cijena < kriterij.max_cijena) brojKriterija++;
        }
        if (keys[j] === ispravniKriteriji[2]) {
          if (listaNekretnina[i].cijena > kriterij.min_cijena) brojKriterija++;
        }
        if (keys[j] === ispravniKriteriji[3]) {
          if (listaNekretnina[i].kvadratura < kriterij.max_kvadratura)
            brojKriterija++;
        }
        if (keys[j] === ispravniKriteriji[4]) {
          if (listaNekretnina[i].kvadratura > kriterij.min_kvadratura)
            brojKriterija++;
        }
      }
      if (brojKriterija === keys.length) {
        filtriraneNekretnine.push(listaNekretnina[i]);
      }
    }

    return filtriraneNekretnine;
  };

  let ucitajDetaljeNekretnine = function (id) {
    for (let i = 0; i < listaNekretnina.length; i++) {
      if (listaNekretnina[i].id === id) return listaNekretnina[i];
    }
    return null;
  };

  return {
    init: init,
    filtrirajNekretnine: filtrirajNekretnine,
    ucitajDetaljeNekretnine: ucitajDetaljeNekretnine,
  };
};
