import './sass/main.scss';
import { getGenres } from "./js-modules/api-service.js";
import { renderTrendingFilms, renderTrendingFilmsByPageNum } from "./js-modules/render-service.js";
import variables from './js-modules/variables.js';
import './js-modules/popap';
import Pages from "./js-modules/pagination.js";


// Рендер панели с пагинацией и первой страницы с трендовыми фильмами
const pagination = new Pages();
const initMainMarkup = async function () {
    const totalPages = await renderTrendingFilms(variables.filmGrid, variables.preloader);
    pagination.moveToPage(1, totalPages);
}
// *********************************************************************

getGenres();
initMainMarkup();







