import Pages from './pagination.js';
import { getGenres } from './apiService.js';
import { renderTrendingFilms } from './render-service.js';
import variables from './variables.js';
import initUpArrow from './up-arrow.js';

// Рендер панели с пагинацией и первой страницы с трендовыми фильмами
export const pagination = new Pages('.pagination');
export const initMainMarkup = async function () {
  const totalPages = await renderTrendingFilms(variables.filmGrid, variables.preloader);
  pagination.moveToPage(1, totalPages);
};
// Полноценная пагинация по трендовым фильмам
export const updateTrendingMarkup = async function () {
  const newPage = pagination.page;
  await renderTrendingFilms(variables.filmGrid, variables.preloader, newPage);
};
pagination.listen(updateTrendingMarkup);
// *********************************************************************

getGenres();
initMainMarkup();
initUpArrow();
