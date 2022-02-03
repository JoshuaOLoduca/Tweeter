/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {

  // variables are from global-elements.js

  const { toggleTweetCompose, getShouldFocus } = toggleTweetComposeWrapper();
  const newTweetHeight = $newTweetElm.outerHeight();

  configureElements();
  loadTweets();
  registerEventListeners();


  // configures elements to be animated later
  function configureElements() {
    $errorElm.css('display', 'none');
    $newTweetElm.css('display', 'none');
  }
  
  function registerEventListeners() {
    // on Navbar, when "write a new tweet"
    // is clicked, show/hide tweet compose
    $writeTweetElm.on("click", () => {
      toggleTweetCompose();
    });
  
    // scrolls user to compose tweet and focuses it
    // expands compose tweet if its not visible
    $scrollUpBtn.on("click", () => {
      if (!getShouldFocus()) {
        scrollToPostElm($('#new-tweet'), newTweetHeight);
        $inputHum.focus();
        return;
      }
      toggleTweetCompose();
    });
    
    // on scroll of webpage, check to see if navbar and scrollUpBtn should be visible or not
    $(window).scroll(function() {
      updateDynamicNavButtons();
    });
    
    // prevents form submit and uses ajax to send data
    $('.new-tweet form').on("submit", function(e) {

      e.preventDefault();
      const data = $(this).serialize();
      const tweet = data.split('=')[1].replaceAll('%20', ' ').trim();
      const charCounter = parseInt($charCounterElm.val());
      
      if (!tweet) {
        showError('No tweet to tweet');
        return;
      }
      if (charCounter < 0) {
        showError('Tweet is too long!');
        return;
      }
  
      postTweetAjax('/tweets/', data);
    });
  }

  // sends data to ajax and loads tweet when done
  function postTweetAjax(url, data) {
    $errorElm.slideUp("slow");

    $('#tweet-text').val('');
    $charCounterElm.val(140);

    $.ajax(url, {method: 'POST', data})
      .done(() => {
        loadLatestTweet();
      });
  }

  // on call, checks to see if navbar and scrollUpBtn should be visible or not
  function updateDynamicNavButtons() {
    const headerHeight = $('body header').outerHeight();
    const navHeight = $('nav').outerHeight();
    const $writeTweet = $('#write-tweet');

    if (window.pageYOffset > (headerHeight - navHeight)) {
      $scrollUpBtn.show();
      $writeTweet.hide();
      return;
    }
    $scrollUpBtn.hide();
    $writeTweet.show();
  }

  // creates tweet element for dom
  function createTweetElement(tweetInfo) {
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
  }

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

  // renders tweets in reverse-chronological order
  function renderTweets(tweets) {
    const $tweetContainer = $('#tweets')[0];
    for (const tweet of tweets) {
      $tweetContainer.append(createTweetElement(tweet));
    }
  }

  // sends ajax request to get tweets from in-memory db
  function loadTweets() {
    $.ajax('/tweets', { method: 'GET' })
      .done(result => renderTweets(result));
  }

  // gets latest tweet from database
  function loadLatestTweet() {
    $.ajax('/tweets', { method: 'GET' })
      .done(result => renderTweets([result[result.length - 1]]));
  }

  // shows error div (above compose tweet) with error message
  function showError(error) {
    $errorElm.children().text(error);
    $errorElm.slideDown("slow");

    setTimeout(() => {
      $errorElm.slideUp("slow");
    }, 10000);
  }

  // scrolls to element and leaves more headroom the bigger negativeOffset is
  function scrollToPostElm($elm, negativeOffset) {
    const endOfElm = $elm.position().top - negativeOffset;
    $('html, body').animate({
      scrollTop: endOfElm * .8
    }, 500);
  }

  // Wraps up toggleTweetCompose so it can have a bool for a closure
  function toggleTweetComposeWrapper() {
    let shouldFocus = true;

    const getShouldFocus = () => shouldFocus;

    // Shows/hides tweet composer and sets/removes focus of composer
    const toggleTweetCompose = () => {
      $newTweetElm.slideToggle('slow');

      if (shouldFocus) {
        scrollToPostElm($('#new-tweet'), newTweetHeight);

        $inputHum.focus();
        shouldFocus = false;
        return;
      }
      $inputHum.blur();
      shouldFocus = true;
    };
    return { toggleTweetCompose, getShouldFocus };
  }
});