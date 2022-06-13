const forms = document.querySelectorAll("form");

const message = {
	loading: "img/form/spinner.svg",
	success: "img/form/success.svg",
	error: "img/form/error.svg",
};

/**
 * Поиск всех форм и навешивание события отправки
 */
forms.forEach(form => {
	/**
	 * В прослушиватель также кроме события submit передаю конткретную HTML форму
	 */
	form.addEventListener('submit',(e)=> postData(e,form));
});

function postData(e,form) {
	/**
	 * Останавливаем дефолтное поведение обновления страницы и отправки данных на сервер
	 */
	e.preventDefault();

	/**
	 * Токен созданного бота
	 * @type {string}
	 */
	const token = '5515560924:AAGPqmW-9XHWkD7P_5s5RY-mZAiI8RFDmOU'

	/**
	 * ID бота из чата
	 * @type {string}
	 */
	const chat_id = '-728403851'

	/**
	 * Мод для парсера телеграма
	 * Возможные значения 'markdown', 'html'
	 * @type {string}
	 */
	const parse_mode = 'html'



	/**
	 * Базовый URL для отправки на сервер
	 * @type {string}
	 */
	const url = `https://api.telegram.org/bot${token}/sendMessage`


	/**
	 * Объект запроса
	 * @type {XMLHttpRequest}
	 */
	const request = new XMLHttpRequest();

	/**
	 * Открывается соединение с базовым URL'ом
	 */
	request.open("POST", url, true);

	/**
	 * Установка заголовков запроса
	 */
	request.setRequestHeader("Content-type", "application/json");


	/**
	 * Собираем данные с формы
	 * @type {FormData}
	 */
	const formData = new FormData(form);

	/**
	 * Результирующий массив
	 * @type {string[]}
	 */
	let textArray = [];

	/**
	 * Проходим по собранным данным с формы и закидываем в результирующий массив
	 */
	formData.forEach(function (value, key) {
		textArray.push(value);
	});

	/**
	 * Базовый темплейт ответа на основе результирующего массива
	 * @type {string}
	 */
	const formField ='<b>Имя:   </b> '+ '<i><u>' + textArray[0] + '</u></i>' + '\n\n' + "<b>Телефон:   </b> " + '<i><u>' + textArray[1] + '</u></i>'

	/**
	 * Идет проверка на наличия у формы аттрибута data-value-name
	 * При наличии устанавливает сначала имя формы затем вставляет базовый темплейт ответа, если его нет, только темплейт
	 * @type {string}
	 */
	const text = form.dataset.valueName ? form.dataset.valueName + '\n\n' + formField : formField;

	/**
	 * Идет парсинг объекта в строку
	 * @type {string}
	 */
	const body = JSON.stringify({
		chat_id,
		parse_mode,
		text
	})

	/**
	 * Отправка данных в телеграмм
	 */
	request.send(body);

	/**
	 * В отдельную переменную заношу потомков формы
	 */
	const formChildren = form.querySelector(".form");

	/**
	 * Ищу всплывашку из под формы
	 * @type {Element}
	 */
	const section = document.querySelector("#popupForm");

	/**
	 * Оболочка для статуса загрузки
	 * @type {HTMLDivElement}
	 */
	const loadWrapper = document.createElement("div");

	/**
	 * Img для отображения статуса загрузки
	 * @type {HTMLImageElement}
	 */
	const statusMessage = document.createElement("img");

	/**
	 * Изначально устанавливается индикатор загрузки
	 * @type {string}
	 */
	statusMessage.src = message.loading;

	/**
	 * Стили для статуса загрузки
	 *  в зависимости от наличия потомков устанавливаю направление флекс-контейнера
	 * @type {string}
	 */
	loadWrapper.style.cssText = `
               position:absolute;
               padding:10px;
               z-index:999;
               background:white;
               top:0;
               border-radius:20px;
               bottom:0;
               left:0;
               right:0;
               display:flex;
               flex-direction:${formChildren?'column': 'row'};
               gap:10px;
               justify-content:center;
               align-items:center;
        `;

	/**
	 * Стили для Img
	 * @type {string}
	 */
	statusMessage.style.cssText = `
               display: block;
               margin-bottom:9px;
        `;

	/**
	 * Далее идет добавление в форму статуса загрузки
	 */
	loadWrapper.append(statusMessage);
	form.append(loadWrapper);

	/**
	 * Прослушивание события загрузки
	 */
	request.addEventListener("load", () => {
		/**
		 * Если есть потомок с классом form то на саму форму добавляется класс form
		 * @type {string}
		 */
		if (formChildren) {
			form.classList.add("form");
		}

		/**
		 * Создается HTML элемент для отображения статуса ответа от сервера
		 * устанавливаются стили
		 * @type {HTMLHeadingElement}
		 */
		const messageTText = document.createElement("h2");
		messageTText.classList.add("form__title");


		/**
		 * Далее идут два варианта развития событий
		 */
		if (request.status === 200) {

			/**
			 * Если все хорошо в созданный текстовый узел вставляется текст с успешным запросом
			 * @type {string}
			 */
			messageTText.innerText = "Ваша заявка принята. Мы с Вами свяжемся";

			/**
			 * Далее идут два вложенных друг в друга таймера
			 * В первом Img заменяется картинка на успех и добавляется текст в статус загрузки
			 *
			 * Спустя пару секунд проваливаемся в следующий таймер
			 * который закрывает модалку если она была открыта и удаляет блок статуса загрузки
			 */
			setTimeout(() => {
				statusMessage.src = message.success;
				loadWrapper.append(messageTText);
				setTimeout(() => {
					section.classList.remove("popup--open");
					document.body.classList.remove('lock')
					setTimeout(() => {
						loadWrapper.remove();
					}, 1000);
				}, 2000);
			}, 2000);
		} else {

			/**
			 * Если все плохо в созданный текстовый узел добавляется текст провалом загрузки
			 * @type {string}
			 */
			messageTText.innerText = "Ошибка сервера. попробуйте позже";

			/**
			 * Таймеры работают по выше описанным принципам, исключение только в источнике для картинки
			 */
			setTimeout(() => {
				statusMessage.src = message.error;
				loadWrapper.append(messageTText);
				setTimeout(() => {
					section.classList.remove("popup--open");
					document.body.classList.remove('lock')
					setTimeout(() => {
						loadWrapper.remove();
					}, 1000);
				}, 2000);
			}, 2000);
		}

		/**
		 * после всего идет сброс формы
		 * удаление класса с формы
		 * восстановление видимости у полей формы
		 */
		form.reset();
		if (formChildren) {
			form.classList.remove("form");
			// formChildren.style.opacity = "1";
		}
	});
}
