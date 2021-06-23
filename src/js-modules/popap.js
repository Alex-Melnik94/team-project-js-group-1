import variables from './variables.js';
import { renderDataForModal, renderTrailerMarkup } from "./render-service.js";

let popapBox ='';
let titleRubrics = '';
const body = document.querySelector('body');

variables.filmGrid.addEventListener('click', onClickFilm);
// функция клика по карточке фильма
async function onClickFilm(e) {
    
    // отключаем скролл на body при открытии модалки
    body.classList.add('body-overflow');

    // ID search depending on clicked node

    if (e.target.nodeName === "UL") {
        return;
    };

    const id = e.target.closest(".film__item").dataset.id;

    await renderDataForModal(id);
    openModal();

    // добавляю класс dark-theme для модалки и её элементов
    if(body.classList.contains('dark-theme')) {
        popapBox = document.querySelector('.popap__content')
        titleRubrics = document.querySelector('.popap__block-info')

        popapBox.classList.add('dark-theme');
        titleRubrics.classList.add('dark-theme');
        variables.btnCloseSvg.classList.add('dark-theme');
    }

    const trailerBtn = document.querySelector('.trailer-btn');
    trailerBtn.addEventListener('click', renderTrailer);

    async function renderTrailer() {
        const res = await renderTrailerMarkup(id);
        const videoSection = document.querySelector('.popap__video-div');

        videoSection.insertAdjacentHTML('beforeend', res.markup);
        trailerBtn.disabled = 'true';
        trailerBtn.classList.add('trailer-btn--disabled');
    };

    // ...находим кнопки в модалке
    const addToWatchedBtn = document.querySelector('.js-watched-btn');
    const addToQueueBtn = document.querySelector('.js-queue-btn');

    // ...добавляем слушателей по клику на них
    addToWatchedBtn.addEventListener('click', addToWatchedFilmsInLocalStorage);
    addToQueueBtn.addEventListener('click', addFilmToQueueInLocalStorage);

    // ...функция добавления фильма в Watched массив в Local Storage
    function addToWatchedFilmsInLocalStorage() {
        const existingWatchedFilmsArray = JSON.parse(localStorage.getItem('watchedFilms'));
        const filmObjFromSessionStorage = JSON.parse(sessionStorage.getItem('modalMovieInfo'));
        // console.log(existingWatchedFilmsArray)
        // ...если уже есть фильмы в watchedFilms
        if (existingWatchedFilmsArray) {

            // ...проверка на совпадение: есть ли уже этот фильм в массиве?
            // if (!existingWatchedFilmsArray.find(film => film.id === filmObjFromSessionStorage.titleFilm)) {
            //     existingWatchedFilmsArray.push(filmObjFromSessionStorage);
            //     localStorage.setItem('watchedFilms', JSON.stringify(existingWatchedFilmsArray));
            // }
            const searchedFilm = existingWatchedFilmsArray.find((el) => el.id === filmObjFromSessionStorage.id);
            if (searchedFilm) {
                return;
            }

            existingWatchedFilmsArray.unshift(filmObjFromSessionStorage);
            localStorage.setItem('watchedFilms', JSON.stringify(existingWatchedFilmsArray));

        };

        // ...если ещё нет фильмов в watchedFilms
        if (existingWatchedFilmsArray === null) {
            const watchedFilmsArray = [];
            watchedFilmsArray.push(filmObjFromSessionStorage);
            localStorage.setItem('watchedFilms', JSON.stringify(watchedFilmsArray));
        };

        // ...делаем кнопку addToWatchedBtn disabled и убираем с неё слушателя
        addToWatchedBtn.disabled = true;
        addToWatchedBtn.removeEventListener('click', addToWatchedFilmsInLocalStorage);

        // ...меняем текстовый контент на кнопке - как альтернативная доп.функция
        // addToWatchedBtn.textContent = 'remove from watched';

        // ...добавляем нового слушателя с другой функцией удаления фильма из просмотренных - как альтернативная доп.функция
        // ...removeFromWatchedFilmsInLocalStorage ещё не написана
        // addToWatchedBtn.addEventListener('click', removeFromWatchedFilmsInLocalStorage);
    };

    // ...функция добавления фильма в Queue массив в Local Storage
    function addFilmToQueueInLocalStorage() {
        const existingFilmsInQueueArray = JSON.parse(localStorage.getItem('queueFilms'));
        const filmObjFromSessionStorage = JSON.parse(sessionStorage.getItem('modalMovieInfo'));

        // ...если уже есть фильмы в queueFilms
        if (existingFilmsInQueueArray) {

            // ...проверка на совпадение: есть ли уже этот фильм в массиве?
            // if (!existingFilmsInQueueArray.some(film => film.titleFilm === filmObjFromSessionStorage.titleFilm)) {
            //     existingFilmsInQueueArray.push(filmObjFromSessionStorage);
            //     localStorage.setItem('queueFilms', JSON.stringify(existingFilmsInQueueArray));
            // }


            const searchedFilm = existingFilmsInQueueArray.find((el) => el.id === filmObjFromSessionStorage.id);
            if (searchedFilm) {
                return;
            }

            existingFilmsInQueueArray.unshift(filmObjFromSessionStorage);
            localStorage.setItem('queueFilms', JSON.stringify(existingFilmsInQueueArray));

        };

        // ...если ещё нет фильмов в queueFilms
        if (existingFilmsInQueueArray === null) {
            const queueFilmsArray = [];
            queueFilmsArray.push(filmObjFromSessionStorage);
            localStorage.setItem('queueFilms', JSON.stringify(queueFilmsArray));
        };

        // ...делаем кнопку addToQueueBtn disabled и убираем с неё слушателя
        addToQueueBtn.disabled = true;
        addToQueueBtn.removeEventListener('click', addFilmToQueueInLocalStorage);
    };
};




// открытие модалки по клику
function openModal() {
    window.addEventListener('keydown', onEscKeyPress);
    variables.backdropBox.classList.remove('is-hidden');
};


// зыкрытие модалки по клику backdrop
variables.backdropBox.addEventListener('click', onBackdropClick);
function onBackdropClick(ev) {
    if (ev.currentTarget === ev.target) {
        closeModal();
    }
};

// зыкрытие модалки по клику на кнопку "закрыть"
variables.btnCloseModal.addEventListener('click', closeModal);

// зыкрытие модалки по клавише Esc
function onEscKeyPress(event) {
    if (event.code === 'Escape') {
        closeModal();
    }
};
//   зыкрытие модалки
function closeModal() {
    variables.backdropBox.classList.add('is-hidden');
    window.removeEventListener('keydown', onEscKeyPress);
    variables.modalContentBox.innerHTML = '';
    body.classList.remove('body-overflow');
    
    if(popapBox.classList.contains('dark-theme')) {
        popapBox.classList.remove('dark-theme')
        variables.btnCloseSvg.classList.remove('dark-theme');
    }
};
