'use strict';
(function () {
  var NUMBER_OF_PHOTOS = 25;
  var MIN_LIKES_NUMBER = 15;
  var MAX_LIKES_NUMBER = 200;
  var DESCRIPTION_VERSIONS = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];
  var MIN_DESCRIPTION_NUMBER = 1;
  var MAX_DESCRIPTION_NUMBER = 6;
  var COMMENTS_VERSIONS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var MIN_COMMENT_TEXT_NUMBER = 1;
  var MAX_COMMENT_TEXT_NUMBER = 6;
  var MIN_COMMENT_NUMBER = 1;
  var MAX_COMMENT_NUMBER = 2;
  var AVATAR_MIN_NUM = 1;
  var AVATAR_MAX_NUM = 6;
  var photos = [];
  var getRandom = function (min, max) {
    var randomNum = Math.floor(Math.random() * (max - min)) + min;
    return randomNum;
  };
  var comments = [];
  var getRandomComments = function (randomCommentsNum, randomCommentsVersion) {
    for (var i = 0; i < randomCommentsNum; i++) {
      comments[i] = COMMENTS_VERSIONS[randomCommentsVersion];
    }
    return comments;
  };
  for (var i = 0; i < NUMBER_OF_PHOTOS; i++) {
    var randomDescriptionNum = getRandom(MIN_DESCRIPTION_NUMBER, MAX_DESCRIPTION_NUMBER);
    var randomDescription = DESCRIPTION_VERSIONS[randomDescriptionNum];
    var randomCommentsNum = getRandom(MIN_COMMENT_NUMBER, MAX_COMMENT_NUMBER);
    var randomCommentsVersion = getRandom(MIN_COMMENT_TEXT_NUMBER, MAX_COMMENT_TEXT_NUMBER);
    comments = getRandomComments(randomCommentsNum, randomCommentsVersion);
    photos[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandom(MIN_LIKES_NUMBER, MAX_LIKES_NUMBER),
      comments: comments,
      description: randomDescription
    };
  }
  var pictureElement = document.querySelector('.pictures');
  var similarPicturesTemplate = document.querySelector('#picture').content;
  for (var j = 0; j < photos.length; j++) {
    var newPhoto = similarPicturesTemplate.cloneNode(true);
    newPhoto.querySelector('.picture__img').src = photos[j].url;
    newPhoto.querySelector('.picture__stat--likes').textContent = photos[j].likes;
    newPhoto.querySelector('.picture__stat--comments').textContent = photos[j].comments.length;
    pictureElement.appendChild(newPhoto);
  }
  var bigPictureElement = document.querySelector('.big-picture');
  var clickablePhotos = document.querySelectorAll('.picture__link');
  for (var p = 0; p < clickablePhotos.length; p++) {
    var clickablePhotoElement = (function () {
      var currentPhotoElement = p;
      clickablePhotos[currentPhotoElement].addEventListener('click', function () {
        bigPictureElement.querySelector('.big-picture__img img').src = photos[currentPhotoElement].url;
        bigPictureElement.querySelector('.likes-count').textContent = photos[currentPhotoElement].likes;
        bigPictureElement.querySelector('.comments-count').textContent = photos[currentPhotoElement].comments.length;
        var commentElement = document.querySelector('.social__comments');
        var fragment = document.createDocumentFragment();
        for (var z = 0; z < photos[currentPhotoElement].comments.length; z++) {
          var getAvatarNumber = getRandom(AVATAR_MAX_NUM, AVATAR_MIN_NUM);
          var newComment = document.createElement('li');
          newComment.className = 'social__comment social__comment--text';
          newComment.innerHTML = '<img class="social__picture" src="img/avatar-' + getAvatarNumber + '.svg" alt="Аватар комментатора фотографии" width="35" height="35">' + photos[currentPhotoElement].comments[z];
          fragment.appendChild(newComment);
        }
        commentElement.appendChild(fragment);
        popUpOpen(bigPictureElement, 'visually-hidden');
      });
      clickablePhotos[currentPhotoElement].addEventListener('keydown', function (evt) {
        if (evt.keyCode === ENTER_KEYCODE) {
          popUpOpen(bigPictureElement, 'visually-hidden');
        }
      });
    })();
  }
  var pictureCloseButton = document.getElementById('picture-cancel');
  pictureCloseButton.addEventListener('click', function () {
    popUpClose(bigPictureElement, 'visually-hidden');
  });
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE || evt.keyCode === ENTER_KEYCODE) {
      popUpClose(bigPictureElement, 'visually-hidden');
    }
  });
}());
