'use strict';
(function () {
  var AVATAR_MIN_NUM = 1;
  var AVATAR_MAX_NUM = 6;
  var DEBOUNCE_TIMEOUT = 500;
  var renderPhotos = function (photos) {
    var pictureElement = document.querySelector('.pictures');
    var similarPicturesTemplate = document.querySelector('#picture').content;
    var photoAdding = function (photoArr) {
      photoArr.forEach(function (photoArrElem) {
        var newPhoto = similarPicturesTemplate.cloneNode(true);
        newPhoto.querySelector('.picture__img').src = photoArrElem.url;
        newPhoto.querySelector('.picture__stat--likes').textContent = photoArrElem.likes;
        newPhoto.querySelector('.picture__stat--comments').textContent = photoArrElem.comments.length;
        pictureElement.appendChild(newPhoto);
      });
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
            var commentFragment = document.createDocumentFragment();
            photoArr[currentPhotoElement].comments.forEach(function (thisComments) {
              var getAvatarNumber = window.functions.getRandom(AVATAR_MAX_NUM, AVATAR_MIN_NUM);
              var newComment = document.createElement('li');
              newComment.className = 'social__comment social__comment--text';
              newComment.innerHTML = '<img class="social__picture" src="img/avatar-' + getAvatarNumber + '.svg" alt="Аватар комментатора фотографии" width="35" height="35">' + thisComments;
              commentFragment.appendChild(newComment);
            });
            commentElement.appendChild(commentFragment);
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
    var switchFilter = function (photoArr, id) {
      window.functions.removeOldPictures();
      window.functions.setActiveButton(id);
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
        lastTimeout = null;
      }
      var lastTimeout = window.setTimeout(function () {
        photoAdding(photoArr);
      }, DEBOUNCE_TIMEOUT);
    };
    var buttonDefault = document.getElementById('filter-recomend');
    buttonDefault.addEventListener('click', function () {
      switchFilter(photos, 'filter-recomend');
    });
    var photosPopular = photos.slice();
    photosPopular.sort(function (first, second) {
      return second.likes - first.likes;
    });
    var buttonPopular = document.getElementById('filter-popular');
    buttonPopular.addEventListener('click', function () {
      switchFilter(photosPopular, 'filter-popular');
    });
    var photosComments = photos.slice();
    photosComments.sort(function (first, second) {
      return second.comments.length - first.comments.length;
    });
    var buttonComments = document.getElementById('filter-discussed');
    buttonComments.addEventListener('click', function () {
      switchFilter(photosComments, 'filter-discussed');
    });
    var photosRandom = photos.slice();
    var buttonRandom = document.getElementById('filter-random');
    buttonRandom.addEventListener('click', function () {
      photosRandom.sort(function () {
        return Math.random() - 0.5;
      });
      switchFilter(photosRandom, 'filter-random');
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
