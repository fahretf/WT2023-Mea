const listaNekretnina = [
  {
    id: 1,
    tip_nekretnine: "Stan",
    kvadratura: 190,
    naziv: "Useljiv stan Sarajevo",
  },
  {
    id: 2,
    tip_nekretnine: "Kuca",
    kvadratura: 98,
    naziv: " Sarajevo",
  },
  {
    id: 3,
    tip_nekretnine: "Stan",
    naziv: " Sarajevo",
    kvadratura: 56,
  },
];

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

console.log(filtrirajNekretnine({ max_cijena: 100 }));
