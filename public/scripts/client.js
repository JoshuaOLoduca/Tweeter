/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {
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

  const showError = error => {
    $errorElm.children().text(error);
    $errorElm.slideDown("slow");

    setTimeout(() => {
    $errorElm.slideUp("slow");
    }, 10000)
  }

  const scrollToPostElm = $elm => {
    const endOfElm = $elm.outerHeight();
    $('html, body').animate({
      scrollTop: endOfElm
    }, 500);
  }

  let shouldFocus = true;
  const toggleTweetCompose = () => {
    $newTweetElm.slideToggle('slow')

    if (shouldFocus) {
      scrollToPostElm($('body header'));
      $inputHum.focus();
      shouldFocus = false;
      return;
    }
    $inputHum.blur();
    shouldFocus = true;
  }

  loadTweets()
  const $charCounterElm = $('output[name="counter"]')
  const $errorElm = $('#error')
  const $writeTweetElm = $('#write-tweet')
  const $newTweetElm = $('#new-tweet')
  const $inputHum = $('#tweet-text');
  const $scrollUp = $('.scroll-up-to-tweet');


  $errorElm.css('display', 'none')
  $newTweetElm.css('display', 'none')


  $writeTweetElm.on("click", e => {
    toggleTweetCompose();
  });
  $scrollUp.on("click", e => {

    scrollToPostElm($('body header'));
    if (!shouldFocus) {
      $inputHum.focus();
      return;
    }
    toggleTweetCompose();
  });
  
  $(window).scroll(function() {
    const headerHeight = $('body header').outerHeight();
    const $writeTweet = $('#write-tweet');

    if (window.pageYOffset > headerHeight) {
      $scrollUp.show();
      $writeTweet.hide();
      return;
    }
    $scrollUp.hide();
    $writeTweet.show();
  })
  
  $('.new-tweet form').on( "submit", function( e ) {
    e.preventDefault();

    const data = $(this).serialize()
    const tweet = data.split('=')[1];
    const charCounter = parseInt($charCounterElm.val());
    
    if (!tweet) {
      showError('No tweet to tweet')
      return;
    }
    if (charCounter < 0) {
      showError('Tweet is too long!')
      return;
    }

    $errorElm.slideUp("slow");

    $('#tweet-text').val('');
    $charCounterElm.val(140);

    $.ajax('/tweets/', {method: 'POST', data})
    .done(() => {
      loadLatestTweet();
    })
  })
})