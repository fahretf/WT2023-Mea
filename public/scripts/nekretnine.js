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
    img.src = "../slike/slika.webp";
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

let listaNekretnina;
let listaKorisnika = [];

PoziviAjax.getNekretnine((err, data) => {
  if (err) console.log("Ne");
  listaNekretnina = JSON.parse(data);

  //instanciranje modula
  let nekretnine = SpisakNekretnina();
  nekretnine.init(listaNekretnina, listaKorisnika);

  //pozivanje funkcije
  spojiNekretnine(divStan, nekretnine, "Stan");
  spojiNekretnine(divKuca, nekretnine, "Kuća");
  spojiNekretnine(divPp, nekretnine, "Poslovni prostor");
});
