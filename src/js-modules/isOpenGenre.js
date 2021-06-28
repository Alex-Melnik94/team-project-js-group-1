import genresMarkup from "../hbs-templates/genres.hbs";

export async function renderGenres(list) {
  const genresArr = await JSON.parse(localStorage.getItem('genres'))
  
  const newGenresMarkup = list.insertAdjacentHTML('beforeend', genresMarkup(genresArr));
  return  newGenresMarkup
}

export function slideDown(element) {
  return element.style.height = `${element.scrollHeight}px`;
}

export function slideUp(element) {
  return element.style.height = '0px';
}