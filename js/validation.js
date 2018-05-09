'use strict';
(function () {
  var HASHTAG_LENGTH_LIMIT = 20;
  var HASHTAG_COUNT_LIMIT = 5;
  var COMMENT_LENGTH_LIMIT = 140;
  var RED_BORDER = '3px solid red';
  var NORMAL_BORDER = '3px solid transparent';
  var hashtagInput = document.querySelector('.text__hashtags');
  var commentInput = document.querySelector('.text__description');
  hashtagInput.addEventListener('input', function () {
    var hashtags = hashtagInput.value.split(' ');
    for (var h = 0; h < hashtags.length; h++) {
      var hashtagsValue = hashtags[h].toLowerCase();
      for (var hh = h + 1; hh < hashtags.length; hh++) {
        if (hashtags[hh].toLowerCase() === hashtagsValue && hh !== h) {
          hashtagInput.setCustomValidity('Хэштег не должен повторяться');
          hashtagInput.style.border = RED_BORDER;
        } else if (hashtags[h] && hashtags[h][0] !== '#') {
          hashtagInput.setCustomValidity('Хэштег должен начинаться с #');
          hashtagInput.style.border = RED_BORDER;
        } else if (hashtags.length > HASHTAG_COUNT_LIMIT) {
          hashtagInput.setCustomValidity('Хэштегов не может быть больше пяти');
          hashtagInput.style.border = RED_BORDER;
        } else if (hashtags[h].value === '#') {
          hashtagInput.setCustomValidity('Хэштег не может состоять из одной решетки');
          hashtagInput.style.border = RED_BORDER;
        } else if (hashtags[h].length > HASHTAG_LENGTH_LIMIT) {
          hashtagInput.setCustomValidity('Хэштег не может быть длинее 20 символов');
          hashtagInput.style.border = RED_BORDER;
        } else {
          hashtagInput.setCustomValidity('');
          hashtagInput.style.border = NORMAL_BORDER;
        }
      }
    }
  });
  commentInput.addEventListener('input', function () {
    if (commentInput.value.length > COMMENT_LENGTH_LIMIT) {
      commentInput.setCustomValidity('Длина комментария не может быть больше 140 символов');
      commentInput.style.border = RED_BORDER;
    } else {
      commentInput.setCustomValidity('');
      commentInput.style.border = NORMAL_BORDER;
    }
  });
  var imageUploadPopup = document.querySelector('.img-upload__overlay');
  var imageUploadForm = document.querySelector('.img-upload__form');
  imageUploadForm.addEventListener('submit', function (evt) {
    var onSend = function () {
      window.functions.popUpClose(imageUploadPopup, 'hidden');
      imageUploadForm.reset();
    };
    var onError = function (errorText) {
      window.functions.showError(errorText);
    };
    window.requests.postData(new FormData(imageUploadForm), onSend, onError);
    evt.preventDefault();
  });
}());
