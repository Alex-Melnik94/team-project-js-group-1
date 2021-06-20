import trendingFilmsMarkupFc from "../hbs-templates/trending-films.hbs";
import { getTrendingFilms } from "./api-service.js";

const filmGrid = document.querySelector('.film__grid');
const headerError = document.querySelector('.search-error');

export const renderTrendingFilms = async function (container) {
    const movies = await getTrendingFilms();
    container.insertAdjacentHTML('beforeend', trendingFilmsMarkupFc(movies));
};
export function appendGalleryMarkup(results) {
    
  const result = results.length;
    if (result !== 0) {
      filmGrid.innerHTML = trendingFilmsMarkupFc(results);
      headerError.textContent = '';
    }
    
    if (result === 0) {
      headerError.textContent =
        'Search result not successful. Enter the correct movie name and search again!';
    }
    
    
};
