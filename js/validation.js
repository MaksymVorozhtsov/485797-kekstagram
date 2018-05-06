'use strict';
(function () {  
  var HASHTAGLENGTHLIMIT = 20;
  var HASHTAGCOUNTLIMIT = 5;
  var COMMENTLENGTHLIMIT = 140;
  var REDBORDER = '3px solid red';
  var NORMALBORDER = '3px solid transparent';
  var imageUploadForm = document.querySelector('.img-upload__form');
  window.hashtagInput = imageUploadForm.querySelector('.text__hashtags');
  window.commentInput = imageUploadForm.querySelector('.text__description');
  hashtagInput.addEventListener('input', function () {
    var hashtags = hashtagInput.value.split(' ');
    for (var h = 0; h < hashtags.length; h++) {
      var hashtagsValue = hashtags[h].toLowerCase();
      for (var hh = h + 1; hh < hashtags.length; hh++) {
      if (hashtags[hh].toLowerCase() === hashtagsValue && hh !== h) {
          hashtagInput.setCustomValidity('Хэштег не должен повторяться');
          hashtagInput.style.border = REDBORDER;
      } else if (hashtags[h] && hashtags[h][0] !== '#') {
          hashtagInput.setCustomValidity('Хэштег должен начинаться с #');
          hashtagInput.style.border = REDBORDER;
      } else if (hashtags.length > HASHTAGCOUNTLIMIT) {
          hashtagInput.setCustomValidity('Хэштегов не может быть больше пяти');
          hashtagInput.style.border = REDBORDER;
      } else if (hashtags[h].value === '#') {
          hashtagInput.setCustomValidity('Хэштег не может состоять из одной решетки');
          hashtagInput.style.border = REDBORDER;
      } else if (hashtags[h].length > HASHTAGLENGTHLIMIT) {
          hashtagInput.setCustomValidity('Хэштег не может быть длинее 20 символов');
          hashtagInput.style.border = REDBORDER;
      } else {
          hashtagInput.setCustomValidity('');
          hashtagInput.style.border = NORMALBORDER;
        }
      }
    }
  });
  commentInput.addEventListener('input', function () {
    if (commentInput.value.length > COMMENTLENGTHLIMIT) {
      commentInput.setCustomValidity('Длина комментария не может быть больше 140 символов');
      commentInput.style.border = REDBORDER;
    } else {
      commentInput.setCustomValidity('');
      commentInput.style.border = NORMALBORDER;
    }
  });
  imageUploadForm.addEventListener('submit', function (evt) {
    var onSend = function () {
      imageUploadPopup.classList.add('hidden');
    };
    var onError = function (errorText) {
      window.functions.showError(errorText);
    };
    window.requests.postData(new FormData(imageUploadForm), onSend, onError);
    evt.preventDefault();
  });
}());
