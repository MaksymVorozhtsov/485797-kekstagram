'use strict';
(function () {
  window.ESC_KEYCODE = 27;
  window.ENTER_KEYCODE = 13;
  window.popUpOpen = function (element, elementClass) {
    element.classList.remove(elementClass);
  };
  window.popUpClose = function (element, elementClass) {
    element.classList.add(elementClass);
  };
})();
