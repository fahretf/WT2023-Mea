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
    prikaziUpit(res);
  }
}

const noviUpitDiv = document.getElementById("noviUpitDiv");
const isLogOutVisable = localStorage.getItem("isLogOutVisable");
if (isLogOutVisable == "false") {
  noviUpitDiv.style.display = "none";
}

document
  .getElementById("potvrdiUnos")
  .addEventListener("click", function (event) {
    event.preventDefault();
    let text_upita = document.getElementById("noviUpitInput").value;
    PoziviAjax.postUpit(nekretnina_id, text_upita, postUpitCallback);
  });
