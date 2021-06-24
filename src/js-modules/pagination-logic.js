import variables from './variables.js';
import { pagination } from '../index.js';

const onMovedToHomePage = () => {
  const TOTAL_PAGES = 20;
  pagination.moveToPage(1, TOTAL_PAGES);
}

const onMovedToLibrary = () => {

  const screenWidth = window.innerWidth;
  console.log('screenWidth', window.innerWidth);

  if (variables.btnQueue.classList.contains('checked')) {
    variables.headerQueueBtn.dispatchEvent(new Event('click'));
  } else {
    variables.headerWatchedBtn.dispatchEvent(new Event('click'));
  }
  
}

variables.libraryBtn.addEventListener('click', onMovedToHomePage);

variables.headerHome.addEventListener('click', onMovedToLibrary);


