$(document).ready(function() {
  // --- our code goes here ---
  const $charCounterElm = $('output[name="counter"]')
  const charCounter = parseInt($charCounterElm.val());
  const $inputHum = $('#tweet-text');

  $inputHum.on("input",(event) => {
    const curHumLength = $inputHum.val().length;
    $charCounterElm.val(charCounter - curHumLength);
  });
});