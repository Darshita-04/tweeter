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
    for(let tweet of tweets) { // loops through tweets
      $('#tweets-container').append(createTweetElement(tweet)); // calls createTweetElement for each tweet & takes return value and appends it to the tweets container
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
                      <div class="created_at">${object.created_at}</div>
                      <div class="tweet-options">
                        <a href="#"><i class="fa-solid fa-flag"></i></a>
                        <a href="#"><i class="fa-solid fa-retweet"></i></a>
                        <a href="#"><i class="fa-solid fa-heart"></i></a>
                      </div>
                    </footer>
                  </article>`;

    return $tweet;
  }

  renderTweets(data);
})