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
        stampa(listaFilm);

        // // ciclo l'array di oggetti listaFilm in tutta la sua lunghezza
        // for (var i = 0; i < listaFilm.length; i++){
        //   var titolo = listaFilm[i].title;
        //   console.log(titolo); //stampo il titolo che è all'interno di ogni oggetto
        //   var titoloOriginale = listaFilm[i].original_title;
        //   console.log(titoloOriginale); // stampo il titolo originale
        //   var lingua = listaFilm[i].original_language;
        //   console.log(lingua); // stampo la lingua
        //   var voto = listaFilm[i].vote_average;
        //   console.log(voto); // stampo il voto
        //
        //   // con l'append stampo in pagina i 4 valori che mi interessano
        //   $('#id').append('<div>'+titolo+'</div>');
        //   $('#id').append('<div>'+titoloOriginale+'</div>');
        //   $('#id').append('<div>'+lingua+'</div>');
        //   $('#id').append('<div>'+voto+'</div>');
        //   $('#id').append('<div> //////////// </div>');
        // }

      },

      error: function(error){
        console.log('Errore', error);
      }

    });

    $('input').val(""); //rendo l'input vuoto al click

  });

})

});

// funzione per stampare la lista dei film
function stampa(listaFilm){
  var risultati = $('#risultati');

  var source = $('#film-template').html();
  var template = handlebars.compile(source);

  for (var i = 0; i < listaFilm.length; i++) { //ciclo la lista dei film
    var film = listaFilm[i]; //mi ricavo il singolo film

    var context = {
      title: film.title,
      original_title: film.original_title,
      original_language: film.original_language,
      vote_average: film.vote_average,
    }
    
  }

}
