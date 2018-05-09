'use strict';
(function () {
  var SLIDER_WIDTH = 450;
  var MAX_PERCENT = 100;
  var SIZE_100 = 100;
  var SIZE_50 = 50;
  var SIZE_25 = 25;
  var INVERT_MULTIPLY = 100;
  var BLUR_MULTIPLY = 3;
  var BRIGHTNESS_MULTIPLY = 3;
  var scaleElement = document.querySelector('.img-upload__scale');
  scaleElement.classList.add('visually-hidden');
  var imageUploadForm = document.querySelector('.img-upload__form');
  var imageUploadPopup = document.querySelector('.img-upload__overlay');
  var imageUploadInput = document.getElementById('upload-file');
  var hashtagInput = document.querySelector('.text__hashtags');
  var commentInput = document.querySelector('.text__description');
  var imageUploadPopupClose = document.getElementById('upload-cancel');
  imageUploadInput.addEventListener('change', function () {
    window.functions.popUpOpen(imageUploadPopup, 'hidden');
    imageUploadPopupClose.addEventListener('click', function () {
      window.functions.popUpClose(imageUploadPopup, 'hidden');
      imageUploadForm.reset();
      imageUploadPopupClose.removeEventListener('click', window.functions.popUpClose);
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.constants.ESC_KEYCODE && (document.activeElement !== commentInput && document.activeElement !== hashtagInput)) {
        window.functions.popUpClose(imageUploadPopup, 'hidden');
        imageUploadForm.reset();
        document.removeEventListener('keydown', window.functions.popUpClose);
      }
    });
    imageUploadPopupClose.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.constants.ENTER_KEYCODE) {
        window.functions.popUpClose(imageUploadPopup, 'hidden');
        imageUploadForm.reset();
        imageUploadPopupClose.removeEventListener('keydown', window.functions.popUpClose);
      }
    });
    imageUploadInput.removeEventListener('change', window.functions.popUpOpen);
  });
  var scalePin = document.querySelector('.scale__pin');
  var scaleLevel = document.querySelector('.scale__level');
  var imagePreview = document.querySelector('.img-upload__preview');
  var currentScale = 0;
  var currentFilter = 'none';
  var getCurrentFilter = function (scale, filter) {
    switch (filter) {
      case 'chrome':
        return 'grayscale(' + scale + ')';
      case 'sepia':
        return 'sepia(' + scale + ')';
      case 'marvin':
        return 'invert(' + (scale * INVERT_MULTIPLY) + '%)';
      case 'phobos':
        return 'blur(' + (scale * BLUR_MULTIPLY) + 'px)';
      case 'heat':
        return 'brightness(' + (scale * BRIGHTNESS_MULTIPLY) + ')';
      default:
        return 'none';
    }
  };
  var setFilter = function (scale, filter) {
    var style = getCurrentFilter(scale, filter);
    if (filter === 'none') {
      scaleElement.classList.add('visually-hidden');
    } else {
      scaleElement.classList.remove('visually-hidden');
    }
    imagePreview.style.filter = style;
  };
  var effectsElement = document.querySelector('.effects__list');
  effectsElement.addEventListener('change', function (evt) {
    currentFilter = evt.target.value;
    currentScale = 1;
    scalePin.style.left = SLIDER_WIDTH + 'px';
    scaleLevel.style.width = MAX_PERCENT + '%';
    setFilter(currentScale, currentFilter);
  });
  scalePin.addEventListener('mousedown', function (evt) {
    var startCoords = {
      x: evt.clientX
    };
    var onMouseMove = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX
      };
      startCoords = {
        x: moveEvt.clientX
      };
      var leftOffsetPin = scalePin.offsetLeft - shift.x;
      if (leftOffsetPin >= 0 && SLIDER_WIDTH >= leftOffsetPin) {
        currentScale = (leftOffsetPin / SLIDER_WIDTH);
        scalePin.style.left = leftOffsetPin + 'px';
        scaleLevel.style.width = (currentScale * MAX_PERCENT) + '%';
        setFilter(currentScale, currentFilter);
      }
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  var imageSizeValueField = document.querySelector('.resize__control--value');
  var imageSizeValue = SIZE_100;
  imageSizeValueField.value = imageSizeValue + '%';
  var imageSizePlusButton = document.querySelector('.resize__control--plus');
  var imageSizeMinusButton = document.querySelector('.resize__control--minus');
  var imagePreviewImg = document.querySelector('.img-upload__preview--img');
  imageSizeMinusButton.addEventListener('click', function () {
    if (imageSizeValue >= SIZE_50) {
      imageSizeValue = imageSizeValue - SIZE_25;
      var imageSizeValueScale = imageSizeValue / SIZE_100;
      imagePreviewImg.style.transform = 'scale(' + imageSizeValueScale + ')';
    } else {
      imageSizeValue = imageSizeValue - 0;
    }
    imageSizeValueField.value = imageSizeValue + '%';
  });
  imageSizePlusButton.addEventListener('click', function () {
    if (imageSizeValue < SIZE_100) {
      imageSizeValue = imageSizeValue + SIZE_25;
      var imageSizeValueScale = imageSizeValue / SIZE_100;
      imagePreviewImg.style.transform = 'scale(' + imageSizeValueScale + ')';
    } else {
      imageSizeValue = imageSizeValue + 0;
    }
    imageSizeValueField.value = imageSizeValue + '%';
  });
}());
