$(document).ready(function(){

  // stampo in console quello che digito a tastiera
  $('input').keyup(function(event){

    var query = $('input').val().toLowerCase();
    console.log(query);

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
        console.log(filmapi); // stampo tutto

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

// creo la funzione di reset dell'input
function inputReset(){
  $('input').val(""); //rendo l'input vuoto al click
}

// funzione per stampare la lista dei film
function stampa(listaFilm){
  var risultati = $('#risultati');

  var source = $('#film-template').html();
  var template = Handlebars.compile(source);

  for (var i = 0; i < listaFilm.length; i++) { //ciclo la lista dei film
    var film = listaFilm[i]; //mi ricavo il singolo film

    var context = { //compiliamo il context con ciò che ci serve
      Titolo: film.title,
      Titolo_originale: film.original_title,
      Lingua: film.original_language,
      Voto: film.vote_average,
    }

    var html = template(context); //estraiamo l'html dal context compilato
    risultati.append(html); //appendiamolo all'interno di "#risultati"
  }

}
