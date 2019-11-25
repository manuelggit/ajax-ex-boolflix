$(document).ready(function(){

$('input').keyup(function(event){

  var query = $('input').val().toLowerCase();
  console.log(query);

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
        var titoloOriginale = listaFilm[i].original_title;
        console.log(titoloOriginale);
      }

    }

  });

})





  // var source = $("template").html();
  // console.log(source);
  // var template = Handlebars.compile(source);
  // console.log(template);

});
