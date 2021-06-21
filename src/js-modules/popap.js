import popapFilmMarkup from "../hbs-templates/popap.hbs";

// ссылки 
const backdropBox = document.querySelector('.popap')
const modalContentBox = document.querySelector('[data-film="popap"]')
const listFilms = document.querySelector('.film__grid')
const btnCloseModal = document.querySelector('[data-action="close-popap"]');

listFilms.addEventListener('click', onClickFilm)

// функция клика по карточке фильма
function onClickFilm(e) {

    // проверею, не кликнуть на список
    if(e.target.nodeName==='UL') {
        return
    };

    // находим лишку, в которую кликнули
    const elemetLi =  e.path.find((el) => el.nodeName === 'LI');

    // создаем переменную, для удобства добавления переменных в объект
    const indexLength = elemetLi.children[1].children[1].textContent.length-7;

    // берем данные из лишки и добавляем их в объект
    const arrItemsFilm = {
        imgFilm: elemetLi.children[0].attributes[1].value,
        titleFilm: elemetLi.children[1].children[0].textContent,
        genreFilm: elemetLi.children[1].children[1].textContent.slice(0, indexLength),
        vote: elemetLi.children[2].textContent,
        votes: elemetLi.children[3].textContent,
        popularity: elemetLi.children[4].textContent,
        description: elemetLi.children[5].textContent,
    };
    console.log(elemetLi.children[0].attributes[1].value)
    // делаем шаблонизацию
    modalContentBox.insertAdjacentHTML('beforeend', popapFilmMarkup(arrItemsFilm));

    // открываем модалку
    openModal();



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
    window.addEventListener('keydown', onEscKeyPress);;
    backdropBox.classList.remove('is-hidden');
};

 
  // зыкрытие модалки по клику backdrop
  backdropBox.addEventListener('click', onBackdropClick);
  function onBackdropClick(ev) {
      if(ev.currentTarget === ev.target) {
          closeModal();
      }
  };
  
// зыкрытие модалки по клику на кнопку "закрыть"
  btnCloseModal.addEventListener('click', closeModal);

  // зыкрытие модалки по клавише Esc
  function onEscKeyPress (event) {
      if(event.code === 'Escape') {
          closeModal();
      }
  };
//   зыкрытие модалки
  function closeModal() {
    backdropBox.classList.add('is-hidden');
    window.removeEventListener('keydown', onEscKeyPress);
    modalContentBox.innerHTML = '';
  };