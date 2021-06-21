import './sass/main.scss';
import { getGenres } from "./js-modules/api-service.js";

import config from './js-modules/searchfilmsConfig.js';
import themeSwitcher from './js-modules/themeSwitcher.js';

import { renderTrendingFilms} from "./js-modules/render-service.js";
import variables from './js-modules/variables.js';

import './js-modules/popap';
import Pages from "./js-modules/pagination.js";
import initUpArrow from "./js-modules/up-arrow.js";


// Рендер панели с пагинацией и первой страницы с трендовыми фильмами
const pagination = new Pages();
const initMainMarkup = async function () {
    const totalPages = await renderTrendingFilms(variables.filmGrid, variables.preloader);
    pagination.moveToPage(1, totalPages);
}
// Полноценная пагинация по трендовым фильмам
const updateTrendingMarkup = async function () {
    const newPage = pagination.page;
    await renderTrendingFilms(variables.filmGrid, variables.preloader, newPage);
    
}
pagination.container.addEventListener('pagechanged', updateTrendingMarkup);
// *********************************************************************

getGenres();
initMainMarkup();
initUpArrow();









