'use strict';
(function () {
  var DESCRIPTION_VERSIONS = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];
  var MIN_DESCRIPTION_NUMBER = 1;
  var MAX_DESCRIPTION_NUMBER = 6;
  var AVATAR_MIN_NUM = 1;
  var AVATAR_MAX_NUM = 6;
  var imgFilters = document.querySelector('.img-filters');
  var renderPhotos = function (photos) {
    var pictureElement = document.querySelector('.pictures');
    var similarPicturesTemplate = document.querySelector('#picture').content;
    for (var j = 0; j < photos.length; j++) {
      var newPhoto = similarPicturesTemplate.cloneNode(true);
      newPhoto.querySelector('.picture__img').src = photos[j].url;
      newPhoto.querySelector('.picture__stat--likes').textContent = photos[j].likes;
      newPhoto.querySelector('.picture__stat--comments').textContent = photos[j].comments.length;
      pictureElement.appendChild(newPhoto);
    }
    console.log('all img');
    imgFilters.classList.remove('img-filters--inactive');
    console.log('menu');
  }
  var photos = [];
  var onLoad = function(data) {
    photos = data;
    renderPhotos(photos);
  };
  document.addEventListener('DOMContentLoaded', function() {
    window.requests.getData(onLoad);
  });
  setTimeout(function () {
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
          bigPictureElementImg.src = photos[currentPhotoElement].url;
          bigPictureElementLikes.textContent = photos[currentPhotoElement].likes;
          bigPictureElementCommentCount.textContent = photos[currentPhotoElement].comments.length;
          var fragment = document.createDocumentFragment();
          for (var z = 0; z < photos[currentPhotoElement].comments.length; z++) {
            var getAvatarNumber = window.functions.getRandom(AVATAR_MAX_NUM, AVATAR_MIN_NUM);
            var newComment = document.createElement('li');
            newComment.className = 'social__comment social__comment--text';
            newComment.innerHTML = '<img class="social__picture" src="img/avatar-' + getAvatarNumber + '.svg" alt="Аватар комментатора фотографии" width="35" height="35">' + photos[currentPhotoElement].comments[z];
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
  }, 500);
}());
