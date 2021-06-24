import trendingFilmsMarkupFc from "../hbs-templates/trending-films.hbs";
import popapFilmMarkup from "../hbs-templates/popap.hbs";
import { getTrendingFilms, fetchMovieForModal, fetchTrailerByMovieId, getSortedFilms } from "./api-service.js";
import variables from "./variables.js";

export const renderTrendingFilms = async function (container, preloader, page) {
  const movies = await getTrendingFilms(preloader, page);

  if (movies.error !== undefined) {
    variables.searchError.innerText = "Some server issue has occured";
    preloader.classList.add('preloader-hidden');

    setTimeout(() => {
      variables.searchError.innerText = '';
    }, 5000);
    return;
  }


  if (container.innerText.length !== 0) {
    container.innerHTML = '';
  }
  container.insertAdjacentHTML('afterbegin', trendingFilmsMarkupFc(movies.updatedFilmData));
  preloader.classList.add('preloader-hidden');
  return movies.totalPages;
};


export async function renderDataForModal(movieId) {
  const movieInfo = await fetchMovieForModal(movieId);

  if (movieInfo.error !== undefined) {
    variables.modalContentBox.innerText = "Some server issue has occured";
    return;
  }

  const dataForRendering = movieInfo.data;

  // Poster Availability Check

  if (dataForRendering.poster_path === null) {
    dataForRendering.poster_path = "http://lexingtonvenue.com/media/poster-placeholder.jpg";
  }

  else {
    dataForRendering.poster_path = `https://image.tmdb.org/t/p/original${dataForRendering.poster_path}`;
  }


  // Rounded popularity
  dataForRendering.popularity = parseFloat(dataForRendering.popularity).toFixed(2);


  // Overview Availability Check

  if (dataForRendering.overview.length === 0) {
    dataForRendering.overview = 'Overview is not provided.';
  }

  // Genres Availability Check

  if (dataForRendering.genres.length === 0 || dataForRendering.genres === undefined) {
    dataForRendering.genres = "Unspecified genre";
  }

  else {
    const filmGenres = dataForRendering.genres.map((genre) => genre.name);
    dataForRendering.genres = filmGenres.join(', ');
  }

  /**Added object with info about movie to session storage 
   to simplify rendering to queue / watched sections */

  sessionStorage.setItem('modalMovieInfo', JSON.stringify(dataForRendering));
  variables.modalContentBox.insertAdjacentHTML('beforeend', popapFilmMarkup(dataForRendering));
}




export const renderTrailerMarkup = async function (id) {
  const res = await fetchTrailerByMovieId(id);
  const key = res.trailerKey;
  const markup = `<iframe class="popap__video" src="https://www.youtube.com/embed/${key}" title="YouTube video player"
    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen></iframe>`;
  return { markup };
};

export const renderFilmsSortedByGenre = async function (container, preloader, genre, page) {
  const movies = await getSortedFilms(preloader, genre, page);

  if (movies.error !== undefined) {
    variables.searchError.innerText = "Some server issue has occured";
    preloader.classList.add('preloader-hidden');
    
    setTimeout(() => {
      variables.searchError.innerText = '';
    }, 5000);
    return;
  }

  if (container.innerText.length !== 0) {
    container.innerHTML = '';
  }

  container.insertAdjacentHTML('afterbegin', trendingFilmsMarkupFc(movies.updatedFilmData));
  preloader.classList.add('preloader-hidden');
  return movies.totalPages;
}
