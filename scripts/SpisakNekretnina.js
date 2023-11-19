let SpisakNekretnina = function () {
  //privatni atributi modula
  let listaNekretnina = [];
  let listaKorisnika = [];

  //implementacija metoda
  let init = function (listaNekretnina, listaKorisnika) {
    this.listaNekretnina = listaNekretnina;
    this.listaKorisnika = listaKorisnika;
  };

  let filtrirajNekretnine = function (kriterij) {
    // dodajte kod
  };

  let ucitajDetaljeNekretnine = function (id) {
    // dodajte kod
  };

  return {
    init: init,
    filtrirajNekretnine: filtrirajNekretnine,
    ucitajDetaljeNekretnine: ucitajDetaljeNekretnine,
  };
};
