import trendingFilmsMarkupFc from "../hbs-templates/trending-films.hbs";
import { getTrendingFilms, getTrendingFilmsByPageNum } from "./api-service.js";

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