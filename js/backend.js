'use strict';
(function () {
  var SERVER_RESPONSE_TIMEOUT = 10000;
  window.requests = {
    getData: function (onLoad, onError) {
      var URL = 'https://js.dump.academy/kekstagram/data';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        var errorText;
        switch (xhr.status) {
          case 200:
            onLoad(xhr.response);
            break;
          case 400:
            errorText = 'Неверный запрос';
            break;
          case 401:
            errorText = 'Пользователь не авторизован';
            break;
          case 404:
            errorText = 'Ничего не найдено';
            break;
          case 500:
            errorText = 'Неверный адрес сервера';
            break;
          default:
            onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
        if (errorText) {
          onError(errorText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
      xhr.timeout = SERVER_RESPONSE_TIMEOUT;
      xhr.open('GET', URL);
      xhr.send();
    },
    postData: function (data, onLoad, onError) {
      var URL = 'https://js.dump.academy/kekstagram';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        var errorText;
        switch (xhr.status) {
          case 200:
            onLoad();
            errorText = '';
            break;
          case 400:
            errorText = 'Неверный запрос';
            break;
          case 401:
            errorText = 'Пользователь не авторизован';
            break;
          case 404:
            errorText = 'Ничего не найдено';
            break;
          case 500:
            errorText = 'Неверный адрес сервера';
            break;
          default:
            errorText = 'Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText;
        }
        if (errorText) {
          onError(errorText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Неуспешное выполнение запроса. Попробуйте обновить страницу и повторить запрос');
      });
      xhr.addEventListener('timeout', function () {
        onError('Время ожидания соединения исктекло.');
      });
      xhr.timeout = window.SERVER_RESPONSE_TIMEOUT;
      xhr.open('POST', URL);
      xhr.send(data);
    }
  };
})();
