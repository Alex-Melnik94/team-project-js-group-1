import variables from './variables.js';
import { renderDataForModal, renderTrailerMarkup } from "./render-service.js";

variables.filmGrid.addEventListener('click', onClickFilm);
// функция клика по карточке фильма
async function onClickFilm(e) {
    // ID search depending on clicked node

    if (e.target.nodeName === "UL") {
        return;
    };

    const id = e.target.closest(".film__item").dataset.id;

    await renderDataForModal(id);
    openModal();

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

        // ...если уже есть фильмы в watchedFilms
        if (existingWatchedFilmsArray) {

            // ...проверка на совпадение: есть ли уже этот фильм в массиве?
            if (!existingWatchedFilmsArray.some(film => film.titleFilm === arrItemsFilm.titleFilm)) {
                existingWatchedFilmsArray.push(arrItemsFilm);
                localStorage.setItem('watchedFilms', JSON.stringify(existingWatchedFilmsArray));
            }
        };

        // ...если ещё нет фильмов в watchedFilms
        if (!existingWatchedFilmsArray) {
            let watchedFilmsArray = [];
            watchedFilmsArray.push(arrItemsFilm);
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

        // ...если уже есть фильмы в queueFilms
        if (existingFilmsInQueueArray) {

            // ...проверка на совпадение: есть ли уже этот фильм в массиве?
            if (!existingFilmsInQueueArray.some(film => film.titleFilm === arrItemsFilm.titleFilm)) {
                existingFilmsInQueueArray.push(arrItemsFilm);
                localStorage.setItem('queueFilms', JSON.stringify(existingFilmsInQueueArray));
            }
        };

        // ...если ещё нет фильмов в queueFilms
        if (!existingFilmsInQueueArray) {
            let queueFilmsArray = [];
            queueFilmsArray.push(arrItemsFilm);
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
};
