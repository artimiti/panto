const infoBtns = document.querySelectorAll('.info-dot');
const infoHints = document.querySelectorAll('.info-hint');

// клик по кнопкам с подсказками
for (let btn of infoBtns) {
    btn.addEventListener('click', function (e) {
        e.stopPropagation();
        // скрыть все хинты
        for (let hint of infoHints) {
            hint.classList.add('none');
        }
        // показать текущий хинт
        this.parentNode.querySelector('.info-hint').classList.toggle('none');
    });
}

// закрываем подскащки при клику по всему документу
document.addEventListener('click', function () {
    for (let hint of infoHints) {
        hint.classList.add('none');
    }
});


// запрещаем всплытие события клика при клике на подсказке
for (let hint of infoHints) {
    hint.addEventListener('click', (e) => e.stopPropagation());
}








// swiper slider
const swiper = new Swiper('.swiper', {

    loop: true,
    freeMode: true,

    slidesPerView: 1,
    spaceBetween: 42,

    breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        920: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1230: {
          slidesPerView: 4,
          spaceBetween: 42,
        },
      },

    navigation: {
        nextEl: '#sliderNext',
        prevEl: '#sliderPrev',
    },

});





// tabs

const tabsBtns = document.querySelectorAll('[data-tab]');
const tabsProducts = document.querySelectorAll('[data-tab-value]');


for (let btn of tabsBtns) {

    btn.addEventListener('click', function () {


        // убираем актмвные классы у всех кнопок
        for (let btn of tabsBtns) {
            btn.classList.remove('tab-controls__btn--active');
        }

        // добавляем активгые класс к текущей кнопке
        this.classList.add('tab-controls__btn--active');

        // получаем значение категории товаов которые нужно включить и отображаем нужные товары
        for (let product of tabsProducts){


            // проверка на отображение всех слайдов
            if (this.dataset.tab === 'all'){

                product.classList.remove('none');

            } else {

                if (product.dataset.tabValue === this.dataset.tab){

                    product.classList.remove('none');
    
                } else {
                
                    product.classList.add('none');
    
                }
            }
        }

        // апдейт свайпера после удаления карточек
        swiper.update()

    });
}

// mobile navigation

const mobileNavOpenBtn = document.querySelector('#open-mobile-nav-btn');
const mobileNavCloseBtn = document.querySelector('#close-mobile-nav-btn');
const mobileNav = document.querySelector('#mobile-nav');

mobileNavOpenBtn.onclick = function(){
    mobileNav.classList.add('mobile-nav-wrapper--open')
}

mobileNavCloseBtn.onclick = function(){
    mobileNav.classList.remove('mobile-nav-wrapper--open')
}




// перевод
const languageSwitcher = document.querySelector('.language-switcher');
const enButton = document.querySelector('#en');
const ruButton = document.querySelector('#ru');
const elementsToTranslate = document.querySelectorAll('[data-translate]');

enButton.style.display = 'none';
ruButton.style.display = 'block';

function loadLanguage(lang) {
    fetch(`locales/${lang}.json`)
        .then(response => response.json())
        .then(translations => {
            elementsToTranslate.forEach(element => {
                const key = element.getAttribute('data-translate');
                if (translations[key]) {
                    element.innerText = translations[key];
                }
            });
        })
        .catch(error => console.error('Error loading language file:', error));
}

// Загрузка английского языка по умолчанию
loadLanguage('en');

languageSwitcher.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const lang = event.target.id;
        if (lang === 'en') {
            // Hide English button, show Russian button
            enButton.style.display = 'none';
            ruButton.style.display = 'block';
          } else if (lang === 'ru') {
            // Hide Russian button, show English button
            enButton.style.display = 'block';
            ruButton.style.display = 'none';
          }
        loadLanguage(lang);
    }
});