
  
const body = document.querySelector('body');
const switcher = document.querySelector('.theme-switch__toggle');

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

body.classList.add(Theme.LIGHT);
switcher.addEventListener('change', setClassList);
switcher.addEventListener('change', saveData);


function setClassList(evt) {
  evt.preventDefault(evt);
  
  
  if (switcher.checked) {
    body.classList.add(Theme.DARK);
    body.classList.remove(Theme.LIGHT);
  } else {
    body.classList.add(Theme.LIGHT);
    body.classList.remove(Theme.DARK);
  }
}

function saveData(evt) {
  
  if (switcher.checked) {
    localStorage.setItem('theme', Theme.DARK);
  } else {
    localStorage.removeItem('theme');
    localStorage.setItem('theme', Theme.LIGHT);
  }
}

const currentTheme = localStorage.getItem('theme');

if (currentTheme === Theme.DARK) {
  body.classList.add(Theme.DARK);
  switcher.checked = true;
}
