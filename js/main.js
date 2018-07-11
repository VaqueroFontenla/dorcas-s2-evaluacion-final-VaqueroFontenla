'use strict';

var buttonSearch = document.querySelector('.js-btnSearch');
var inputSearch = document.querySelector('.js-inputSearch');
var filmFoundedPlace = document.querySelector('.js-film-container');



function search (){
  var filmTitle = inputSearch.value;
  var url = 'http://api.tvmaze.com/search/shows?q='+filmTitle;
  console.log(url);
  fetch(url)
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      for (var i = 0; i<json.length; i++) {
        var filmFounded = json[i].show;
        console.log(json[i].show);
        var titleName = filmFounded.name;
        var titleFoundName = createp(titleName);
        filmFoundedPlace.appendChild(titleFoundName);
        var imgFilm = filmFounded.image;


      }

      // console.log(titleFound);
      // console.log(posterFound);
    });
}

function createp (content){
  var p = document.createElement('p');
  var contentp = document.createTextNode(content);
  p.appendChild(contentp);
  return p;
}

function createimg (content){
  var img = document.createElement('img');
  var contentimg = document.createTextNode(content);
  img.appendChild(contentimg);
  return img;
}
buttonSearch.addEventListener('click', search);
