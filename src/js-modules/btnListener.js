import variables from "./variables.js";
import renderQueueAndWatched from '../hbs-templates/queue-and-watched-films.hbs';

import { renderTrendingFilms,  renderFilmsSortedByGenre} from '../js-modules/render-service.js';
import { initMainMarkup, updateTrendingMarkup, pagination } from '../index.js'


variables.homeBtn.addEventListener('click', onHomeBtnClick);
variables.libraryBtn.addEventListener('click', onLibraryBtnClick);
variables.btnWatched.addEventListener('click', onWatchedBtnClick);
variables.btnQueue.addEventListener('click', onQueueBtnClick);
variables.headerWatchedBtn.addEventListener('click', onHeaderWatchedButtonClick.bind(variables.headerWatchedBtn));
variables.headerQueueBtn.addEventListener('click', onHeaderQueueButtonClick.bind(variables.headerQueueBtn));
variables.fetchTrendingMoviesBtn.addEventListener('input', onTrendingMoviesBtnClick);

// <<<Uncomment to activate sorting by genres>>>
// variables.genreSorter.addEventListener('click', onGenreBtnClick);

function onHomeBtnClick(e) {
    e.preventDefault();
    variables.headerLibrary.classList.add('section__header');
    variables.headerLibrary.classList.remove('my__library');
    variables.searchInput.classList.remove('hidden');
    variables.libraryBtns.classList.add('visually-hidden');
    variables.fetchTrendingMoviesToggle.classList.remove('switch-button--is-hidden');

    // <<<Uncomment to activate sorting by genres>>>
    // variables.genreSorter.addEventListener('click', onGenreBtnClick);
    // variables.genreSorter.removeEventListener('click', renderLibraryFilmsSortedByGenre);
}

function onLibraryBtnClick(e) {
    e.preventDefault();
    variables.headerHome.classList.add('my__library');
    variables.libraryBtn.classList.add('current');
    variables.homeBtn.classList.remove('current');
    variables.headerHome.classList.remove('section__header');
    variables.libraryBtns.classList.remove('visually-hidden');
    variables.searchInput.classList.add('hidden');
    variables.searchError.classList.add('visually-hidden');
    variables.fetchTrendingMoviesToggle.classList.add('switch-button--is-hidden');

    // <<<Uncomment to activate sorting by genres>>>
    // variables.genreSorter.removeEventListener('click', onGenreBtnClick);
    // variables.genreSorter.addEventListener('click', renderLibraryFilmsSortedByGenre);

    // Automatically render watched films
const watchedFilmsArr = localStorage.getItem('watchedFilms');
    const parsedArray = JSON.parse(watchedFilmsArr);

        if (variables.filmGrid.innerHTML.length !== 0) {
        variables.filmGrid.innerHTML = "";
    }

        if (parsedArray === null || parsedArray.length === 0) {
        const notification = '<p class="film__notification">No added movies yet</p>';
        variables.filmGrid.insertAdjacentHTML('beforeend', notification);
        return;
    }

    

    variables.filmGrid.insertAdjacentHTML('beforeend', renderQueueAndWatched(parsedArray));
}

function onWatchedBtnClick(e) {
    variables.btnWatched.classList.add('checked');
    variables.btnQueue.classList.remove('checked');
}

function onQueueBtnClick(e) {
    variables.btnQueue.classList.add('checked');
    variables.btnWatched.classList.remove('checked');
}

function defineCardsPerPage () {
    return 10;
}

function onHeaderWatchedButtonClick() {
    if (variables.filmGrid.innerHTML.length !== 0) { variables.filmGrid.innerHTML = "" }

    const watchedFilmsArr = localStorage.getItem('watchedFilms');
    const parsedArray = JSON.parse(watchedFilmsArr);

        if (parsedArray === null || parsedArray.length === 0) {
        const notification = '<p class="film__notification">No added movies yet</p>';
        variables.filmGrid.insertAdjacentHTML('beforeend', notification);
        return;
    }

    console.log('----------------');
    console.log('this in onHeaderWatchedButtonClick', this);
    const cardsPerPage = defineCardsPerPage();
    console.log('cardsPerPage', cardsPerPage);
    const currentPage = this === variables.headerWatchedBtn ? 1 : pagination.page;
    console.log('currentPage', currentPage);
    const lastPage = parsedArray.length;
    console.log('lastPage', lastPage);
    const totalPages = Math.ceil(parsedArray.length / cardsPerPage);
    console.log('totalPages', totalPages);
    const firstFilmToRender = (currentPage - 1) * cardsPerPage;
    console.log('firstFilmToRender', firstFilmToRender);
    const lastFilmToRender = Math.min(firstFilmToRender + cardsPerPage, lastPage);
    console.log('lastFilmToRender', lastFilmToRender);

    const parcedArrayToRender = parsedArray.slice(firstFilmToRender, lastFilmToRender);
    console.log('parcedArrayToRender', parcedArrayToRender);
    
    pagination.moveToPage(currentPage, totalPages);
    pagination.listen(onHeaderWatchedButtonClick);

    variables.filmGrid.insertAdjacentHTML('beforeend', renderQueueAndWatched(parcedArrayToRender));

}

function onHeaderQueueButtonClick() {
    if (variables.filmGrid.innerHTML.length !== 0) { variables.filmGrid.innerHTML = "" }

    const queueFilmsArr = localStorage.getItem('queueFilms');
    const parsedArray = JSON.parse(queueFilmsArr);

        if (parsedArray === null || parsedArray.length === 0) {
        const notification = '<p class="film__notification">No added movies yet</p>';
        variables.filmGrid.insertAdjacentHTML('beforeend', notification);
        return;
    }

    console.log('----------------');
    console.log('this in onHeaderQueueButtonClick', this);
    const cardsPerPage = defineCardsPerPage();
    console.log('cardsPerPage', cardsPerPage);
    const currentPage = this === variables.headerQueueBtn ? 1 : pagination.page;
    console.log('currentPage', currentPage);
    const lastPage = parsedArray.length;
    console.log('lastPage', lastPage);
    const totalPages = Math.ceil(parsedArray.length / cardsPerPage);
    console.log('totalPages', totalPages);
    const firstFilmToRender = (currentPage - 1) * cardsPerPage;
    console.log('firstFilmToRender', firstFilmToRender);
    const lastFilmToRender = Math.min(firstFilmToRender + cardsPerPage, lastPage);
    console.log('lastFilmToRender', lastFilmToRender);

    const parcedArrayToRender = parsedArray.slice(firstFilmToRender, lastFilmToRender);
    console.log('parcedArrayToRender', parcedArrayToRender);
    
    pagination.moveToPage(currentPage, totalPages);
    pagination.listen(onHeaderQueueButtonClick);

    variables.filmGrid.insertAdjacentHTML('beforeend', renderQueueAndWatched(parcedArrayToRender));
}


function onTrendingMoviesBtnClick() {
    let timeFrame;
    if (variables.fetchTrendingMoviesBtn.checked) {
        timeFrame = true;
        localStorage.setItem('trendingMoviesToggleChecked', timeFrame);
    }
    else {
        timeFrame = false;
        localStorage.setItem('trendingMoviesToggleChecked', timeFrame);
    }

    const resetMainMarkup = async function () {
        const totalPages = await renderTrendingFilms(variables.filmGrid, variables.preloader);
        pagination.moveToPage(1, totalPages);
    };

    const updateTrendingMarkup = async function () {
        const newPage = pagination.page;
        await renderTrendingFilms(variables.filmGrid, variables.preloader, newPage);
    };
    pagination.listen(updateTrendingMarkup);

    resetMainMarkup();

}

async function onGenreBtnClick(e) {
    if (e.target.nodeName !== 'A') {
        return;
}
    e.preventDefault();

    const localGenres = localStorage.getItem('genres');
    const genres = JSON.parse(localGenres);
    const genreName = e.target.innerText;

    if (genreName.toLowerCase() === "all genres") {
     pagination.listen(updateTrendingMarkup);
        initMainMarkup();
        variables.fetchTrendingMoviesToggle.classList.remove('switch-button--is-hidden');
        return;
}

    variables.fetchTrendingMoviesToggle.classList.add('switch-button--is-hidden');
    const genre = genres.find((el) => el.name === genreName);
    const genreId = genre.id;
    

        const resetMainMarkup = async function () {
        const totalPages = await renderFilmsSortedByGenre(variables.filmGrid, variables.preloader, genreId);
            pagination.moveToPage(1, totalPages);
    };

    const sortedMoviesMarkup = async function () {
        const newPage = pagination.page;
        await renderFilmsSortedByGenre(variables.filmGrid, variables.preloader, genreId, newPage);
    };
    pagination.listen(sortedMoviesMarkup);

    resetMainMarkup();
    
}

function renderLibraryFilmsSortedByGenre(e) {
    if (e.target.nodeName !== 'A') {
        return;
}
    e.preventDefault();
variables.filmGrid.innerHTML = '';
    const genreName = e.target.innerText;
    
    if (variables.headerWatchedBtn.classList.contains('checked')) {

            if (genreName.toLowerCase() === "all genres") {
                onHeaderWatchedButtonClick();
                return;
    }
    
    const watchedFilmsArr = localStorage.getItem('watchedFilms');
    const parsedArray = JSON.parse(watchedFilmsArr);

        if (parsedArray === null || parsedArray.length === 0) {
        const notification = '<p class="film__notification">No added movies yet</p>';
        variables.filmGrid.insertAdjacentHTML('beforeend', notification);
        return;
        }
        
        const sortedFilms = parsedArray.filter(el => el.genres.includes(genreName));

if (sortedFilms.length === 0) {
        const notification = `<p class="film__notification">No added movies with this genre</p>`;
        variables.filmGrid.insertAdjacentHTML('beforeend', notification);
        return;
        }

        variables.filmGrid.insertAdjacentHTML('beforeend', renderQueueAndWatched(sortedFilms));
        return;
    }
    
    if (variables.headerQueueBtn.classList.contains('checked')) {
                if (genreName.toLowerCase() === "all genres") {
                onHeaderQueueButtonClick();
                return;
    }
    
        const queueFilmsArr = localStorage.getItem('queueFilms');

    const parsedArray = JSON.parse(queueFilmsArr);

        if (parsedArray === null || parsedArray.length === 0) {
        const notification = '<p class="film__notification">No added movies yet</p>';
        variables.filmGrid.insertAdjacentHTML('beforeend', notification);
        return;
        }
        
        const sortedFilms = parsedArray.filter(el => el.genres.includes(genreName));

if (sortedFilms.length === 0) {
        const notification = `<p class="film__notification">No added movies with this genre</p>`;
        variables.filmGrid.insertAdjacentHTML('beforeend', notification);
        return;
        }


        variables.filmGrid.insertAdjacentHTML('beforeend', renderQueueAndWatched(sortedFilms));
        return;
    }
     }