const PoziviAjax = (() => {
  // fnCallback se u svim metodama poziva kada stigne
  // odgovor sa servera putem Ajax-a
  // svaki callback kao parametre ima error i data,
  // error je null ako je status 200 i data je tijelo odgovora
  // ako postoji greška, poruka se prosljeđuje u error parametru
  // callback-a, a data je tada null

  // vraća korisnika koji je trenutno prijavljen na sistem
  function impl_getKorisnik(fnCallback) {
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
      // Anonimna funkcija
      console.log("proslo");
      console.log(ajax.responseText);
      if (ajax.readyState == 4 && ajax.status == 200)
        fnCallback(null, ajax.responseText);
    };
    ajax.open("GET", "http://localhost:3000/korisnik", true);
    ajax.send();
  }

  // ažurira podatke loginovanog korisnika
  function impl_putKorisnik(noviPodaci, fnCallback) {
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
      // Anonimna funkcija
      console.log("proslo");
      console.log(ajax.responseText);
      if (ajax.readyState == 4 && ajax.status == 201)
        fnCallback(null, ajax.responseText);
    };
    ajax.open("PUT", "http://localhost:3000/korisnik", true);
    ajax.send();
  }

  // dodaje novi upit za trenutno loginovanog korisnika
  function impl_postUpit(nekretnina_id, tekst_upita, fnCallback) {}

  function impl_getNekretnine(fnCallback) {
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
      // Anonimna funkcija
      if (ajax.readyState == 4 && ajax.status == 200)
        fnCallback(null, ajax.responseText);
    };
    ajax.open("GET", "http://localhost:3000/nekretnine", true);
    ajax.send();
  }

  function impl_postLogin(username, password, fnCallback) {
    let ajax = new XMLHttpRequest();
    ajax.open("POST", "/login", true);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.onreadystatechange = function () {
      if (ajax.readyState === 4) {
        if (ajax.status === 200) {
          console.log("Prosaooo ");
          try {
            var odgovor = JSON.parse(ajax.responseText);
            console.log(odgovor);
            fnCallback(null, odgovor);
          } catch (error) {
            console.error("Error parsing JSON:", error);
            fnCallback("Error parsing JSON", null);
          }
        } else {
          fnCallback("Server error", null);
        }
      }
    };

    var podaci = {
      username: username,
      password: password,
    };
    ajax.send(JSON.stringify(podaci));
  }

  function impl_postLogout(fnCallback) {
    var ajax = new XMLHttpRequest();
    ajax.open("POST", "/logout", true);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.onreadystatechange = function () {
      if (ajax.readyState === 4) {
        if (ajax.status === 200) {
          try {
            var odgovor = JSON.parse(ajax.responseText);
            console.log(odgovor);
            fnCallback(null, odgovor);
          } catch (error) {
            console.error("Error parsing JSON:", error);
            fnCallback("Error parsing JSON", null);
          }
        } else {
          fnCallback("Server error", null);
        }
      }
    };
    console.log("lol?");
    ajax.send();
  }

  function impl_getNekretninaById(nekretnina_id, fnCallback) {
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
      if (ajax.readyState == 4 && ajax.status == 200)
        fnCallback(null, ajax.responseText);
      else if (ajax.status == 400 && ajax.readyState == 4)
        fnCallback(ajax.responseText, null);
    };
    ajax.open("GET", `http://localhost:3000/nekretnina/${nekretnina_id}`, true);
    ajax.send();
  }

  return {
    postLogin: impl_postLogin,
    postLogout: impl_postLogout,
    getKorisnik: impl_getKorisnik,
    putKorisnik: impl_putKorisnik,
    postUpit: impl_postUpit,
    getNekretnine: impl_getNekretnine,
    getNekretninaById: impl_getNekretninaById,
  };
})();
