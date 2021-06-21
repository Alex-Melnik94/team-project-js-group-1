import trendingFilmsMarkupFc from "../hbs-templates/trending-films.hbs";
import { getTrendingFilms } from "./api-service.js";
import variables from "./variables.js";

const preloader = document.querySelector('.preloader');
const filmGrid = document.querySelector('.film__grid');
const headerError = document.querySelector('.search-error');


export function appendGalleryMarkup(results) {
    
  const result = results.length;
  if (result !== 0) {
    preloader.classList.add('preloader-hidden');
    filmGrid.innerHTML = trendingFilmsMarkupFc(results);
    headerError.textContent = '';
  }
    
  if (result === 0) {
    preloader.classList.add('preloader-hidden');
    headerError.textContent =
    'Search result not successful. Enter the correct movie name and search again!';
  }
    
    
};

export const renderTrendingFilms = async function (container, preloader, page) {
    const movies = await getTrendingFilms(preloader, page);

    if (movies.error !== undefined) {
        variables.searchError.innerText = "SOME SERVER ISSUE HAS OCCURED";
        return;
    }

    if (container.innerText.length !== 0) {
        container.innerHTML = '';
    }
    container.insertAdjacentHTML('beforeend', trendingFilmsMarkupFc(movies.updatedFilmData));
    return movies.totalPages; 
};

