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
        const filmObjFromSessionStorage = JSON.parse(sessionStorage.getItem('modalMovieInfo'));

        dataCheck(filmObjFromSessionStorage)
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

            // ***************************

            // if (filmObjFromSessionStorage.release_date.length === 0 || filmObjFromSessionStorage.release_date === undefined) {
            //     filmObjFromSessionStorage.release_date = 'Unknown release date';
            // }
            // if (el.release_date.length === 0 || el.release_date === undefined) {
            //     el.release_date = 'Unknown release date';
            // }
            // else {
            //     el.release_date = el.release_date.slice(0, 4);
            // }

            // if (filmObjFromSessionStorage.genres.length === 0 || filmObjFromSessionStorage.genres === undefined) {
            //     filmObjFromSessionStorage.genres = "Unspecified genre";
            // }


            // ******************************

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

        dataCheck(filmObjFromSessionStorage)
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

            // ************************************

            // if (filmObjFromSessionStorage.release_date.length === 0 || filmObjFromSessionStorage.release_date === undefined) {
            //     filmObjFromSessionStorage.release_date = 'Unknown release date';
            // }
            // filmObjFromSessionStorage.release_date = filmObjFromSessionStorage.release_date.slice(0, 4);
            // console.log(filmObjFromSessionStorage.release_date);

            // if (filmObjFromSessionStorage.genres.length === 0 || filmObjFromSessionStorage.genres === undefined) {
            //     filmObjFromSessionStorage.genres = "Unspecified genre";
            // }



            // *************************************

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
};

function dataCheck(arr) {
    if (arr.release_date.length === 0 || arr.release_date === undefined) {
        arr.release_date = 'Unknown release date';
    }
    if (arr.release_date.length === 0 || arr.release_date === undefined) {
        arr.release_date = 'Unknown release date';
    }
    else {
        arr.release_date = arr.release_date.slice(0, 4);
    }

    if (arr.genres.length === 0 || arr.genres === undefined) {
        arr.genres = "Unspecified genre";
    }
}