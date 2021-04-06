let prevScrollpos = window.pageYOffset;
window.onscroll = () => {
  const currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.querySelector('#navbar').style.top = '0';
  } else {
    document.querySelector('#navbar').style.top = '-4rem';
  }

  if (currentScrollPos > 0) {
    document.querySelector('#navbar').style.backgroundColor = 'red';
  } else {
    document.querySelector('#navbar').style.backgroundColor = 'transparent';
  }

  prevScrollpos = currentScrollPos;
};
