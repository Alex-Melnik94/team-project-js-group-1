import trendingFilmsMarkupFc from "../hbs-templates/trending-films.hbs";
import { getTrendingFilms, getTrendingFilmsByPageNum } from "./api-service.js";

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

