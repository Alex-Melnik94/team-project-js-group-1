import './sass/main.scss';
import { getGenres } from "./js-modules/api-service.js";
import {renderTrendingFilms} from "./js-modules/render-service.js"

const filmGrid = document.querySelector('.film__grid');

getGenres();
renderTrendingFilms(filmGrid);




