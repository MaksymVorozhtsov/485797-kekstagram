'use strict';
(function () {
  var PINSTART = 440;
  var PINEND = 895;
  var scaleElement = document.querySelector('.img-upload__scale');
  scaleElement.classList.add('visually-hidden');
  var scaleValue = document.querySelector('.scale__value');
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
  var imagePreview = document.querySelector('.img-upload__preview');
  var imagePreviewDefaultClasses = imagePreview.classList.value;
  var addingFilter = function (filterClass) {
    scalePin.style.left = '100%';
    scaleValue.value = 100;
    imagePreview.classList.value = imagePreviewDefaultClasses;
    if (filterClass !== 'effects__preview--none') {
      scaleElement.classList.remove('visually-hidden');
    } else {
      scaleElement.classList.add('visually-hidden');
    }
    imagePreview.classList.add(filterClass);
    if (filterClass === 'effects__preview--chrome') {
      imagePreview.style.filter = 'grayscale(1)';
    } else if (filterClass === 'effects__preview--sepia') {
      imagePreview.style.filter = 'sepia(1)';
    } else if (filterClass === 'effects__preview--marvin') {
      imagePreview.style.filter = 'invert(100%)';
    } else if (filterClass === 'effects__preview--phobos') {
      imagePreview.style.filter = 'blur(3px)';
    } else if (filterClass === 'effects__preview--heat') {
      imagePreview.style.filter = 'brightness(3)';
    } else {
      imagePreview.style.filter = 'none';
      scaleValue.value = 0;
    }
  };
  var filterNoneButton = document.getElementById('effect-none');
  var filterChromeButton = document.getElementById('effect-chrome');
  var filterSepiaButton = document.getElementById('effect-sepia');
  var filterMarvinButton = document.getElementById('effect-marvin');
  var filterPhobosButton = document.getElementById('effect-phobos');
  var filterHeatButton = document.getElementById('effect-heat');
  var scalePinDrag = function (evt, filterClass) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX
      };
      startCoords = {
        x: moveEvt.clientX
      };
      if (startCoords.x < PINSTART) {
        startCoords.x = PINSTART;
        scalePin.style.left = 0 + '%';
      } else if (startCoords.x > PINEND) {
        startCoords.x = PINEND;
        scalePin.style.left = 100 + '%';
      } else {
        scalePin.style.left = (scalePin.offsetLeft - shift.x) + 'px';
      }
      var opacityLevel = (startCoords.x - PINSTART) / (PINEND - PINSTART);
      scaleValue.value = opacityLevel * 100;
      if (filterClass === 'effects__preview--chrome') {
        imagePreview.style.filter = 'grayscale(' + opacityLevel + ')';
      } else if (filterClass === 'effects__preview--sepia') {
        imagePreview.style.filter = 'sepia(' + opacityLevel + ')';
      } else if (filterClass === 'effects__preview--marvin') {
        var opacityLevelPerc = opacityLevel * 100;
        imagePreview.style.filter = 'invert(' + opacityLevelPerc + '%)';
      } else if (filterClass === 'effects__preview--phobos') {
        var opacityLevelBlur = opacityLevel * 3;
        imagePreview.style.filter = 'blur(' + opacityLevelBlur + 'px)';
      } else if (filterClass === 'effects__preview--heat') {
        var opacityLevelBrightness = opacityLevel * 3;
        imagePreview.style.filter = 'brightness(' + opacityLevelBrightness + ')';
      } else {
        imagePreview.style.filter = 'none';
        scaleValue.value = 0;
        opacityLevel = 0;
      }
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
  filterNoneButton.addEventListener('click', function () {
    addingFilter('effects__preview--none');
    scalePin.addEventListener('mousedown', function (evt) {
      scalePinDrag(evt, 'effects__preview--none');
    });
  });
  filterChromeButton.addEventListener('click', function () {
    addingFilter('effects__preview--chrome');
    scalePin.addEventListener('mousedown', function (evt) {
      scalePinDrag(evt, 'effects__preview--chrome');
    });
  });
  filterSepiaButton.addEventListener('click', function () {
    addingFilter('effects__preview--sepia');
    scalePin.addEventListener('mousedown', function (evt) {
      scalePinDrag(evt, 'effects__preview--sepia');
    });
  });
  filterMarvinButton.addEventListener('click', function () {
    addingFilter('effects__preview--marvin');
    scalePin.addEventListener('mousedown', function (evt) {
      scalePinDrag(evt, 'effects__preview--marvin');
    });
    scalePin.addEventListener('mousedown', function (evt) {
      scalePinDrag(evt, 'effects__preview--marvin');
    });
  });
  filterPhobosButton.addEventListener('click', function () {
    addingFilter('effects__preview--phobos');
    scalePin.addEventListener('mousedown', function (evt) {
      scalePinDrag(evt, 'effects__preview--phobos');
    });
  });
  filterHeatButton.addEventListener('click', function () {
    addingFilter('effects__preview--heat');
    scalePin.addEventListener('mousedown', function (evt) {
      scalePinDrag(evt, 'effects__preview--heat');
    });
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
  var HASHTAGLENGTHLIMIT = 20;
  var HASHTAGCOUNTLIMIT = 5;
  hashtagInput.addEventListener('input', function () {
    var hashtags = hashtagInput.value.split(' ');
    for (var h = 0; h < hashtags.length; h++) {
      for (var hh = h + 1; hh < hashtags.length; hh++) {
        if (hashtags[h] === hashtags[hh]) {
          hashtagInput.setCustomValidity('Хэштег не должен повторяться');
        }
      }
      if (hashtags[h] && hashtags[h][0] !== '#') {
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
  });
  var COMMENTLENGTHLIMIT = 140;
  commentInput.addEventListener('input', function () {
    if (commentInput.value.length > COMMENTLENGTHLIMIT) {
      commentInput.setCustomValidity('Длина комментария не может быть больше 140 символов');
    } else {
      hashtagInput.setCustomValidity('');
    }
  });
}());
