import trendingFilmsMarkupFc from "../hbs-templates/trending-films.hbs";
import { getTrendingFilms, getTrendingFilmsByPageNum } from "./api-service.js";


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

export const renderTrendingFilms = async function (container, preloader) {
    const movies = await getTrendingFilms(preloader);
    container.insertAdjacentHTML('beforeend', trendingFilmsMarkupFc(movies.updatedFilmData));
    preloader.classList.add('preloader-hidden');
    return movies.totalPages;
};

export const renderTrendingFilmsByPageNum = async function (container, preloader, page) {
    const movies = await getTrendingFilmsByPageNum(preloader, page);
    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', trendingFilmsMarkupFc(movies.updatedFilmData));
    preloader.classList.add('preloader-hidden');
    return movies.totalPages;
};

