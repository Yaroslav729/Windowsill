const forms = document.querySelectorAll('form');

const message = {
    loading: 'img/form/spinner.svg'
};

forms.forEach(item => {
    postData(item);
});

function postData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
               display: block;
               margin: 0 auto;
        `;
        form.append(statusMessage);

        const request = new XMLHttpRequest();
        request.open('POST', 'send.php');

        request.setRequestHeader('Content-type', 'application/json');
        const formData = new FormData(form);

        const object = {};
        formData.forEach(function (value, key) {
            object[key] = value;
        });

        const json = JSON.stringify(object);

        request.send(json);

        request.addEventListener('load', () => {
            if (request.status === 200) {
                console.log(request.response);
                swal("Спасибо!", "Скоро мы с вами свяжемся", "success");
                form.reset();
                setTimeout(() => {
                    statusMessage.remove();
                }, 2000);
            } else {
                swal("Ой!", "Что-то пошло не так...", "error");
            }
        });
    });
}

function showThanks(message) {

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('inputForm');
    thanksModal.innerHTML = `
    <div class="input">
    <div class="formText">${message}</div>
    </div>
`;

    document.querySelector('.form').append(thanksModal);
}


