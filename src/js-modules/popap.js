import variables from './variables.js';
import { renderDataForModal } from "./render-service.js";

variables.filmGrid.addEventListener('click', onClickFilm);

// функция клика по карточке фильма
function onClickFilm(e) {

    // ID search depending on clicked node

if (e.target.nodeName === "UL") {
        return;
    };

    const id = e.target.closest(".film__item").dataset.id;

    renderDataForModal(id);
    openModal();
};

// открытие модалки по клику
function openModal() {
    window.addEventListener('keydown', onEscKeyPress);;
    variables.backdropBox.classList.remove('is-hidden');
};

 
  // зыкрытие модалки по клику backdrop
  variables.backdropBox.addEventListener('click', onBackdropClick);
  function onBackdropClick(ev) {
      if(ev.currentTarget === ev.target) {
          closeModal();
      }
  };
  
// зыкрытие модалки по клику на кнопку "закрыть"
  variables.btnCloseModal.addEventListener('click', closeModal);

  // зыкрытие модалки по клавише Esc
  function onEscKeyPress (event) {
      if(event.code === 'Escape') {
          closeModal();
      }
  };
//   зыкрытие модалки
  function closeModal() {
    variables.backdropBox.classList.add('is-hidden');
    window.removeEventListener('keydown', onEscKeyPress);
    variables.modalContentBox.innerHTML = '';
  };