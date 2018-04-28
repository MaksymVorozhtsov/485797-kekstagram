'use strict';
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var popUpOpen = function (element, elementClass) {
  element.classList.remove(elementClass);
};
var popUpClose = function (element, elementClass) {
  element.classList.add(elementClass);
};
