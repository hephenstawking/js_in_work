import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTImerId) {
    // forms 

    const forms = document.querySelectorAll(formSelector);

    const msg = {
        loading: 'img/form/spinner.svg',
        success: 'Success',
        failure: 'Error!'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) {
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
            // XML HTTP Request метод отправки
            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php');
            // request.setRequestHeader('Content-type', 'application/json');
            const formData = new FormData(form);
            // создаём обьект
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            // прогоняем форм дату, где каждый её ключ и значение помещаем в обьект
            // formData.forEach(function (value,key) {
            //    object[key] = value; 
            // });
            // преобразуем обьект для JSON
            // const json = JSON.stringify(object);
            // отправляем уже преобразованный обьект
            // request.send(json);
            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
            //         console.log(request.response);
            //         showThanksModal(msg.success);
            //         // сбросить форму
            //         form.reset();
            //          statusMsg.remove();
            //     } else {
            //         showThanksModal(msg.failure);
            //     }
            // });
            // Метод отправки fetch
            postData('http://localhost:3000/requests', json)
            // .then(data => data.text())
            .then(data => {
                console.log(data);
                showThanksModal(msg.success);
                statusMsg.remove();
            }).catch(() => {
                showThanksModal(msg.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTImerId);

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
            closeModal('.modal');
        }, 4000);
    }

    // fetch('https://jsonplaceholder.typicode.com/posts',{
    //     metod: "POST",
    //     body: JSON.stringify({name: 'Alex'}),
    //     headers: {
    //         'Content-type': 'application/json'
    //     }
    // })
    //     .then(response => response.json())
    //     .then(json => console.log(json));
    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));
}

export default forms;