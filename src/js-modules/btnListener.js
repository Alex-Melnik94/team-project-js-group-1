import variables from "./variables.js";

variables.homeBtn.addEventListener('click', onHomeBtnClick);
variables.libraryBtn.addEventListener('click', onLibraryBtnClick);
variables.btnWatched.addEventListener('click', onWatchedBtnClick);
variables.btnQueue.addEventListener('click', onQueueBtnClick);

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
}

function onWatchedBtnClick(e) {
    variables.btnWatched.classList.add('checked');
    variables.btnQueue.classList.remove('checked');
}

function onQueueBtnClick(e) {
    variables.btnQueue.classList.add('checked');
    variables.btnWatched.classList.remove('checked');
}