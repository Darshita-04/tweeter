$(document).ready(function() {
  $("#tweet-text").on("keyup", function(){   
    
    const counter = $(this).siblings(".compose-tweet-footer").find(".counter");
    const btnTweet = $(this).siblings(".compose-tweet-footer").find(".btn-tweet");
    const inputLength = $(this).val().length; // get length of input value     
    const maxLength = 140; // max character limit
    const remainingChar = maxLength - inputLength;
    counter.text(remainingChar);
    // highlight if char remaining is in -ve
    if (remainingChar < 0) {
      counter.addClass("error");
      btnTweet.attr("disabled",true);
    } else {
      counter.removeClass("error");
      btnTweet.attr("disabled",false);
    }
  })
});