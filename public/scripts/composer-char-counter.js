$(document).ready(function() {
  
  // variables are from global-elements.js

  // on input, update tweet limit tracker
  $inputHum.on("input",() => {
    const curHumLength = $inputHum.val().length;
    const newVal = charCounter - curHumLength;

    $charCounterElm.val(newVal);

    // if we are negitive, change colour to red
    if (newVal < 0) {
      $charCounterElm.css('color', 'red');
      return;
    }
    // otherwise, restore color
    $charCounterElm.css('color', charCounterColour);
  });
});