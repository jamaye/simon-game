var buttonColors = ["red", "blue", "yellow", "green"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var counter = 0;



function nextSequence() {
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $('#' + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  return audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass('pressed');
  setTimeout(function() {
    $("#" + currentColor).removeClass('pressed');
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] !== gamePattern[currentLevel]) {
    playSound("wrong");
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass('game-over');
    setTimeout(function() {
      $("body").removeClass('game-over');
    }, 200);
    startOver();
  }
  if (currentLevel === (level - 1)) {
    setTimeout(function() {
      nextSequence();
      userClickedPattern = [];
      counter = 0;
    }, 1000);
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}

$(document).keydown(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});

$('.btn').click(function() {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length - 1); // Pass in index of their answer based off button
});
