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
    }
  };
})();
