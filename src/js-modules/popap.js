
  const btnCloseModal = document.querySelector('[data-action="close-popap"]')
  const modalBox = document.querySelector('.popap')

  
  window.addEventListener('keydown', onEscKeyPress)
  
  // закртыие модалки по клику кнопке "закрыть"
  btnCloseModal.addEventListener('click', onCloseBtnClick);
  function onCloseBtnClick() {
      closeModal()
  }
  
  // зыкрытие модалки по клику backdrop
  modalBox.addEventListener('click', onBackdropClick)
  function onBackdropClick(ev) {
      if(ev.currentTarget === ev.target) {
          closeModal()
      }
  }
  
  
  function closeModal() {
    modalBox.classList.add('is-hidden')
      window.removeEventListener('keydown', onEscKeyPress)
  }
  
  // зыкрытие модалки по клавише Esc
  function onEscKeyPress (event) {
      if(event.code === 'Escape') {
          closeModal() 
      }
  }