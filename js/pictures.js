'use strict';
(function () {
  var AVATAR_MIN_NUM = 1;
  var AVATAR_MAX_NUM = 6;
  var DEBOUNCE_TIMEOUT = 500;
  var renderPhotos = function (photos) {
    var pictureElement = document.querySelector('.pictures');
    var similarPicturesTemplate = document.querySelector('#picture').content;
    var photoAdding = function (photoArr) {
      for (var j = 0; j < photoArr.length; j++) {
        var newPhoto = similarPicturesTemplate.cloneNode(true);
        newPhoto.querySelector('.picture__img').src = photoArr[j].url;
        newPhoto.querySelector('.picture__stat--likes').textContent = photoArr[j].likes;
        newPhoto.querySelector('.picture__stat--comments').textContent = photoArr[j].comments.length;
        pictureElement.appendChild(newPhoto);
      }
      var bigPictureElement = document.querySelector('.big-picture');
      var bigPictureElementLikes = bigPictureElement.querySelector('.likes-count');
      var bigPictureElementImg = bigPictureElement.querySelector('.big-picture__img img');
      var bigPictureElementCommentCount = bigPictureElement.querySelector('.comments-count');
      var commentElement = document.querySelector('.social__comments');
      var clickablePhotos = document.querySelectorAll('.picture__link');
      for (var p = 0; p < clickablePhotos.length; p++) {
        (function () {
          var currentPhotoElement = p;
          clickablePhotos[currentPhotoElement].addEventListener('click', function () {
            bigPictureElementImg.src = photoArr[currentPhotoElement].url;
            bigPictureElementLikes.textContent = photoArr[currentPhotoElement].likes;
            bigPictureElementCommentCount.textContent = photoArr[currentPhotoElement].comments.length;
            window.functions.removeOldComments();
            var fragment = document.createDocumentFragment();
            for (var z = 0; z < photoArr[currentPhotoElement].comments.length; z++) {
              var getAvatarNumber = window.functions.getRandom(AVATAR_MAX_NUM, AVATAR_MIN_NUM);
              var newComment = document.createElement('li');
              newComment.className = 'social__comment social__comment--text';
              newComment.innerHTML = '<img class="social__picture" src="img/avatar-' + getAvatarNumber + '.svg" alt="Аватар комментатора фотографии" width="35" height="35">' + photoArr[currentPhotoElement].comments[z];
              fragment.appendChild(newComment);
            }
            commentElement.appendChild(fragment);
            window.functions.popUpOpen(bigPictureElement, 'visually-hidden');
          });
          clickablePhotos[currentPhotoElement].addEventListener('keydown', function (evt) {
            if (evt.keyCode === window.ENTER_KEYCODE) {
              window.functions.popUpOpen(bigPictureElement, 'visually-hidden');
            }
          });
        })();
      }
      var pictureCloseButton = document.getElementById('picture-cancel');
      pictureCloseButton.addEventListener('click', function () {
        window.functions.popUpClose(bigPictureElement, 'visually-hidden');
      });
      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.ESC_KEYCODE) {
          window.functions.popUpClose(bigPictureElement, 'visually-hidden');
        }
      });
      pictureCloseButton.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.ENTER_KEYCODE) {
          window.functions.popUpClose(bigPictureElement, 'visually-hidden');
        }
      });
    };
    photoAdding(photos);
    var imgFilters = document.querySelector('.img-filters');
    imgFilters.classList.remove('img-filters--inactive');
    var buttonDefault = document.getElementById('filter-recomend');
    var lastTimeout;
    buttonDefault.addEventListener('click', function () {
      window.functions.removeOldPictures();
      window.functions.setActiveButton('filter-recomend');
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
        lastTimeout = null;
      }
      lastTimeout = window.setTimeout(function () {
        photoAdding(photos);
      }, DEBOUNCE_TIMEOUT);
    });
    var photosPopular = photos.slice();
    photosPopular.sort(function (first, second) {
      return second.likes - first.likes;
    });
    var buttonPopular = document.getElementById('filter-popular');
    buttonPopular.addEventListener('click', function () {
      window.functions.removeOldPictures();
      window.functions.setActiveButton('filter-popular');
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
        lastTimeout = null;
      }
      lastTimeout = window.setTimeout(function () {
        photoAdding(photosPopular);
      }, DEBOUNCE_TIMEOUT);
    });
    var photosComments = photos.slice();
    photosComments.sort(function (first, second) {
      return second.comments.length - first.comments.length;
    });
    var buttonComments = document.getElementById('filter-discussed');
    buttonComments.addEventListener('click', function () {
      window.functions.removeOldPictures();
      window.functions.setActiveButton('filter-discussed');
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
        lastTimeout = null;
      }
      lastTimeout = window.setTimeout(function () {
        photoAdding(photosComments);
      }, DEBOUNCE_TIMEOUT);
    });
    var photosRandom = photos.slice();
    var buttonRandom = document.getElementById('filter-random');
    buttonRandom.addEventListener('click', function () {
      window.functions.removeOldPictures();
      window.functions.setActiveButton('filter-random');
      photosRandom.sort(function () {
        return Math.random() - 0.5;
      });
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
        lastTimeout = null;
      }
      lastTimeout = window.setTimeout(function () {
        photoAdding(photosRandom);
      }, DEBOUNCE_TIMEOUT);
    });
  };
  var photos = [];
  var onLoad = function (data) {
    photos = data;
    renderPhotos(photos);
  };
  var onError = function (errorText) {
    window.functions.showError(errorText);
  };
  document.addEventListener('DOMContentLoaded', function () {
    window.requests.getData(onLoad, onError);
  });
}());
