import variables from './variables.js';

const onMovedToLibrary = () => {

  if (variables.btnQueue.classList.contains('checked')) {
    variables.headerQueueBtn.dispatchEvent(new Event('click'));
  } else {
    variables.headerWatchedBtn.dispatchEvent(new Event('click'));
  }
  
}

variables.libraryBtn.addEventListener('click', onMovedToLibrary);


