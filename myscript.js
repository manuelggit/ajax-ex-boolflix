$(document).ready(function(){

  $('input').keyup(function(event){

    var query = $('input').val().toLowerCase();
    console.log(query);

  $('button').click(function(){

    $.ajax ({
      url: "https://api.themoviedb.org/3/search/movie?api_key=26b65514bf0d0d8d8b3921ff50e0770b",
      method: "GET",
      data: {
        query: query
      },
      success: function (filmapi) {
        console.log(filmapi);

        var listaFilm = filmapi.results;
        console.log(listaFilm);

        for (var i = 0; i < listaFilm.length; i++){
          var titolo = listaFilm[i].title;
          console.log(titolo);
          var titoloOriginale = listaFilm[i].original_title;
          console.log(titoloOriginale);
          var lingua = listaFilm[i].original_language;
          console.log(lingua);
          var voto = listaFilm[i].vote_average;
          console.log(voto);

          $('#id').append('<div>'+titolo+'</div>');
          $('#id').append('<div>'+titoloOriginale+'</div>');
          $('#id').append('<div>'+lingua+'</div>');
          $('#id').append('<div>'+voto+'</div>');
        }

      }

    });

  });





})





  // var source = $("template").html();
  // console.log(source);
  // var template = Handlebars.compile(source);
  // console.log(template);

});
