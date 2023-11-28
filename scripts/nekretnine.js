function spojiNekretnine(divReferenca, instancaModula, tip_nekretnine) {
  if (divReferenca === null) return;
  const filteredNekretnine = instancaModula.filtrirajNekretnine({
    tip_nekretnine: tip_nekretnine,
  });

  const Naslov = document.createElement("h2");
  if (tip_nekretnine === "Stan") Naslov.textContent = "Stan";
  else if (tip_nekretnine === "Kuća") Naslov.textContent = "Kuća";
  else if (tip_nekretnine === "Poslovni prostor")
    Naslov.textContent = "Poslovni prostor";

  divReferenca.appendChild(Naslov);
  const ul = document.createElement("ul");
  ul.classList.add("grid-container");

  filteredNekretnine.forEach((nekretnina) => {
    const li = document.createElement("li");
    const div = document.createElement("div");
    if (tip_nekretnine === "Stan") div.classList.add("card", "stanovi");
    if (tip_nekretnine === "Kuća") div.classList.add("card", "kuca");
    if (tip_nekretnine === "Poslovni prostor")
      div.classList.add("card", "poslovni");

    const img = document.createElement("img");
    img.src = "../slike/kosevo.jpg";
    img.alt = `slika ${nekretnina.naziv}`;

    const nazivP = document.createElement("p");
    nazivP.classList.add("naziv");
    nazivP.textContent = `Naziv: ${nekretnina.naziv}`;

    const kvadraturaP = document.createElement("p");
    kvadraturaP.classList.add("kvadratura");
    kvadraturaP.textContent = `Kvadratura: ${nekretnina.kvadratura} m^2`;

    const cijenaP = document.createElement("p");
    cijenaP.classList.add("cijena");
    cijenaP.textContent = `Cijena: ${nekretnina.cijena}KM`;

    const centerDiv = document.createElement("div");
    centerDiv.classList.add("center");

    const detaljiButton = document.createElement("button");
    detaljiButton.textContent = "Detalji";

    div.appendChild(img);
    div.appendChild(nazivP);
    div.appendChild(kvadraturaP);
    div.appendChild(cijenaP);
    centerDiv.appendChild(detaljiButton);
    div.appendChild(centerDiv);
    li.appendChild(div);
    ul.appendChild(li);
  });
  divReferenca.appendChild(ul);
}

const divStan = document.getElementById("stan");
const divKuca = document.getElementById("kuca");
const divPp = document.getElementById("pp");

const listaNekretnina = [
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
        tekst_upita: "Nullam eu pede mollis pretium.",
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
];

const listaKorisnika = [
  {
    id: 1,
    ime: "Neko",
    prezime: "Nekic",
    username: "username1",
  },
  {
    id: 2,
    ime: "Neko2",
    prezime: "Nekic2",
    username: "username2",
  },
];

//instanciranje modula
let nekretnine = SpisakNekretnina();
nekretnine.init(listaNekretnina, listaKorisnika);

//pozivanje funkcije
spojiNekretnine(divStan, nekretnine, "Stan");
spojiNekretnine(divKuca, nekretnine, "Kuća");
spojiNekretnine(divPp, nekretnine, "Poslovni prostor");
