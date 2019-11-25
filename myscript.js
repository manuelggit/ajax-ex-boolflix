$(document).ready(function(){

  $.ajax ({
    url: "https://api.themoviedb.org/3/movie/550?api_key=26b65514bf0d0d8d8b3921ff50e0770b&query=ritorno+al+futuro",
    method: "GET",
    success: function (filmapi) {
      var title = filmapi.title;
      console.log("il titolo è:", title);
      var original_title = filmapi.original_title;
      console.log("il titolo originale è:", original_title);
      var original_language = filmapi.original_language;
      console.log("la lingua originale è:", original_language);
      var vote_average = filmapi.vote_average;
      console.log("il voto è:", vote_average);
    }
  });



});
