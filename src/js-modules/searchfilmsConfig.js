import apiService from './apiService.js';
import { appendGalleryMarkup } from "./render-service.js"

const preloader = document.querySelector('.preloader');
const searchInput = document.querySelector('.header__search')

function onSearch(e){    
  e.preventDefault();                
  preloader.classList.remove('preloader-hidden');
  apiService.searchQuery = e.currentTarget.elements.query.value.trim();
    if (apiService.searchQuery === '') {
    return;
  }
  e.currentTarget.elements.query.value = '';
  
  apiService.fetchMovies().then(appendGalleryMarkup)
    
    .catch(error => {
      notifications.errorRequest();
    });
  
    
}

searchInput.addEventListener('submit', onSearch);