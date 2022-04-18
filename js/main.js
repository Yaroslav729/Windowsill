
// Меню бургер
const menuButton = document.querySelector('.navbarMenu-btn');
const menuBtn = document.querySelector('.navbarMenu-btn__line');
const menuNavbar = document.querySelector('.navbarMenu-left');
const menuBody = document.querySelector('.navbarMenu-left');
if (menuButton) {
    menuButton.addEventListener("click", function (e) {
        document.body.classList.toggle('lock')
        menuButton.classList.toggle('navbarMenu-btn--visible');
        menuBtn.classList.toggle('navbarMenu-btn__line--visible');
        menuNavbar.classList.toggle('navbarMenu-left--visible');
    });
}

// Прокрутка при клике

const menuLinks = document.querySelectorAll(".navbarMenu-left__menu[data-goto]");
if (menuLinks.length > 0) {
    menuLinks.forEach(menuLinks => {
        menuLinks.addEventListener("click", onMenuLinkClick);
    });

    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;
            if (menuButton.classList.contains('navbarMenu-btn--visible')) {
                document.body.classList.remove('lock')
                menuButton.classList.remove('navbarMenu-btn--visible');
                menuBtn.classList.remove('navbarMenu-btn__line--visible');
                menuNavbar.classList.remove('navbarMenu-left--visible');
            }
            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            e.preventDefault();
        }
    }
}

//------------------------------------------------------------------------

const filterBox = document.querySelectorAll('.box');

document.querySelector('.cover').addEventListener('click', event => {
    if (event.target.tagName !== 'LI') return false;

    let filterClass = event.target.dataset['f'];

    filterBox.forEach(elem => {
        elem.classList.remove('hide');
        if (!elem.classList.contains(filterClass) && filterClass !== 'all') {
            elem.classList.add('hide');
        }
    });
});

const swiper = new Swiper('.reviews-slider', {
    // Optional parameters
    loop: true,

    // If we need pagination
    pagination: {
        el: '.reviews-pagination',
    },

    // Количество слайдов для показа
    slidesPerView: 3,

    breakpoints: {
        1200: {
            slidesPerView: 3,
            spaceBetween: 27
        },
        992: {
            slidesPerView: 2,
        },
        319: {
            slidesPerView: 1,
            spaceBetween: 40,
        },
    },

    // Управление клавиатурой
    keyboard: {
        // Включить\выключить
        enabled: true,
        // Включить\выключить
        // только когда слайдер в пределах вьюпорта
        onlyInViewport: true,
        pageUpDown: true
    },

    autoplay: {
        delay: 5000,
    },

    // Отступ между слайдами
    spaceBetween: 30,
});


