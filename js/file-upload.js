'use strict';
(function () {
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
  var imagePreview = document.querySelector('.img-upload__preview');
  var imagePreviewDefaultClasses = imagePreview.classList.value;
  console.log(imagePreviewDefaultClasses);
  var addingFilter = function (filterClass) {
    imagePreview.classList.value = imagePreviewDefaultClasses;
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
  });
  filterChromeButton.addEventListener('click', function () {
    addingFilter('effects__preview--chrome');
  });
  filterSepiaButton.addEventListener('click', function () {
    addingFilter('effects__preview--sepia');
  });
  filterMarvinButton.addEventListener('click', function () {
    addingFilter('effects__preview--marvin');
  });
  filterPhobosButton.addEventListener('click', function () {
    addingFilter('effects__preview--phobos');
  });
  filterHeatButton.addEventListener('click', function () {
    addingFilter('effects__preview--heat');
  });
}());