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
    variables.headerHome.classList.add('section__header');    // headerLibrary amended to headerHome
    variables.headerHome.classList.remove('my__library');  // headerLibrary amended to headerHome
    variables.libraryBtn.classList.remove('current');
    variables.homeBtn.classList.add('current');
    variables.searchInput.classList.remove('hidden');
    variables.libraryBtns.classList.add('visually-hidden');
    variables.fetchTrendingMoviesToggle.classList.remove('switch-button--is-hidden');
    initMainMarkup();
    pagination.listen(initMainMarkup);

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

function defineCardsPerPage() {
    const screenWidth = window.innerWidth;
      if (screenWidth < 768) return 4;
      if (screenWidth < 1024) return 8;
      return 9;
  }

function paginateLibrary(array, first = true) {
    const cardsPerPage = defineCardsPerPage();
    const currentPage = first ? 1 : pagination.page;
    const lastPage = array.length;
    const totalPages = Math.ceil(lastPage / cardsPerPage);
    const firstFilmToRender = (currentPage - 1) * cardsPerPage;
    const lastFilmToRender = Math.min(firstFilmToRender + cardsPerPage, lastPage);
    const paginatedArray = array.slice(firstFilmToRender, lastFilmToRender);

    // console.log('----------------');
    // console.log('isFirstInvoke', first);
    // console.log('cardsPerPage', cardsPerPage);
    // console.log('currentPage', currentPage);
    // console.log('lastPage', lastPage);
    // console.log('totalPages', totalPages);
    // console.log('firstFilmToRender', firstFilmToRender);
    // console.log('lastFilmToRender', lastFilmToRender);
    // console.log('paginatedArray', paginatedArray);

    return {paginatedArray, currentPage, totalPages};
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

    const isFirstInvoke = this === variables.headerWatchedBtn;
    const {paginatedArray, currentPage, totalPages} = paginateLibrary(parsedArray, isFirstInvoke);
    
    pagination.moveToPage(currentPage, totalPages);
    pagination.listen(onHeaderWatchedButtonClick);

    variables.filmGrid.insertAdjacentHTML('beforeend', renderQueueAndWatched(paginatedArray));
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

    const isFirstInvoke = this === variables.headerQueueBtn;
    const {paginatedArray, currentPage, totalPages} = paginateLibrary(parsedArray, isFirstInvoke);
    
    pagination.moveToPage(currentPage, totalPages);
    pagination.listen(onHeaderQueueButtonClick);

    variables.filmGrid.insertAdjacentHTML('beforeend', renderQueueAndWatched(paginatedArray));
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