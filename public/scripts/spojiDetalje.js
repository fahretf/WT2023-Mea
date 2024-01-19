const currentURL = new URL(window.location.href);
const nekretnina_id = currentURL.searchParams.get("id");

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

      // Create a div for the bold username
      const usernameDiv = document.createElement("div");
      usernameDiv.style.fontWeight = "bold";
      usernameDiv.textContent = upit.Korisnik.username;

      // Create a div for the text_upita
      const tekstUpitaDiv = document.createElement("div");
      tekstUpitaDiv.textContent = upit.tekst_upita;

      // Append both username and text_upita divs to the main pitanjeDiv
      pitanjeDiv.appendChild(usernameDiv);
      pitanjeDiv.appendChild(tekstUpitaDiv);

      listItem.appendChild(pitanjeDiv);
      upitiDiv.appendChild(listItem);
    });

    // const upitiDiv = document.getElementById("listUpita");

    // nekretnina.Upits.forEach((upit) => {
    //   const listItem = document.createElement("li");
    //   listItem.classList.add("element");

    //   const pitanjeDiv = document.createElement("div");

    //   pitanjeDiv.classList.add("pitanje");

    //   pitanjeDiv.textContent = upit.Korisnik.username;

    //   console.log(upit.KorisnikId);

    //   pitanjeDiv.textContent = pitanjeDiv.textContent + "\n" + upit.tekst_upita;

    //   listItem.appendChild(pitanjeDiv);

    //   upitiDiv.appendChild(listItem);
    // });
  }
});
