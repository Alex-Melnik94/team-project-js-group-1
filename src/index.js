import './sass/main.scss';

import './js-modules/auth.js';

import { getGenres } from './js-modules/api-service.js';

import './js-modules/galleryMarkup.js';

import themeSwitcher from './js-modules/themeSwitcher.js';

import { renderTrendingFilms } from './js-modules/render-service.js';
import variables from './js-modules/variables.js';

import './js-modules/popap';

import './js-modules/modal-footer.js';
import './js-modules/gener.js';

import Pages from './js-modules/pagination.js';
import initUpArrow from './js-modules/up-arrow.js';
import './js-modules/library';


import './js-modules/btnListener.js';

// Рендер панели с пагинацией и первой страницы с трендовыми фильмами
export const pagination = new Pages('.pagination');
const initMainMarkup = async function () {
  const totalPages = await renderTrendingFilms(variables.filmGrid, variables.preloader);
  pagination.moveToPage(1, totalPages);
};
// Полноценная пагинация по трендовым фильмам
const updateTrendingMarkup = async function () {
  const newPage = pagination.page;
  await renderTrendingFilms(variables.filmGrid, variables.preloader, newPage);
};
pagination.listen(updateTrendingMarkup);
// *********************************************************************

getGenres();
initMainMarkup();
initUpArrow();
