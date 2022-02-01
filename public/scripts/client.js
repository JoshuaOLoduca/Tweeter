/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = tweetInfo => {
  const tweet = $(`<article class="tweet">
    <header>
      <span><img src="${tweetInfo.user.avatars}">
      ${$('<p>').text(tweetInfo.user.name)[0].innerHTML}
      </span>
      <span class="handle">${tweetInfo.user.handle}</span>
    </header>
    ${$('<p>').text(tweetInfo.content.text)[0].outerHTML}
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

// Olderway of doing
// ${$('<p>').text(tweetInfo.content.text)[0].outerHTML}
// Used like so:
//    const safeHTML = `<p>${escape(textFromUser)}</p>`;
// 
// const escape = function (str) {
//   let div = document.createElement("div");
//   div.appendChild(document.createTextNode(str));
//   return div.innerHTML;
// };

const renderTweets = tweets => {
  const $tweetContainer = $('#tweets')[0];

  for (const tweet of tweets) {
    $tweetContainer.prepend(createTweetElement(tweet));
  }
}

const loadTweets = () => {
  $.ajax('/tweets', { method: 'GET' })
  .done(result => renderTweets(result))
};

const loadLatestTweet = () => {
  $.ajax('/tweets', { method: 'GET' })
  .done(result => renderTweets([result[result.length-1]]))
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
      loadLatestTweet();
    })
  })
})