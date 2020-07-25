"use strict";
window.addEventListener('DOMContentLoaded', () => {
    // Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // Timer
    const deadLine = '2020-08-24';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            //   получаем кол-во дней
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              //   получаем кол-во часов, вычитая дни
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              //   получаем кол-во минут, вычитая часы и дни
              minutes = Math.floor((t / 1000 / 60) % 60),
              //   получаем кол-во секунд, вычитая минуты часы и дни
              seconds = Math.floor((t / 1000) % 60);

              return {
                'total': t,
                'days':days,
                'hours':hours,
                'minutes':minutes,
                'seconds':seconds
              };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

              updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadLine);

    // modal
    const modalTImerId = setTimeout(openModal, 50000);

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        // modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTImerId);
      }
    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');

          modalTrigger.forEach(btn => {
            btn.addEventListener('click', openModal);
          });

          function closeModal() {
            modal.classList.remove('show');
            modal.classList.add('hide');
            document.body.style.overflow = '';
          }
                    
          modal.addEventListener('click', (e) => {
            //   если клик на подложку ИЛИ на элемент, что имеет атрибут data-close, то закрываем модальное окно
            if (e.target === modal || e.target.getAttribute('data-close') == '') {
                closeModal();
            }
          });

          document.addEventListener('keydown', (e) => {
            if (e.code === "Escape" && modal.classList.contains('show')) {
                closeModal();
            }
          });


          function showModalByScroll() {
            // проверка на то, если прокрутка окна была равна всей длине сайта, 
            // тоесть долистали до конца, то вызываем модалку
            if (window.pageYOffset + document.documentElement.clientHeight  >= document.documentElement.scrollHeight) {
                openModal();
                // убираем модалку, после первого появления
                window.removeEventListener('scroll', showModalByScroll);
            } 
          }

          window.addEventListener('scroll', showModalByScroll);

        //   используем классы для карточек
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = +this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    // const div = new MenuCard();
    // div.render();
    // запись ниже аналогична двум строкам выше
    // так можно писать, если нужно использовать только 1 раз
    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        '8.5',
        '.menu .container'
    ).render();
    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        '21',
        '.menu .container',
        'menu__item'
    ).render();
    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню “Постное”',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        '16',
        '.menu .container',
        'menu__item'
    ).render();

    // forms 

    const forms = document.querySelectorAll('form');

    const msg = {
        loading: 'img/form/spinner.svg',
        success: 'Success',
        failure: 'Error!'
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMsg = document.createElement('img');
            statusMsg.src = msg.loading;
            statusMsg.style.cssText = `
                display: block;
                margin 0 auto;
            `;
            // form.append(statusMsg);
            form.insertAdjacentElement('afterend', statusMsg);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            request.setRequestHeader('Content-type', 'application/json');
            const formData = new FormData(form);
            // создаём обьект
            const object = {};
            // прогоняем форм дату, где каждый её ключ и значение помещаем в обьект
            formData.forEach(function (value,key) {
               object[key] = value; 
            });
            // преобразуем обьект для JSON
            const json = JSON.stringify(object);
            // отправляем уже преобразованный обьект
            request.send(json);

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    showThanksModal(msg.success);
                    // сбросить форму
                    form.reset();
                } else {
                    showThanksModal(msg.failure);
                }
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content"> 
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }
});