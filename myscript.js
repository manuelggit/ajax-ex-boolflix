$(document).ready(function(){

  // al click sul "button" faccio partire la funzione cerca
  $('button').click(cerca);

});






// FUNZIONI

// funzione che resetta l'output alla nuova ricerca
function reset(){
  $('#risultati').html('');
}


// funzione di ricerca
function cerca() {
  reset(); //invoco la funzione di reset dell'output
  var urlMovie = 'https://api.themoviedb.org/3/search/movie';
  var urlTv = 'https://api.themoviedb.org/3/search/tv';
  var ricercaUtente = $('input').val().toLowerCase();

  getData(urlTv, ricercaUtente, 'tv');
  getData(urlMovie, ricercaUtente, 'movie');

}



// funzione di reset dell'input
function inputReset(){
  $('input').val(""); //rendo l'input vuoto al click
}



// getData
function getData(url, ricercaUtente, type) {

  var apiKey = '26b65514bf0d0d8d8b3921ff50e0770b';

  $.ajax({

    url: url,
    method: 'GET',
    data: {
      api_key: apiKey,
      query: ricercaUtente,
      language: "it-IT",
    },
    success: function(data){
      var listaElementi = data.results;
      stampa(type, listaElementi);
    },
    error: function(errore){
      alert("c'è un errore");
    }
  })
}


// funzione per stampare le stelle
function stampaStelle(voto){
  voto = Math.floor(voto/2);
  // console.log(voto); // che in questo modo corrisponde al numero di stelle

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



// funzione per stampare le bandiere
function stampaBandiere(lingua){
  var bandiereDisponibili = ['it', 'en'];

  if (bandiereDisponibili.includes(lingua)){
    return "<img src='img/" + lingua + ".png'>";
  }

  return "";
}



// funzione per stampare a schermo la lista degli elementi
function stampa(type, listaElementi){
  var risultatiFilm = $('#risultati-film');
  var risultatiSerieTV = $('#risultati-serietv');

  var sorgenteHtml = $('#template').html();
  var template = Handlebars.compile(sorgenteHtml);

  for (var i = 0; i < listaElementi.length; i++) { //ciclo la lista degli elementi
    var elemento = listaElementi[i]; //mi ricavo il singolo elemento
    // title e original_title cambiano in name e original_name se è una serie tv
    var posterUrl = 'https://image.tmdb.org/t/p/';
    var widthPoster = "w342";
    var posterPath = elemento.poster_path;
    var poster = '<img src=' + posterUrl + widthPoster + posterPath + '>';
    var title, original_title;
    if (type == "movie"){
      title = elemento.title;
      original_title = elemento.original_title;
    } else {
      title = elemento.name; //(per le serie tv c'è name e non title)
      original_title = elemento.original_name; //(per le serie tv c'è original_name e non original_title)
    }

    // se non trova il poster stampo un'immagine di default
    if (posterPath === null) {
      var poster = '<img src="img/default.jpg">';
    } else {
      var poster;
    }

    var context = { //compiliamo il context con ciò che ci serve
      poster: poster,
      tipo: type,
      titolo: title,
      titolo_originale: original_title,
      lingua: elemento.original_language,
      voto: elemento.vote_average,
      stelle: stampaStelle(elemento.vote_average),
      bandiera: stampaBandiere(elemento.original_language),
    };

    var html = template(context); //estraiamo l'html dal context compilato
    // risultati.append(html); //appendiamolo all'interno di "#risultati"
    if (type == 'movie') {
      risultatiFilm.append(html); // se il type è "movie" appendi nei risultatiFilm
    } else {
      risultatiSerieTV.append(html); // altrimenti appendi nei risultatiSerieTV
    }
  }

}
