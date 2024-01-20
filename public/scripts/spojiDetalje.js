const currentURL = new URL(window.location.href);
const nekretnina_id = currentURL.searchParams.get("id");

function x() {
  PoziviAjax.getNekretninaById(nekretnina_id, (err, data) => {
    if (err) {
      console.log("Error:", err);
    } else {
      const nekretnina = JSON.parse(data);
      console.log(nekretnina);
      const naziv = document.getElementById("naziv");
      naziv.append(nekretnina.naziv);
      const kvadratura = document.getElementById("kvadratura");
      kvadratura.append(nekretnina.kvadratura);
      kvadratura.append(" m2");
      const cijena = document.getElementById("cijena");
      cijena.append(nekretnina.cijena);
      cijena.append(" KM");
      const tip_grijanja = document.getElementById("tip_grijanja");
      tip_grijanja.append(nekretnina.tip_grijanja);
      const godina_izgradnje = document.getElementById("godina_izgradnje");
      godina_izgradnje.append(nekretnina.godina_izgradnje);
      const lokacija = document.getElementById("lokacija");
      lokacija.append(nekretnina.lokacija);
      const datum_objave = document.getElementById("datum_objave");
      const formatiraniDatum = new Date(
        nekretnina.datum_objave
      ).toLocaleDateString("en-GB");
      datum_objave.append(formatiraniDatum);
      const upitiDiv = document.getElementById("listUpita");

      nekretnina.Upits.forEach((upit) => {
        const listItem = document.createElement("li");
        listItem.classList.add("element");

        const pitanjeDiv = document.createElement("div");
        pitanjeDiv.classList.add("pitanje");

        const usernameDiv = document.createElement("div");
        usernameDiv.style.fontWeight = "bold";
        usernameDiv.textContent = upit.Korisnik.username;

        const tekstUpitaDiv = document.createElement("div");
        tekstUpitaDiv.textContent = upit.tekst_upita;
        tekstUpitaDiv.style.fontWeight = "normal";

        pitanjeDiv.appendChild(usernameDiv);
        pitanjeDiv.appendChild(tekstUpitaDiv);

        listItem.appendChild(pitanjeDiv);
        upitiDiv.appendChild(listItem);
      });
    }
  });
}
x();

function prikaziUpit(upit) {
  let lista = document.getElementById("listUpita");
  lista.innerHTML = "";
  PoziviAjax.getNekretninaById(nekretnina_id, (err, data) => {
    if (err) {
      console.log("Error:", err);
    } else {
      const nekretnina = JSON.parse(data);
      const upitiDiv = document.getElementById("listUpita");

      nekretnina.Upits.forEach((upit) => {
        const listItem = document.createElement("li");
        listItem.classList.add("element");

        const pitanjeDiv = document.createElement("div");
        pitanjeDiv.classList.add("pitanje");

        const usernameDiv = document.createElement("div");
        usernameDiv.style.fontWeight = "bold";
        usernameDiv.textContent = upit.Korisnik.username;

        const tekstUpitaDiv = document.createElement("div");
        tekstUpitaDiv.textContent = upit.tekst_upita;
        tekstUpitaDiv.style.fontWeight = "normal";

        pitanjeDiv.appendChild(usernameDiv);
        pitanjeDiv.appendChild(tekstUpitaDiv);

        listItem.appendChild(pitanjeDiv);
        upitiDiv.appendChild(listItem);
      });
    }
  });
}

function postUpitCallback(err, res) {
  if (err) {
    console.error(err);
  } else {
    console.log(res);
    prikaziUpit(res);
  }
}

document
  .getElementById("potvrdiUnos")
  .addEventListener("click", function (event) {
    event.preventDefault();
    let text_upita = document.getElementById("noviUpitInput").value;
    console.log(text_upita);
    PoziviAjax.postUpit(nekretnina_id, text_upita, postUpitCallback);
  });
