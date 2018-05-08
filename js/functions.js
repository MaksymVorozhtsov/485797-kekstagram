'use strict';
(function () {
  var ERROR_POPUP_CLOSE_TIMEOUT = 3000;
  window.constants = {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13
  }
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
    removeOldComments: function () {
      var oldComments = document.querySelectorAll('.social__comment');
      for (var c = 0; c < oldComments.length; c++) {
        oldComments[c].remove();
      }
    },
    showError: function (errorText) {
      var errorMessage = document.querySelector('.errorMessage');
      errorMessage.textContent = 'Ошибка: ' + errorText;
      errorMessage.style.display = 'flex';
      setTimeout(function () {
        errorMessage.style.display = 'none';
      }, ERROR_POPUP_CLOSE_TIMEOUT);
    },
    removeOldPictures: function () {
      var oldPictures = document.querySelectorAll('.picture__link');
      oldPictures.forEach(function (oldPicture) {
        oldPicture.remove();
      });
    },
    setActiveButton: function (id) {
      var activeButtons = document.querySelectorAll('.img-filters__button');
      activeButtons.forEach(function (activeButton) {
        if (activeButton.classList.contains('img-filters__button--active')) {
          activeButton.classList.remove('img-filters__button--active');
        }
      });
      var activeButton = document.getElementById(id);
      activeButton.classList.add('img-filters__button--active');
    }
  };
})();
