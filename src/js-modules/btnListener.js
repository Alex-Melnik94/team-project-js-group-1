import variables from "./variables.js";
import renderQueueAndWatched from '../hbs-templates/queue-and-watched-films.hbs';
import { renderTrendingFilms } from '../js-modules/render-service.js';
// import Pages from './pagination.js';
import { pagination } from '../index.js';

variables.homeBtn.addEventListener('click', onHomeBtnClick);
variables.libraryBtn.addEventListener('click', onLibraryBtnClick);
variables.btnWatched.addEventListener('click', onWatchedBtnClick);
variables.btnQueue.addEventListener('click', onQueueBtnClick);
variables.headerWatchedBtn.addEventListener('click', onHeaderWatchedButtonClick.bind(variables.headerWatchedBtn));
variables.headerQueueBtn.addEventListener('click', onHeaderQueueButtonClick.bind(variables.headerQueueBtn));
variables.fetchTrendingMoviesBtn.addEventListener('input', onTrendingMoviesBtnClick);

function onHomeBtnClick(e) {
    e.preventDefault();
    variables.headerLibrary.classList.add('section__header');
    variables.headerLibrary.classList.remove('my__library');
    variables.searchInput.classList.remove('hidden');
    variables.libraryBtns.classList.add('visually-hidden');
    variables.fetchTrendingMoviesToggle.classList.remove('switch-button--is-hidden');
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

    // const pagination = new Pages('.pagination');

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