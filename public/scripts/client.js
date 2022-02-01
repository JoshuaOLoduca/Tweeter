/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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

const loadTweets = () => {
  $.ajax('/tweets', { method: 'GET' })
  .done(result => renderTweets(result))
};

$(document).ready(() => {

  loadTweets()


  $('.new-tweet form').on( "submit", function( e ) {
    e.preventDefault();

    const data = $(this).serialize()
    const tweet = data.split('=')[1];

    const $charCounterElm = $('output[name="counter"]')
    const charCounter = parseInt($charCounterElm.val());
    
    if (!tweet) {
      alert('No tweet entered')
      return;
    }
    if (charCounter < 0) {
      alert('Tweet is too long!')
      return;
    }

    $('#tweet-text').val('');
    $charCounterElm.val(140);

    $.ajax('/tweets/', {method: 'POST', data})
    .done(() => {
      $('#tweets').empty();
      loadTweets();
    })
  })
})