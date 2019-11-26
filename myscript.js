$(document).ready(function(){

  // stampo in console quello che digito a tastiera
  $('input').keyup(function(event){

    var query = $('input').val().toLowerCase();
    // console.log(query);

  // al click sul "button"
  $('button').click(function(){

    // faccio chiamata ajax
    $.ajax ({
      url: "https://api.themoviedb.org/3/search/movie?api_key=26b65514bf0d0d8d8b3921ff50e0770b",
      method: "GET",
      data: {
        query: query, // cambio dinamicamente l'url con la ricerca dell'utente
        original_language: "it-IT", //cerco solo i risultati in italiano
      },

      success: function (filmapi) {
        // console.log(filmapi); // stampo tutto
        // // stampo a console tutti gli oggetti
        var listaFilm = filmapi.results; // stampo solo l'array di oggetti "results"
        stampa(listaFilm); //invoco la funzione per stampare la lista dei film
        if (listaFilm.length > 0) { //rendo l'input vuoto solo se ho ricevuto dei risultati
          inputReset(); // invoco la funzione di inputReset
        }
      },

      error: function(error){
        console.log('Errore', error);
      }

    });

  });

  })

});

// FUNZIONI

// creo la funzione di reset dell'input
function inputReset(){
  $('input').val(""); //rendo l'input vuoto al click
}

// funzione per stampare la lista dei film
function stampa(listaFilm){
  var risultati = $('#risultati');

  var sorgenteHtml = $('#film-template').html();
  var template = Handlebars.compile(sorgenteHtml);

  for (var i = 0; i < listaFilm.length; i++) { //ciclo la lista dei film
    var film = listaFilm[i]; //mi ricavo il singolo film

    var context = { //compiliamo il context con ciò che ci serve
      Titolo: film.title,
      Titolo_originale: film.original_title,
      Lingua: stampaBandiere(),
      Voto: film.vote_average,
      Stelle: stampaStelle(),
    }


    var html = template(context); //estraiamo l'html dal context compilato
    risultati.append(html); //appendiamolo all'interno di "#risultati"
  }

  // funzione per stampare le stelle
  function stampaStelle(stella){
    // dimezzo e arrotondo il voto in funzione della creazione delle stelline
    var voto = film.vote_average;
    var stelle = Math.round(voto/2);
    console.log('stelle del film', stelle);

    var contenitoreStelle = [];
    console.log(contenitoreStelle);
    for (var i = 1; i <= 5; i++){
      if(i <= stelle){
        console.log(i, 'stella piena');
        // contenitoreStelle.push('<i class="fas fa-star"></i>');
      } else {
        console.log(i, 'stella vuota');
        // contenitoreStelle.push('<i class="far fa-star"></i>');
      }
    return contenitoreStelle

    }
  }

  function stampaBandiere(){
    var aggiungiBandiera = '';
    var lingua = film.original_language;
    console.log(lingua);
    if (lingua === 'it'){
      aggiungiBandiera = '<img src="img/it.png" alt="italia">'
    } if (lingua === 'en'){
      aggiungiBandiera = '<img src="img/en.png" alt="inghilterra">'
    }
    return aggiungiBandiera;
  }


}
