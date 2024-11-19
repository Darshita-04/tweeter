/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function(){

  // Fake data taken from initial-tweets.json
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const renderTweets = function(tweets) {
    $('#tweets-container').empty(); // clear the tweet container
    for(let tweet of tweets) { // loops through tweets
      $('#tweets-container').prepend(createTweetElement(tweet)); // calls createTweetElement for each tweet & takes return value and appends it to the tweets container
    }    
  }


  const createTweetElement = function(object) {
    let $tweet = `<article class="tweet">
                    <header>
                      <div class="user-profile">
                        <img src="${object.user.avatars}" alt="${object.user.name}" class="user-avatar">
                        <span class="user-name">${object.user.name}</span>
                      </div>
                      <a class="user-handle" href="#">${object.user.handle}</a>
                    </header>
                    <div class="tweet-body">
                      <p>${object.content.text}</p>
                    </div>
                    <footer>
                      <div class="created_at">${timeago.format(object.created_at)}</div>
                      <div class="tweet-options">
                        <a href="#"><i class="fa-solid fa-flag"></i></a>
                        <a href="#"><i class="fa-solid fa-retweet"></i></a>
                        <a href="#"><i class="fa-solid fa-heart"></i></a>
                      </div>
                    </footer>
                  </article>`;

    return $tweet;
  }

  //renderTweets(data);

  // form validation

  const isTweetValid = function(input) {
    if (!input) {
      // Tweet is empty
      alert('Error: Your tweet cannot be empty!');
      return false;
    }

    if (input.length > 140) {
      // Tweet exceeds max length
      alert('Error: Your tweet is too long! Maximum 140 characters allowed.');
      return false;
    }

    return true;
  }

  // adding new tweet (form submission) 

  $("#newTweet").on("submit", function(e){

    // to prevent loading the page on form submit
    e.preventDefault();

    // get tweet content
    const tweetContent = $('#tweet-text').val().trim();

    // validate the tweet

    if (!isTweetValid(tweetContent)) {
      return;
    }
    // serialize form data
    const formData = $(this).serialize();

    // send data via AJAX POST
    $.ajax({
      url: '/tweets/', // Replace with your endpoint
      type: 'POST',
      data: formData,
      success: function (response) {
        // Handle success
        $('#tweet-text').val("");
        console.log(JSON.stringify(response));
        loadtweets();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        // Handle error
        alert('Error:', textStatus, errorThrown);
      }
    });
  })

  // Fetching tweets 

  const loadtweets = function() {
    $.ajax({
      url: '/tweets/', // Replace with your endpoint
      type: 'GET',
      success: function (response) {
        // Handle success
        renderTweets(response);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        // Handle error
        alert('Error:', textStatus, errorThrown);
      }
    });
  }

  loadtweets();
})