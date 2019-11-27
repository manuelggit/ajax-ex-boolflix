$(document).ready(function(){

  // stampo in console quello che digito a tastiera
  $('input').keyup(function(event){

    var query = $('input').val().toLowerCase();
    // console.log(query);

  // al click sul "button"
  $('button').click(function(){

    // faccio chiamata ajax movie
    $.ajax ({
      url: "https://api.themoviedb.org/3/search/movie?api_key=26b65514bf0d0d8d8b3921ff50e0770b",
      method: "GET",
      data: {
        query: query, // cambio dinamicamente l'url con la ricerca dell'utente
        original_language: "it-IT", //cerco solo i risultati in italiano
      },

      success: function (data) {
        // console.log(data); // stampo tutto
        // // stampo a console tutti gli oggetti
        var listaElementi = data.results; // stampo solo l'array di oggetti "results"
        console.log(listaElementi);
        stampa("movie", listaElementi); //invoco la funzione per stampare la lista degli elementi "movie"

        if (listaElementi.length > 0) { //rendo l'input vuoto solo se ho ricevuto dei risultati
          inputReset(); // invoco la funzione di inputReset
        }
      },

      error: function(error){
        alert("c'è un errore!");
      }

    });

    // faccio chiamata ajax tv
    $.ajax ({
      url: "https://api.themoviedb.org/3/search/tv?api_key=26b65514bf0d0d8d8b3921ff50e0770b",
      method: "GET",
      data: {
        query: query, // cambio dinamicamente l'url con la ricerca dell'utente
        original_language: "it-IT", //cerco solo i risultati in italiano
      },

      success: function (data) {
        // console.log(data); // stampo tutto
        var listaElementi = data.results; // stampo solo l'array di oggetti "results"
        stampa("tv", listaElementi); //invoco la funzione per stampare la lista degli elementi "tv"

        if (listaElementi.length > 0) { //rendo l'input vuoto solo se ho ricevuto dei risultati
          inputReset(); // invoco la funzione di inputReset
        }
      },

      error: function(error){
        alert("c'è un errore!");
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


// funzione per stampare le stelle
function stampaStelle(voto){
  voto = Math.floor(voto/2);
  console.log(voto); // che in questo modo corrisponde al numero di stelle

  var res = '';

  for(var i = 1; i <=5; i++){

    if(i <= voto){
      res += '<i class="fas fa-star"></i>';
    } else {
      res += '<i class="far fa-star"></i>';
    }

  }
  return res;
};



// funzione per stampare a schermo la lista degli elementi
function stampa(type, listaElementi){
  var risultati = $('#risultati');

  var sorgenteHtml = $('#template').html();
  var template = Handlebars.compile(sorgenteHtml);

  for (var i = 0; i < listaElementi.length; i++) { //ciclo la lista degli elementi
    var elemento = listaElementi[i]; //mi ricavo il singolo elemento
    // title e original_title cambiano in name e original_name se è una serie tv
    var title, original_title;
    if (type == "movie"){
      title = elemento.title;
      original_title = elemento.original_title;
    } else {
      title = elemento.name; //(per le serie tv c'è name e non title)
      original_title = elemento.original_name; //(per le serie tv c'è original_name e non original_title)
    }

    var context = { //compiliamo il context con ciò che ci serve
      type: type,
      titolo: title,
      titolo_originale: original_title,
      lingua: elemento.original_language,
      voto: elemento.vote_average,
      stelle: stampaStelle(elemento.vote_average),
    };

    var html = template(context); //estraiamo l'html dal context compilato
    risultati.append(html); //appendiamolo all'interno di "#risultati"
  }

}
