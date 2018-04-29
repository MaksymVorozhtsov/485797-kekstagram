'use strict';
(function () {
  window.ESC_KEYCODE = 27;
  window.ENTER_KEYCODE = 13;
  window.popUpOpen = function (element, elementClass) {
    element.classList.remove(elementClass);
    return popUpOpen;
  };
  window.popUpClose = function (element, elementClass) {
    element.classList.add(elementClass);
    return popUpClose;
  };
  window.getRandom = function (min, max) {
    var randomNum = Math.floor(Math.random() * (max - min)) + min;
    return randomNum;
  };
})();
