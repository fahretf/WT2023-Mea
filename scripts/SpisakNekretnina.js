let SpisakNekretnina = function () {
  let listaNekretnina = [];
  let listaKorisnika = [];

  let init = function (listaNekretnina, listaKorisnika) {
    this.listaNekretnina = listaNekretnina;
    this.listaKorisnika = listaKorisnika;
  };

  let filtrirajNekretnine = function (kriterij) {
    let filter = [];
    let keys = Object.keys(kriterij);

    for (let i = 0; i < listaNekretnina.length; i++) {
      let brojKriterija = 0;
      for (let j = 0; j < keys.length; j++) {
        if (keys[j] === "tip_nekretnine") {
          if (listaNekretnina[i].tip_nekretnine === kriterij.tip_nekretnine)
            brojKriterija++;
        } else if (keys[j] === "max_cijena") {
          if (listaNekretnina[i].cijena < kriterij.max_cijena) brojKriterija++;
        } else if (keys[j] === "min_cijena") {
          if (listaNekretnina[i].cijena > kriterij.min_cijena) brojKriterija++;
        } else if (keys[j] === "max_kvadratura") {
          if (listaNekretnina[i].kvadratura < kriterij.max_kvadratura)
            brojKriterija++;
        } else if (keys[j] === "min_kvadratura") {
          if (listaNekretnina[i].kvadratura > kriterij.min_kvadratura)
            brojKriterija++;
        }
      }
      if (brojKriterija === keys.length) {
        filter.push(listaNekretnina[i]);
      }
    }

    if (filter.length === 0) return listaNekretnina;
    return filter;
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
