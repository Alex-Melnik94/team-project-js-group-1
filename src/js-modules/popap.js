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
    
    // делаем шаблонизацию
    modalContentBox.insertAdjacentHTML('beforeend', popapFilmMarkup(arrItemsFilm));

    // открываем модалку
    openModal();
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