import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './css/styles.css';

$(document).ready(function() {
  $("#gifKeywords").click(function (){
    const keywords = $('#keywords').val();
    $('#keywords').val("");
    let request = new XMLHttpRequest();
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${keywords}&limit=6&offset=0&rating=g&lang=en`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      $(".showGifs").html("");
      for (let i=0; i<6; i++) {
        $(".showGifs").append(`<iframe src="${response.data[i].embed_url}" class=giphy-embed>`);
      }
    }
  });
});