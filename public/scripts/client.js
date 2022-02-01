/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const template = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1643494518506
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1643580918506
  }
]

const createTweetElement = tweetInfo => {
  const tweet = $(`<article class="tweet">
    <header>
      <span><img src="${tweetInfo.user.avatars}">${tweetInfo.user.name}</span>
      <span class="handle">${tweetInfo.user.handle}</span>
    </header>
    <p>${tweetInfo.content.text}</p>
    <footer>
      <time>${timeago.format(new Date(tweetInfo.created_at))}</time>
      <span>
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </span>
    </footer>
  </article>`);

  return tweet[0];
};

const renderTweets = tweets => {
  const $tweetContainer = $('#tweets')[0];

  for (const tweet of tweets) {
    $tweetContainer.append(createTweetElement(tweet));
  }
}

$(document).ready(() => {
  renderTweets(template);
})