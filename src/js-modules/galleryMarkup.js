import trendingFilmsMarkupFc from "../hbs-templates/trending-films.hbs";

import Pages from "./pagination.js";
import api from './apiService.js'
import './btnListener.js';
import variables from "./variables.js";

const pagination = new Pages();


export function appendGalleryMarkup(fetchMovies) {
    
  const films = fetchMovies;
  
  
  if (films.updatedFilmData.length !== 0) {
    variables.preloader.classList.add('preloader-hidden');
    variables.filmGrid.innerHTML = trendingFilmsMarkupFc(films.updatedFilmData);
      variables.searchError.textContent = '';
      pagination.moveToPage(1, films.totalPages);
  }
    
  if (films.updatedFilmData.length === 0) {
    variables.preloader.classList.add('preloader-hidden');
    variables.searchError.textContent =
    'Search result not successful. Enter the correct movie name and search again!';
  }
  
  
};

function onSearch(e) {
  e.preventDefault();                
  variables.preloader.classList.remove('preloader-hidden');
  api.searchQuery = e.currentTarget.elements.query.value.trim();
    if (api.searchQuery === '') {
    return;
  }
  e.currentTarget.elements.query.value = '';
  
  api.fetchMovies().then(appendGalleryMarkup)
    
  
    
}

variables.searchInput.addEventListener('submit', onSearch);