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
  document.addEventListener('keydown', function(evt) {
    if (evt.keyCode === ESC_KEYCODE || evt.keyCode === ENTER_KEYCODE) {
      popUpClose(imageUploadPopup, 'hidden');
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
    if (filterClass != 'effects__preview--none') {
      scaleElement.classList.remove('visually-hidden');
    } else {
      scaleElement.classList.add('visually-hidden');
    }
    imagePreview.classList.add(filterClass);
  }
  var filterNoneButton = document.getElementById('effect-none');
  var filterChromeButton = document.getElementById('effect-chrome');
  var filterSepiaButton = document.getElementById('effect-sepia');
  var filterMarvinButton = document.getElementById('effect-marvin');
  var filterPhobosButton = document.getElementById('effect-phobos');
  var filterHeatButton = document.getElementById('effect-heat');
  filterNoneButton.addEventListener('click', function () {
    addingFilter('effects__preview--none');
    scalePin.addEventListener('mouseup', scalePinMouseup('effects__preview--none'));
  });
  filterChromeButton.addEventListener('click', function () {
    addingFilter('effects__preview--chrome');
    scalePin.addEventListener('mouseup', scalePinMouseup('effects__preview--chrome'));
  });
  filterSepiaButton.addEventListener('click', function () {
    addingFilter('effects__preview--sepia');
    scalePin.addEventListener('mouseup', scalePinMouseup('effects__preview--sepia'));
  });
  filterMarvinButton.addEventListener('click', function () {
    addingFilter('effects__preview--marvin');
    scalePin.addEventListener('mouseup', scalePinMouseup('effects__preview--marvin'));
  });
  filterPhobosButton.addEventListener('click', function () {
    addingFilter('effects__preview--phobos');
    scalePin.addEventListener('mouseup', scalePinMouseup('effects__preview--phobos'));
  });
  filterHeatButton.addEventListener('click', function () {
    addingFilter('effects__preview--heat');
    scalePin.addEventListener('mouseup', scalePinMouseup('effects__preview--heat'));
  });
}());