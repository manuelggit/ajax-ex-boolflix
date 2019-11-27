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
        original_language: "it-IT", //cerco solo i risultati-film in italiano
      },

      success: function (data) {
        // console.log(data); // stampo tutto
        // // stampo a console tutti gli oggetti
        var listaFilm = data.results; // stampo solo l'array di oggetti "results"
        stampa("movie", listaFilm); //invoco la funzione per stampare la lista dei film
        if (listaFilm.length > 0) { //rendo l'input vuoto solo se ho ricevuto dei risultati-film
          inputReset(); // invoco la funzione di inputReset
        }
      },

      error: function(error){
        // console.log('Errore', error);
      }

    });

    // faccio chiamata ajax tv
    $.ajax ({
      url: "https://api.themoviedb.org/3/search/tv?api_key=26b65514bf0d0d8d8b3921ff50e0770b",
      method: "GET",
      data: {
        query: query, // cambio dinamicamente l'url con la ricerca dell'utente
        original_language: "it-IT", //cerco solo i risultati-film in italiano
      },

      success: function (data) {
        // console.log(data); // stampo tutto
        // // stampo a console tutti gli oggetti
        var listaFilm = data.results; // stampo solo l'array di oggetti "results"
        stampa("tv", listaFilm); //invoco la funzione per stampare la lista dei film
        if (listaFilm.length > 0) { //rendo l'input vuoto solo se ho ricevuto dei risultati-film
          inputReset(); // invoco la funzione di inputReset
        }
      },

      error: function(error){
        // console.log('Errore', error);
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
function stampa(tipo, listaFilm){
  var risultatiFilm = $('#risultati-film');

  var sorgenteHtml = $('#film-template').html();
  var template = Handlebars.compile(sorgenteHtml);

  for (var i = 0; i < listaFilm.length; i++) { //ciclo la lista dei film
    var film = listaFilm[i]; //mi ricavo il singolo film

    // cambia solo se è film o serie tv: cambio solo questo campio e lo faccio propagare nell'handlebars
    var title, original_title;
    if (tipo == "movie"){
      title = film.title;
      original_title = film.original_title;
    } else {
      title = film.name; //(per le serie tv c'è name e non title)
      original_title = film.original_name; //(per le serie tv c'è original_name e non original_title)
    }

    var context = { //compiliamo il context con ciò che ci serve
      Tipo: tipo,
      Titolo: title,
      Titolo_originale: original_title,
      Lingua: film.original_language,
      Voto: film.vote_average,
    }


    var html = template(context); //estraiamo l'html dal context compilato
    risultatiFilm.append(html); //appendiamolo all'interno di "#risultati-film"
  }

  // // funzione per stampare le stelle
  // function stampaStelle(stella){
  //   // dimezzo e arrotondo il voto in funzione della creazione delle stelline
  //   var voto = film.vote_average;
  //   var stelle = Math.round(voto/2);
  //   // console.log('stelle del film', stelle);
  //
  //   var contenitoreStelle = [];
  //   // console.log(contenitoreStelle);
  //   for (var i = 1; i <= 5; i++){
  //     if(i <= stelle){
  //       // console.log(i, 'stella piena');
  //       // contenitoreStelle.push('<i class="fas fa-star"></i>');
  //     } else {
  //       // console.log(i, 'stella vuota');
  //       // contenitoreStelle.push('<i class="far fa-star"></i>');
  //     }
  //   return contenitoreStelle
  //
  //   }
  // }

  // // funzione per stampare le bandiere
  // function stampaBandiere(){
  //   var aggiungiBandiera = '';
  //   var lingua = film.original_language;
  //   // console.log(lingua);
  //   if (lingua === 'it'){
  //     aggiungiBandiera = '<img src="img/it.png" alt="italia">'
  //   } else if (lingua === 'en'){
  //     aggiungiBandiera = '<img src="img/en.png" alt="inghilterra">'
  //   } else {
  //     aggiungiBandiera = lingua;
  //   }
  //   return aggiungiBandiera;
  // }


}

// // Serietv
//
// // funzione per stampare la lista delle serieTv
// function stampa(listaSerieTv){
//   var risultatiSerieTv = $('#risultati-serietv');
//
//   var sorgenteHtml = $('#film-template').html();
//   var template = Handlebars.compile(sorgenteHtml);
//
//   for (var j = 0; j < listaSerieTv.length; j++) { //ciclo la lista delle serie tv
//     var serieTv = listaSerieTv[j]; //mi ricavo le singole serie tv
//
//     var contextSerieTv = { //compiliamo il context con ciò che ci serve
//       Titolo: serieTv.title,
//       Titolo_originale: serieTv.original_title,
//       Lingua: stampaBandiereSerieTV(),
//       Voto: serieTv.vote_average,
//       Stelle: stampaStelleSerieTV(),
//     }
//
//
//     var htmlSerieTV = template(contextSerieTv); //estraiamo l'html dal context compilato
//     risultatiSerieTv.append(htmlSerieTV); //appendiamolo all'interno di "#risultati-serietv"
//   }
//
//   // funzione per stampare le stelle
//   function stampaStelleSerieTV(stelleSerieTV){
//     // dimezzo e arrotondo il voto in funzione della creazione delle stelline
//     var votoSerieTV = serieTv.vote_average;
//     var stelleSerieTV = Math.round(votoSerieTV/2);
//     // console.log('stelle del film', stelle);
//
//     var contenitoreStelleSerieTV = [];
//     // console.log(contenitoreStelle);
//     for (var j = 1; j <= 5; j++){
//       if(j <= stelleSerieTV){
//         // console.log(i, 'stella piena');
//         // contenitoreStelle.push('<i class="fas fa-star"></i>');
//       } else {
//         // console.log(i, 'stella vuota');
//         // contenitoreStelle.push('<i class="far fa-star"></i>');
//       }
//     return contenitoreStelleSerieTV
//
//     }
//   }
//
//   // funzione per stampare le bandiere
//   function stampaBandiereSerieTV(){
//     var aggiungiBandieraSerieTV = '';
//     var linguaSerieTV = serieTv.original_language;
//     // console.log(lingua);
//     if (linguaSerieTV === 'it'){
//       aggiungiBandieraSerieTV = '<img src="img/it.png" alt="italia">'
//     } else if (linguaSerieTV === 'en'){
//       aggiungiBandieraSerieTV = '<img src="img/en.png" alt="inghilterra">'
//     } else {
//       aggiungiBandieraSerieTV = linguaSerieTV;
//     }
//     return aggiungiBandieraSerieTV;
//   }
//
//
// }
