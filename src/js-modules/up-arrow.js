// !needed throttle

const upArrow = document.querySelector('[data-action="back-to-top"]');

const onUpArrowClick = () => {
  window.scrollTo({ top: 0, left: pageXOffset, behavior: 'smooth' });
};

const scrollManager = () => {
  upArrow.hidden = pageYOffset < document.documentElement.clientHeight;
};

export default function initUpArrow() {
  upArrow.addEventListener('click', onUpArrowClick);
  window.addEventListener('scroll', scrollManager);  // !throttle this callback!
}
