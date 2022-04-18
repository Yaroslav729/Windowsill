// Валидация

const form = document.querySelector('.form')
const formName = document.querySelectorAll('form input[type=text]')
const formPhone = document.querySelectorAll('form input[type=tel]')

for (let i = 0; i < formName.length; i++) {
    formName[i].addEventListener('input', () => {
        formName[i].value = formName[i].value.replace(/[^а-яА-ЯЁё\-\s]/g, "")
    })
}

for (let i = 0; i < formPhone.length; i++) {
    formPhone[i].addEventListener('input', () => {
        formPhone[i].value = formPhone[i].value.replace(/[^0-9()\-]/, "")
    })
}



