// const button = document.querySelector("body");
//
// function showConsole() {
//     console.log('Клик');
// }
//
// button.addEventListener("click", function (event){
//     if (event.target.closest('.button')){
//         showConsole();
//     }
// })

                         // Меню бургер
const menuButton = document.querySelector('.navbarMenu-btn');
const menuBtn = document.querySelector('.navbarMenu-btn__line');
const menuNavbar = document.querySelector('.navbarMenu-left');
const menuBody = document.querySelector('.navbarMenu-left');
if (menuButton){
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
        if (menuButton.classList.contains('navbarMenu-btn--visible')){
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

// modal slider

const modalSwiper = new Swiper('.modal-slider', {
    // Optional parameters
    loop: true,

    // If we need pagination
    pagination: {
        el: '.modal-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.modal-slider__button--next',
        prevEl: '.modal-slider__button--prev',
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
    spaceBetween: 10,
});

        //-----------Модальное окно----------------

const popupLinks = document.querySelectorAll(".popup-link");
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;
const timeout = 800;

if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener("click", function (e){
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault();
        });
    }
}

const popupCloseIcon = document.querySelectorAll(".close-popup");
if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener('click', function (e){
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}

function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
        const popupActive = document.querySelector('.popup');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        curentPopup.classList.add('popup--open');
        curentPopup.addEventListener("click", function (e) {
            if (!e.target.closest('.modal')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}
function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('popup--open');
        if (doUnlock) {
            bodyUnLock();
        }
    }
}
// function bodyLock() {
//     const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
//
//     for (let index = 0; index < lockPadding.length; index++) {
//         const el = lockPadding[index];
//         el.style.paddingRight = lockPaddingValue;
//     }
//     body.style.paddingRight = lockPaddingValue;
//     body.classList.add('lock');
//
//     unlock = false;
//     setTimeout(function () {
//         unlock = true;
//     }, timeout);
// }
//
// function bodyUnLock() {
//     setTimeout(function (){
// for (let index = 0; index < lockPadding.length; index++) {
//     const el = lockPadding[index];
//     el.style.paddingRight = '0px';
// }
// body.style.paddingRight = '0px';
// body.classList.remove('lock');
//     },timeout);
//
//     unlock = false;
//     setTimeout(function () {
//         unlock = true;
//     }, timeout);
// }
//
// document.addEventListener('keydown', function (e) {
//     if (e.which === 27) {
//         const popupActive = document.querySelector('.popup.open');
//         popupClose(popupActive);
//     }
// });