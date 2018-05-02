'use strict';
(function () {
  var scaleElement = document.querySelector('.img-upload__scale');
  scaleElement.classList.add('visually-hidden');
  var scaleValue = document.querySelector('.scale__value');
  var imageUploadPopup = document.querySelector('.img-upload__overlay');
  var imageUploadInput = document.getElementById('upload-file');
  imageUploadInput.addEventListener('change', function () {
    popUpOpen(imageUploadPopup, 'hidden');
  });
  var imageUploadPopupClose = document.getElementById('upload-cancel');
  imageUploadPopupClose.addEventListener('click', function () {
    popUpClose(imageUploadPopup, 'hidden');
  });
  document.addEventListener('keydown', function (evt) {
    if (document.activeElement !== commentInput) {
      if (document.activeElement !== hashtagInput) {
        if (evt.keyCode === ESC_KEYCODE) {
          popUpClose(imageUploadPopup, 'visually-hidden');
        }
      }
    }
  });
  imageUploadPopupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      popUpClose(imageUploadPopup, 'visually-hidden');
    }
  });
  var scalePin = document.querySelector('.scale__pin');
  var scalePinMouseup = function (filterClass) {
    var opacityLevel = 0.2;
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
      opacityLevel = 0;
    }
    scaleValue.value = opacityLevel * 100;
  };
  var imagePreview = document.querySelector('.img-upload__preview');
  var imagePreviewDefaultClasses = imagePreview.classList.value;
  var addingFilter = function (filterClass) {
    imagePreview.classList.value = imagePreviewDefaultClasses;
    if (filterClass !== 'effects__preview--none') {
      scaleElement.classList.remove('visually-hidden');
    } else {
      scaleElement.classList.add('visually-hidden');
    }
    imagePreview.classList.add(filterClass);
  };
  var filterNoneButton = document.getElementById('effect-none');
  var filterChromeButton = document.getElementById('effect-chrome');
  var filterSepiaButton = document.getElementById('effect-sepia');
  var filterMarvinButton = document.getElementById('effect-marvin');
  var filterPhobosButton = document.getElementById('effect-phobos');
  var filterHeatButton = document.getElementById('effect-heat');
  filterNoneButton.addEventListener('click', function () {
    addingFilter('effects__preview--none');
    scalePin.addEventListener('mouseup', function () {
      scalePinMouseup('effects__preview--none');
    });
  });
  filterChromeButton.addEventListener('click', function () {
    addingFilter('effects__preview--chrome');
    scalePin.addEventListener('mouseup', function () {
      scalePinMouseup('effects__preview--chrome');
    });
  });
  filterSepiaButton.addEventListener('click', function () {
    addingFilter('effects__preview--sepia');
    scalePin.addEventListener('mouseup', function () {
      scalePinMouseup('effects__preview--sepia');
    });
  });
  filterMarvinButton.addEventListener('click', function () {
    addingFilter('effects__preview--marvin');
    scalePin.addEventListener('mouseup', function () {
      scalePinMouseup('effects__preview--marvin');
    });
  });
  filterPhobosButton.addEventListener('click', function () {
    addingFilter('effects__preview--phobos');
    scalePin.addEventListener('mouseup', function () {
      scalePinMouseup('effects__preview--phobos');
    });
  });
  filterHeatButton.addEventListener('click', function () {
    addingFilter('effects__preview--heat');
    scalePin.addEventListener('mouseup', function () {
      scalePinMouseup('effects__preview--heat');
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
  var imageUploadForm = document.querySelector('.img-upload__form');
  var hashtagInput = imageUploadForm.querySelector('.text__hashtags');
  hashtagInput.addEventListener('input', function (evt) {
    var hashtags = hashtagInput.value.split(' ');
    for (var h = 0; h < hashtags.length; h++) {
      for (var hh = h+1; hh < hashtags.length; hh++) {
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
  var commentInput = imageUploadForm.querySelector('.text__description');
  commentInput.addEventListener('input', function (evt) {
    if (commentInput.value.length > COMMENTLENGTHLIMIT) {
      commentInput.setCustomValidity('Длина комментария не может быть больше 140 символов');
    } else {
        hashtagInput.setCustomValidity('');
    }
  });






}());
