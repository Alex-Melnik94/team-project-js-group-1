import variables from "./variables.js";
import renderFilmGrid from '../hbs-templates/trending-films.hbs';
import renderQueueAndWatched from '../hbs-templates/queue-and-watched-films.hbs';

variables.homeBtn.addEventListener('click', onHomeBtnClick);
variables.libraryBtn.addEventListener('click', onLibraryBtnClick);
variables.btnWatched.addEventListener('click', onWatchedBtnClick);
variables.btnQueue.addEventListener('click', onQueueBtnClick);
variables.headerWatchedBtn.addEventListener('click', onHeaderWatchedButtonClick);
variables.headerQueueBtn.addEventListener('click', onHeaderQueueButtonClick);

function onHomeBtnClick(e) {
    variables.headerLibrary.classList.add('section__header');
    variables.headerLibrary.classList.remove('my__library');
    variables.searchInput.classList.remove('hidden');
    variables.libraryBtns.classList.add('visually-hidden');
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

    // Automatically render watched films

    if (variables.filmGrid.innerHTML.length !== 0) { variables.filmGrid.innerHTML = "" }
    const watchedFilmsArr = localStorage.getItem('watchedFilms');
    const parsedArray = JSON.parse(watchedFilmsArr);
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

function onHeaderWatchedButtonClick() {
    if (variables.filmGrid.innerHTML.length !== 0) { variables.filmGrid.innerHTML = "" }

    const watchedFilmsArr = localStorage.getItem('watchedFilms');
    const parsedArray = JSON.parse(watchedFilmsArr);
    variables.filmGrid.insertAdjacentHTML('beforeend', renderQueueAndWatched(parsedArray));

}

function onHeaderQueueButtonClick() {
    if (variables.filmGrid.innerHTML.length !== 0) { variables.filmGrid.innerHTML = "" }

    const queueFilmsArr = localStorage.getItem('queueFilms');
    const parsedArray = JSON.parse(queueFilmsArr);
    variables.filmGrid.insertAdjacentHTML('beforeend', renderQueueAndWatched(parsedArray));
}