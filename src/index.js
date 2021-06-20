import './sass/main.scss';
import { getGenres } from "./js-modules/api-service.js";
import { renderTrendingFilms } from "./js-modules/render-service.js"
import config from './js-modules/searchfilmsConfig.js';
import themeSwitcher from './js-modules/themeSwitcher.js';
import './js-modules/popap';

const filmGrid = document.querySelector('.film__grid');

getGenres();
renderTrendingFilms(filmGrid);






