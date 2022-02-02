// for composer-char-counter.js
// AND client.js
const $charCounterElm = $('output[name="counter"]');
const $inputHum = $('#tweet-text');

// For composer-char-counter.js
const charCounter = parseInt($charCounterElm.val());
const charCounterColour = $charCounterElm.css('color');

// for client.js
const $errorElm = $('#error');
const $writeTweetElm = $('#write-tweet');
const $newTweetElm = $('#new-tweet');
const $scrollUpBtn = $('.scroll-up-to-tweet');