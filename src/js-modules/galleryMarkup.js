import trendingFilmsMarkupFc from "../hbs-templates/trending-films.hbs";

import { pagination } from "../index"; 
import api from './apiService.js'
import './btnListener.js';
import variables from "./variables.js";




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
  if (films.error !== undefined) {
    variables.searchError.innerText = "Some server issue has occured";
    return;
  }
  
  pagination.listen(onLoadMore);
};
export function updateGalleryMarkup(fetchMovies) {
    
  const films = fetchMovies;
  
  if (films.updatedFilmData.length !== 0) {
    variables.preloader.classList.add('preloader-hidden');
    variables.filmGrid.innerHTML = trendingFilmsMarkupFc(films.updatedFilmData);
    variables.searchError.textContent = '';
  }
  
  pagination.listen(onLoadMore);
};

function onLoadMore(e) {
  const nextPage = pagination.page;
  api.fetchMovies(nextPage).then(updateGalleryMarkup);
}
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