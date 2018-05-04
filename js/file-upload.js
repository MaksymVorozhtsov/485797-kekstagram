'use strict';
(function () {
  var SLIDER_WIDTH = 450;
  var HASHTAGLENGTHLIMIT = 20;
  var HASHTAGCOUNTLIMIT = 5;
  var COMMENTLENGTHLIMIT = 140;
  var scaleElement = document.querySelector('.img-upload__scale');
  scaleElement.classList.add('visually-hidden');
  var imageUploadPopup = document.querySelector('.img-upload__overlay');
  var imageUploadInput = document.getElementById('upload-file');
  imageUploadInput.addEventListener('change', function () {
    window.functions.popUpOpen(imageUploadPopup, 'hidden');
  });
  var imageUploadPopupClose = document.getElementById('upload-cancel');
  imageUploadPopupClose.addEventListener('click', function () {
    window.functions.popUpClose(imageUploadPopup, 'hidden');
  });
  var imageUploadForm = document.querySelector('.img-upload__form');
  var hashtagInput = imageUploadForm.querySelector('.text__hashtags');
  var commentInput = imageUploadForm.querySelector('.text__description');
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.ESC_KEYCODE && (document.activeElement !== commentInput && document.activeElement !== hashtagInput)) {
      window.functions.popUpClose(imageUploadPopup, 'visually-hidden');
    }
  });
  imageUploadPopupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.ENTER_KEYCODE) {
      window.functions.popUpClose(imageUploadPopup, 'visually-hidden');
    }
  });
  var scalePin = document.querySelector('.scale__pin');
  var scaleLevel = document.querySelector('.scale__level');
  var imagePreview = document.querySelector('.img-upload__preview');
  var currentScale = 0;
  var currentFilter = 'none';
  var getCurrentFilter = function (scale, filter) {
    switch (filter) {
      case 'chrome': return 'grayscale(' + scale + ')';
      case 'sepia': return 'sepia(' + scale + ')';
      case 'marvin': return 'invert(' + (scale * 100) + '%)';
      case 'phobos': return 'blur(' + (scale * 3) + 'px)';
      case 'heat': return 'brightness(' + (scale * 3) + ')';
      default: return 'none';
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
    scaleLevel.style.width = '100%';
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
        scaleLevel.style.width = (currentScale * 100) + '%';
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
  var imageSizeValue = 100;
  imageSizeValueField.value = imageSizeValue + '%';
  var imageSizePlusButton = document.querySelector('.resize__control--plus');
  var imageSizeMinusButton = document.querySelector('.resize__control--minus');
  var imagePreviewImg = document.querySelector('.img-upload__preview--img');
  imageSizeMinusButton.addEventListener('click', function () {
    if (imageSizeValue >= 50) {
      imageSizeValue = imageSizeValue - 25;
      var imageSizeValueScale = imageSizeValue / 100;
      imagePreviewImg.style.transform = 'scale(' + imageSizeValueScale + ')';
    } else {
      imageSizeValue = imageSizeValue - 0;
    }
    imageSizeValueField.value = imageSizeValue + '%';
  });
  imageSizePlusButton.addEventListener('click', function () {
    if (imageSizeValue < 100) {
      imageSizeValue = imageSizeValue + 25;
      var imageSizeValueScale = imageSizeValue / 100;
      imagePreviewImg.style.transform = 'scale(' + imageSizeValueScale + ')';
    } else {
      imageSizeValue = imageSizeValue + 0;
    }
    imageSizeValueField.value = imageSizeValue + '%';
  });
  hashtagInput.addEventListener('input', function () {
    var hashtags = hashtagInput.value.split(' ');
    for (var h = 0; h < hashtags.length; h++) {
      var hashtagsValue = hashtags[h].toLowerCase();
      for (var hh = h + 1; hh < hashtags.length; hh++) {
        if (hashtags[hh].toLowerCase() === hashtagsValue && hh !== h) {
          hashtagInput.setCustomValidity('Хэштег не должен повторяться');
        } else if (hashtags[h] && hashtags[h][0] !== '#') {
          hashtagInput.setCustomValidity('Хэштег должен начинаться с #');
        } else if (hashtags.length > HASHTAGCOUNTLIMIT) {
          hashtagInput.setCustomValidity('Хэштегов не может быть больше пяти');
        } else if (hashtags[h].value === '#') {
          hashtagInput.setCustomValidity('Хэштег не может состоять из одной решетки');
        } else if (hashtags[h].length > HASHTAGLENGTHLIMIT) {
          hashtagInput.setCustomValidity('Хэштег не может быть длинее 20 символов');
        } else {
          hashtagInput.setCustomValidity('');
        }
      }
    }
  });
  commentInput.addEventListener('input', function () {
    if (commentInput.value.length > COMMENTLENGTHLIMIT) {
      commentInput.setCustomValidity('Длина комментария не может быть больше 140 символов');
    } else {
      hashtagInput.setCustomValidity('');
    }
  });
}());
