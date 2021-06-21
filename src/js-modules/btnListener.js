const homeBtn = document.querySelector('.js-home-btn');
const libraryBtn = document.querySelector('.js-library-btn');
const headerHome = document.querySelector('.section__header');
const headerLibrary = document.querySelector('.my__library');
const headerForm = document.querySelector('.header__search');
const libraryBtns = document.querySelector('.library');
const btnWatched = document.querySelector('.js-btn-watched');
const btnQueue = document.querySelector('.js-btn-queue');


homeBtn.addEventListener('click', onHomeBtnClick);
libraryBtn.addEventListener('click', onLibraryBtnClick);
btnWatched.addEventListener('click', onWatchedBtnClick);
btnQueue.addEventListener('click', onQueueBtnClick);

function onHomeBtnClick(e) {
    headerLibrary.classList.add('section__header');
    headerLibrary.classList.remove('my__library');
    headerForm.classList.remove('hidden');
    libraryBtns.classList.add('visually-hidden');
}

function onLibraryBtnClick(e) {
      e.preventDefault();
    console.log('clicked');
    headerHome.classList.add('my__library');
    libraryBtn.classList.add('current');
    homeBtn.classList.remove('current');
    headerHome.classList.remove('section__header');
    libraryBtns.classList.remove('visually-hidden');
    headerForm.classList.add('hidden');
    
}

function onWatchedBtnClick(e) {
    btnWatched.classList.add('checked');
    btnQueue.classList.remove('checked');
}

function onQueueBtnClick(e) {
    btnQueue.classList.add('checked');
    btnWatched.classList.remove('checked');
}