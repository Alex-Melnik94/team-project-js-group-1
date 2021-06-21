import trendingFilmsMarkupFc from "../hbs-templates/trending-films.hbs";
import { getTrendingFilms } from "./api-service.js";
import variables from "./variables.js";



export const renderTrendingFilms = async function (container, preloader, page) {
    const movies = await getTrendingFilms(preloader, page);

    if (movies.error !== undefined) {
        variables.searchError.innerText = "SOME SERVER ISSUE HAS OCCURED";
        return;
    }

    if (container.innerText.length !== 0) {
        container.innerHTML = '';
    }
    container.insertAdjacentHTML('beforeend', trendingFilmsMarkupFc(movies.updatedFilmData));
    return movies.totalPages; 
};

