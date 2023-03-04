var gamePattern = [];
var userClickedPattern = [];
var btnColors = ["red", "blue", "green", "yellow"];
var level = 0;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = btnColors[randomNumber];
  gamePattern.push(randomChosenColor);

  playSound(randomChosenColor);
  animatePress(randomChosenColor);
  //adding event listener
  animatePress(randomChosenColor);
}
// nextSequence();

$(".btn").click(function () {
  if (level) {
    var userChosenColour = $(this).attr("id");
    // console.log(id);
    userClickedPattern.push(userChosenColour);
    if (userChosenColour != gamePattern[userClickedPattern.length - 1]) {
      game_over();
      return;
    }
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    if (userClickedPattern.length == level) {
      level++;
      $("h1").text("Level " + level);
      userClickedPattern = [];
      setTimeout(nextSequence, 1000);
    }
  } //end  outer if
});

function playSound(name) {
  //initializing audio
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

$(document).keydown(function () {
  if (!level) {
    $("h1").text("Level 1");
    nextSequence();
    level++;
  }
});

// $(document).click(function () {
//   if (!level) {
//     $("h1").text("Level 1");
//     nextSequence();
//     level++;
//   }
// });

function game_over() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  $('body').addClass('game-over');
  $("h1").text("Game over! Press a Key to Start");
  var over = new Audio("sounds/game-over.wav");
  over.play();
  setTimeout(function() {
    $('body').removeClass('game-over');
  }, 100);
}
