import genresMarkup from "../hbs-templates/genres.hbs";

const genreBtnRef = document.querySelector('[data-menu-button]');
const genreMenuRef = document.querySelector('[data-menu]');

const filmsContent = document.querySelector('[data-films-content]');
const test2El = document.querySelector('.wrapper')
const genresList = document.querySelector('.menu-genre');
const genresSection = document.querySelector('.genres-section')

const fetchedGenres = JSON.parse(localStorage.getItem('genres'));
const genresNames = fetchedGenres.map(genre => genre.name);
genresList.insertAdjacentHTML('beforeend', genresMarkup(genresNames));

function slideDown(element) {
  return element.style.height = `${element.scrollHeight}px`; 
}

function slideUp(element) {
  return element.style.height = 0
}

genreBtnRef.addEventListener('click', () => {
    const expanded = genreBtnRef.getAttribute('aria-expanded') === 'true' || false;

    genreBtnRef.classList.toggle('is-open');
    genreBtnRef.setAttribute('aria-expanded', !expanded);
    
  
  if (genreBtnRef.classList.contains('is-open')) {
    slideDown(genresSection)
  } else {
    slideUp(genresSection)
  }
  
    // genreMenuRef.classList.toggle('is-open');
    // filmsContent.classList.toggle('films-active');
    // testEl.style.height = '100%';
    // testEl.classList.toggle('visually-hidden')
});

