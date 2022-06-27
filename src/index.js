import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './css/styles.css';

$(document).ready(function() {
  $("#gifKeywords").click(function (){
    const keywords = $('#keywords').val();
    $('#keywords').val("");
    let request = new XMLHttpRequest();
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${keywords}&limit=6&offset=0&rating=r&lang=en`;
    

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      $(".showGifs").html("GIFs:<br>");
      for (let i=0; i<6; i++) {
        $(".showGifs").append(`<iframe src="${response.data[i].embed_url}" class=giphy-embed>`);
      }
    }
  });

  $("#gifRandom").click(function (){
    let request = new XMLHttpRequest();
    const randomUrl = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}&tag=&rating=r`;

    request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          const response = JSON.parse(this.responseText);
          getElements(response);
        }
      };
  
    request.open("GET", randomUrl, true);
    request.send();

    function getElements(response) {
      $('.randomGif').html("Random Gifs:<br>");
      $(".randomGif").append(`<iframe src="${response.data.embed_url}" class=giphy-embed>`)
    }       
  });

  $("#gifTrending").click(function (){
    let request = new XMLHttpRequest();
    const trendingUrl = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}&limit=3&rating=r`;

    request.onreadystatechange = function() {
      if(this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", trendingUrl, true);
    request.send();

    function getElements(response) {
      $(".trendingGifs").html("Trending GIFs:<br>");
      for (let i=0; i<3; i++) {
        $(".trendingGifs").append(`<iframe src="${response.data[i].embed_url}" class=giphy-embed>`);
      }
    }

  });
});