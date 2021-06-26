const genreBtnRef = document.querySelector('[data-menu-button]');
const genreMenuRef = document.querySelector('[data-menu]');
const filmsContent = document.querySelector('[data-films-content]');

genreBtnRef.addEventListener('click', () => {
    const expanded = genreBtnRef.getAttribute('aria-expanded') === 'true' || false;

    genreBtnRef.classList.toggle('is-open');
    genreBtnRef.setAttribute('aria-expanded', !expanded);

    genreMenuRef.classList.toggle('is-open');
    filmsContent.classList.toggle('films-active');
});