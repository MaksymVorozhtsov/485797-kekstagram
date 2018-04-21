(function () {
  var photos = [];
  var getRandom = function (min, max) {
    var randomLikes = Math.floor(Math.random() * (max - min)) + min;
    return randomLikes;
  };
  var descriptionVersions = {
    1: 'Тестим новую камеру!',
    2: 'Затусили с друзьями на море',
    3: 'Как же круто тут кормят',
    4: 'Отдыхаем...',
    5: 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    6: 'Вот это тачка!'
  };
  var getRandomDescription = function (min, max) {
    var randomDescriptionNum = Math.floor(Math.random() * (max - min)) + min;
    var randomDescription = descriptionVersions[randomDescriptionNum];
    return randomDescription;
  };
  var comments = [];
  var commentsVersions = {
    1: 'Всё отлично!',
    2: 'В целом всё неплохо. Но не всё.',
    3: 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    4: 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    5: 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    6: 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  };
  var getRandomComments = function (maxNum, minNum, maxVer, minVer) {
    var randomCommentsNum = Math.floor(Math.random() * (maxNum - minNum)) + minNum;
    for (var i = 0; i < randomCommentsNum; i++) {
      var randomCommentsVersion = Math.floor(Math.random() * (maxVer - minVer)) + minVer;
      comments[i] = commentsVersions[randomCommentsVersion];
    };
    return comments;
  };
  for (var i = 0; i < 25; i++) {
    photos[i] = {
      url: 'photos/' + (i + 1)  + '.jpg',
      likes: getRandom(15, 200),
      comments: getRandomComments(1, 3, 1, 6),
      description: getRandomDescription(1, 6)
    };
  };
  var pictureElement = document.querySelector('.pictures');
  var similarPicturesTemplate = document.querySelector('#picture').content;
  for (var j = 0; j < photos.length; j++) {
    var newPhoto = similarPicturesTemplate.cloneNode(true);
    newPhoto.querySelector('.picture__img').src = photos[j].url;
    newPhoto.querySelector('.picture__stat--likes').textContent = photos[j].likes;
    newPhoto.querySelector('.picture__stat--comments').textContent = photos[j].comments.length;
    pictureElement.appendChild(newPhoto);
  };
  var bigPictureElement = document.querySelector('.big-picture');
  bigPictureElement.querySelector('.big-picture__img img').src = photos[0].url;
  bigPictureElement.querySelector('.likes-count').textContent = photos[0].likes;
  bigPictureElement.querySelector('.comments-count').textContent = photos[0].comments.length;
  var commentElement = document.querySelector('.social__comments');
  var similarCommentsTemplate = document.querySelector('#comment').content;
  var AVATAR_MIN_NUM = 1;
  var AVATAR_MAX_NUM = 6;
  for (var z = 0; z < photos[0].comments.length; z++) {
    var newComment = similarCommentsTemplate.cloneNode(true);
    newComment.querySelector('.social__comment span').textContent = photos[0].comments[z];
    var getAvatarNumber = Math.floor(Math.random() * (AVATAR_MAX_NUM - AVATAR_MIN_NUM)) + AVATAR_MIN_NUM;
    newComment.querySelector('.social__picture').src = 'img/avatar-' + getAvatarNumber + '.svg';
    commentElement.appendChild(newComment);
  };
})()