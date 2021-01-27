// GLOBALS VARABLE

var globalFetch;

var API_KEY = 'a5809abe'

// PAGINATION

var PER_PAGE = 10;
var current_page = 1;

// PAGINATION

// GLOBALS VARABLE

var genresArray = [];

var elForm = document.querySelector('.form');
if (elForm) {
    var elInputName = document.querySelector('.form__input-name');
    var elInputBal = document.querySelector('.form__input-bal');
    var elSelectCat = document.querySelector('.form__select1');
    var elSelectSort = document.querySelector('.form__select2');
    var elResult = document.querySelector('.result-list');
    var elTemplate = document.querySelector('.item-template').content;
    var elMarkBtn = document.querySelector('.inner-list');
    var elCount = document.querySelector('.search-result__span');
    var elModalTitle = $_('.modal-title');
    var elModalBody = $_('.modal-body');
    var elModalImg = $_('.modal-img');
}

// CATEGORIYALAR


// CATEGORIYALARNI ISHLASHI

movies.forEach(function (movie) {
    movie.categories.forEach(function (janr) {
        if (!genresArray.includes(janr)) {
            genresArray.push(janr);
        }
    });
});

// CATEGORIYALARNI ISHLASHI


genresArray.sort(); 

genresArray.forEach(function (janr) {
    var elOption = document.createElement('option', janr);
    elOption.value = janr;
    elOption.textContent = janr;
    
    elSelectCat.appendChild(elOption);
});

// CATEGORIYALAR



elForm.addEventListener('submit', function (evt) {
    
    evt.preventDefault();

    globalFetch = `https://omdbapi.com/?apiKey=${API_KEY}&s=${elInputName.value.trim()}&plot=full`
    fetch(globalFetch)
    .then(response => {
        if (response.status === 200) {
            return response.json();
        }
    })
    .then(data => {
        if (data.Response === 'True') {
            elResult.innerHTML = '';
            elCount.textContent = data.totalResults;
            
            var elFragment = document.createDocumentFragment();
            data.Search.forEach(movie => {
                var templateClone = elTemplate.cloneNode(true);
                $_('h3', templateClone).textContent = movie.Title;
                $_('img', templateClone).src = movie.Poster;
                $_('.item__year', templateClone).textContent = movie.Year;
                $_('.item__star', templateClone).textContent = movie.imdbRating;
                $_('.watch', templateClone).href = `https://www.youtube.com/watch?v=${movie.youtubeId}`;
                $_('.watch', templateClone).setAttribute('target', '_blank');
                $_('.info', templateClone).dataset.imdbId = movie.imdbID;
                $_('.mark', templateClone).dataset.imdbId = movie.imdbID;
                elFragment.appendChild(templateClone);
            });
            elResult.appendChild(elFragment);
            
        }
    })
});


var elInfo = document.querySelector('.info');
elResult.addEventListener(`click`, evt => {
    
    if (evt.target.matches('.info')) {
        console.log(elModalTitle);
        var movieModal = filteredMovies.find(movieName => movieName.imdbId === evt.target.dataset.imdbId);
        elModalTitle.textContent = movieModal.title;
        elModalBody.textContent = movieModal.summary;
        elModalImg.src = movieModal.bigThumbnail        ;
        
    }
    
});