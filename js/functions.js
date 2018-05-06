'use strict';
(function () {
  window.ESC_KEYCODE = 27;
  window.ENTER_KEYCODE = 13;
  window.functions = {
    popUpOpen: function (element, elementClass) {
      element.classList.remove(elementClass);
    },
    popUpClose: function (element, elementClass) {
      element.classList.add(elementClass);
    },
    getRandom: function (min, max) {
      var randomNum = Math.floor(Math.random() * (max - min)) + min;
      return randomNum;
    },
    showError: function (errorText) {
      var errorMessage = document.querySelector('.errorMessage');
      errorMessage.textContent = 'Ошибка: ' + errorText;
      errorMessage.style.display = 'flex';
      setTimeout(function () {
        errorMessage.style.display = 'none';
      }, 3000);
    },
    removeOldPictures: function () {
      var oldPictures = document.querySelectorAll('.picture__link');
      for (var o = 0; o < oldPictures.length; o++) {
        oldPictures[o].remove();
      }
    }
  };
})();
