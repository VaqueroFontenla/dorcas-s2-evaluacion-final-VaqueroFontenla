'use strict';

var buttonSearch = document.querySelector('.js-btnSearch');
var inputSearch = document.querySelector('.js-inputSearch');
var filmFoundedPlace = document.querySelector('.js-film-container');



function search (){
  var filmTitle = inputSearch.value;
  var url = 'http://api.tvmaze.com/search/shows?q='+filmTitle;
  fetch(url)
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      for (var i = 0; i<json.length; i++) {
        var filmFounded = json[i].show;
        //Para el titulo
        var titleName = filmFounded.name;
        var titleFoundName = createp(titleName);
        filmFoundedPlace.appendChild(titleFoundName);


        //Para la imagen
        var img = document.createElement('img');
        var imgFilm = filmFounded.image;
        var noFoundImg = 'https://via.placeholder.com/210x295/cccccc/666666/?text=TV';
        if (imgFilm !== null) {
          var mediumImgFilm = imgFilm.medium;
          var originalImgFilm = imgFilm.original;
          if (mediumImgFilm === undefined) {
            img.src = originalImgFilm;
          } else {
            img.src=mediumImgFilm;
          }
        } else {
          img.src = noFoundImg;
        }
        filmFoundedPlace.append(titleFoundName,img);
      }
    });
}


// Crear parrafo
function createp (content){
  var p = document.createElement('p');
  var contentp = document.createTextNode(content);
  p.appendChild(contentp);
  return p;
}


buttonSearch.addEventListener('click', search);
