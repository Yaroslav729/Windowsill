<?php

/* ============================= */
/* ОТПРАВКА ПИСЬМА ЗАКАЗА В TELEGRAM */
/*функция для создания запроса на сервер Telegram */
/* ============================= */
function parser($url){
	$curl = curl_init();
	curl_setopt($curl, CURLOPT_URL, $url);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	$result = curl_exec($curl);
	if($result == false){     
		echo "Ошибка отправки запроса: " . curl_error($curl);
		return false;
	}
	else{
		return true;
	}
}
/* ============================= */
/* ============================= */

/* ============================= */
/* ОТПРАВКА СООБЩЕНИЕ В ТЕЛЕГРАММ */
/* ============================= */
function orderSendTelegram($message) {
	/*токен который выдаётся при регистрации бота */
	$token = "5553843567:AAG-Qfyww4wOv_oF3kwqfCirU1CARXDB7r8";
	/*идентификатор группы*/
	$chat_id = "-667383171";


	/*делаем запрос*/
	parser("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$message}");
}
/* ============================= */
/* ============================= */

/* ============================= */
/* ОБРАБОТЧИК ДЛЯ ФОРМЫ В НИЖНЕЙ ЧАСТИ ЭКРАНА */
/* ============================= */
if($_POST) {
	$name = $_POST["name"];
	$phone = $_POST["phone"];

	$textMessage = "СООБЩЕНИЕ ИЗ ФОРМЫ GOLDEN-LINK\n";
	$textMessage .= "Имя:  ".$name."\n";
	$textMessage .= "Телефон:  ".$phone."\n";
	orderSendTelegram($textMessage);
}

// $token = "5553843567:AAG-Qfyww4wOv_oF3kwqfCirU1CARXDB7r8";
// $chat_id = "-667383171";

// $values = $hook->getValues();

// #Получаем название формы
// // $formName = $modx->getOption('formName', $formit->config, 'form-'.$modx->resource->get('id'));

// #Получаем ip адрес отправителя
// // $ip = $modx->getOption('REMOTE_ADDR', $_SERVER, '');

// #Данные с формы
// $name = $values['name-zv'];
// $phone = $values['phone-zv'];

// #Создаем массив
// $arr = array(
// "Имя" => $name,
// "Телефон" => $phone,
// // "Название формы" => $formName,
// // "Айпи" => $ip
// );

// /*Цикл по массиву (собираем сообщение) */
// foreach($arr as $key => $value) { 
//      $txt .= "<b>".$key."</b>: ".$value."%0A"; 
//   }

// #Отправляем сообщение
// $fp=fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&text={$txt}","r");

// #Возвращаем true
// return true;