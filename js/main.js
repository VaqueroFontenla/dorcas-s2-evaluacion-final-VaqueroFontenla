'use strict';

var buttonSearch = document.querySelector('.js-btnSearch');
var inputSearch = document.querySelector('.js-inputSearch');
var filmFoundedPlace = document.querySelector('.js-film-container');
var cardContainer;
var arraySeries = [];



function search() {
  filmFoundedPlace.innerHTML = '';
  var storage = localStorage.getItem('id series', JSON.parse(arraySeries));
  console.log(storage);
  var filmTitle = inputSearch.value;
  var url = 'http://api.tvmaze.com/search/shows?q=' + filmTitle;
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      for (var i = 0; i < json.length; i++) {
        var filmFounded = json[i].show;

        // Recoger id
        var id = filmFounded.id;


        //Para el titulo
        var divContainerTitle = document.createElement('div');
        var titleName = filmFounded.name;
        var titleFoundName = createp(titleName);
        divContainerTitle.appendChild(titleFoundName);
        divContainerTitle.classList.add('titleContainer');

        //Para la imagen
        var divContainerCard = document.createElement('div');
        var img = document.createElement('img');
        var imgFilm = filmFounded.image;
        var noFoundImg = 'https://via.placeholder.com/210x295/cccccc/666666/?text=TV';
        if (imgFilm !== null) {
          var mediumImgFilm = imgFilm.medium;
          var originalImgFilm = imgFilm.original;
          if (mediumImgFilm === undefined) {
            img.src = originalImgFilm;
          } else {
            img.src = mediumImgFilm;
          }
        } else {
          img.src = noFoundImg;
        }
        divContainerCard.appendChild(img);
        divContainerCard.classList.add('imgContainer');


        // Recoger id
        var id = filmFounded.id;

        // Contenedor general
        cardContainer = creatediv(divContainerCard, divContainerTitle);
        cardContainer.setAttribute('id',id);
        cardContainer.classList.add('nofavourite');
        cardContainer.addEventListener('click', addFavorite);
        filmFoundedPlace.append(cardContainer);
      }
    });
}

// Crear div tarjetas
function creatediv(titleCard, imgCard) {
  var div = document.createElement('div');
  //div.addEventListener('click', addFavorite);
  div.append(titleCard, imgCard);

  return div;
}
// Crear parrafo
function createp(content) {
  var p = document.createElement('p');
  var contentp = document.createTextNode(content);
  p.appendChild(contentp);
  return p;
}


buttonSearch.addEventListener('click', search);

//Peliculas favoritas

function addFavorite(e) {
  var currentFilm = e.currentTarget;
  var idFilm = currentFilm.id;
  //currentFilm.classList.toggle('favourite');
  if (currentFilm.classList.contains('nofavourite')) {
    currentFilm.classList.add('favourite');
    currentFilm.classList.remove('nofavourite');
    arraySeries.push(idFilm);
    localStorage.setItem('id series',JSON.stringify(arraySeries));
  } else if (currentFilm.classList.contains('favourite')){
    currentFilm.classList.remove('favourite');
    currentFilm.classList.add('nofavourite');
    var indexIdFilm = arraySeries.indexOf(idFilm);
    arraySeries.splice(indexIdFilm,1);
    localStorage.setItem('id series',JSON.stringify(arraySeries));
  }

  }
  console.log(arraySeries);
