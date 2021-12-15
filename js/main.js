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

let menuButton = document.querySelector('.navbarMenu-btn');
menuButton.addEventListener('click', function (){
    console.log('Клик');
    document
        .querySelector('.navbarMenu-left')
        .classList.toggle('navbarMenu-left--visible');
});

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

const swiper = new Swiper('.swiper', {
    // Optional parameters
    loop: true,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
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