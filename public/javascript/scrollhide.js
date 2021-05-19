window.addEventListener('load', (event) => {
    let prevScrollpos = window.pageYOffset;

    window.onscroll = () => {
        const currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            document.querySelector('#header').style.top = '0';
        } else {
            document.querySelector('#header').style.top = '-96px';
        }

        const bg = document.querySelector('.page-header');
        if (bg) {
            const bgColor = window.getComputedStyle(bg).backgroundColor;

            if (currentScrollPos > 0) {
                document.querySelector(
                    '#header'
                ).style.backgroundColor = bgColor;
            } else {
                document.querySelector('#header').style.backgroundColor =
                    'transparent';
            }
        }

        prevScrollpos = currentScrollPos;
    };
});
