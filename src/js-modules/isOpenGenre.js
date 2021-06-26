import genresMarkup from "../hbs-templates/genres.hbs";

const genreBtnRef = document.querySelector('[data-menu-button]');
const genreMenuRef = document.querySelector('[data-menu]');

const filmsContent = document.querySelector('[data-films-content]');

const genresList = document.querySelector('.menu-genre');

const fetchedGenres = JSON.parse(localStorage.getItem('genres'));
const genresNames = fetchedGenres.map(genre => genre.name);
genresList.insertAdjacentHTML('beforeend', genresMarkup(genresNames));


genreBtnRef.addEventListener('click', () => {
    const expanded = genreBtnRef.getAttribute('aria-expanded') === 'true' || false;

    genreBtnRef.classList.toggle('is-open');
    genreBtnRef.setAttribute('aria-expanded', !expanded);

    genreMenuRef.classList.toggle('is-open');
    filmsContent.classList.toggle('films-active');
});