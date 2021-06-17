import trendingFilmsMarkupFc from "../hbs-templates/trending-films.hbs";
import { getTrendingFilms } from "./api-service.js";

export const renderTrendingFilms = async function (container) {
    const movies = await getTrendingFilms();
    container.insertAdjacentHTML('beforeend', trendingFilmsMarkupFc(movies));
};