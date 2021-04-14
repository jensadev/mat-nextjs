let prevScrollpos = window.pageYOffset;

window.onscroll = () => {
  const span = document.querySelector('.page-header > span:first-of-type');
  const bgColor = window.getComputedStyle(span).backgroundColor;

  const currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.querySelector('#header').style.top = '0';
  } else {
    document.querySelector('#header').style.top = '-96px';
  }

  if (currentScrollPos > 0) {
    document.querySelector('#header').style.backgroundColor = bgColor;
  } else {
    document.querySelector('#header').style.backgroundColor = 'transparent';
  }

  prevScrollpos = currentScrollPos;
};
