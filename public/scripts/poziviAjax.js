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
      if (ajax.readyState == 4 && ajax.status == 200)
        fnCallback(null, ajax.responseText);
    };
    ajax.open("GET", "http://localhost:3000/korisnici", true);
    ajax.send();
  }

  // ažurira podatke loginovanog korisnika
  function impl_putKorisnik(noviPodaci, fnCallback) {}

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

  function impl_postLogin(username, password, fnCallback) {}

  function impl_postLogout(fnCallback) {}

  return {
    postLogin: impl_postLogin,
    postLogout: impl_postLogout,
    getKorisnik: impl_getKorisnik,
    putKorisnik: impl_putKorisnik,
    postUpit: impl_postUpit,
    getNekretnine: impl_getNekretnine,
  };
})();
