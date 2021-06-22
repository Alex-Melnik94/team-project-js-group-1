import trendingFilmsMarkupFc from "../hbs-templates/trending-films.hbs";
import popapFilmMarkup from "../hbs-templates/popap.hbs";
import { getTrendingFilms, fetchMovieForModal, fetchTrailerByMovieId } from "./api-service.js";
import variables from "./variables.js";


export function appendGalleryMarkup(results) {

  const result = results.length;
  if (result !== 0) {
    variables.preloader.classList.add('preloader-hidden');
    variables.filmGrid.innerHTML = trendingFilmsMarkupFc(results);
    variables.searchError.textContent = '';
  }

  if (result === 0) {
    variables.preloader.classList.add('preloader-hidden');
    variables.searchError.textContent =
      'Search result not successful. Enter the correct movie name and search again!';
  }


};


export const renderTrendingFilms = async function (container, preloader, page) {
  const movies = await getTrendingFilms(preloader, page);

  if (movies.error !== undefined) {
    variables.searchError.innerText = "Some server issue has occured";
    return;
  }

  if (container.innerText.length !== 0) {
    container.innerHTML = '';
  }
  container.insertAdjacentHTML('afterbegin', trendingFilmsMarkupFc(movies.updatedFilmData));
  return movies.totalPages;
};


export async function renderDataForModal(movieId) {
  const movieInfo = await fetchMovieForModal(movieId);

  if (movieInfo.error !== undefined) {
    console.log(movieInfo.error);
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

  // Find buttons and add event listeners
  // const trailerBtn = document.querySelector('.trailer-btn');
  // trailerBtn.addEventListener('click', renderTrailer);

  // async function renderTrailer() {
  //   const res = await renderTrailerMarkup(id);
  //   console.log(res.markup);
  // };

  // return { trailerBtn };
}




export const renderTrailerMarkup = async function (id) {
  const res = await fetchTrailerByMovieId(id);
  const key = res.trailerKey;
  const markup = `<iframe class="popap__video" src="https://www.youtube.com/embed/${key}" title="YouTube video player"
    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen></iframe>`;
  return { markup };
};
