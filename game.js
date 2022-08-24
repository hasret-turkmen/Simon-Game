var buttonColors = ["top-left", "top-right", "bottom-left", "bottom-right"]; // colors
var gamePattern = []; //Keeps track of pattern
var userClickedPattern = []; // keeps track of user pattern
var level = 0; //starts at level 0
var highScore = 0; //high score is 0 at the beginning
var started = false; // did the user started playing or not


//TO START THE GAME
$(".startButton").click(function(){
  if(started === false){ // runs first time
    nextSequence(); // starts sequence;
    started = true;
    $(".startButton").hide(); // hides button when playing the game
  }
});

//Game continues
function nextSequence() {
  userClickedPattern = []; //clears user pattern
  level++;
  $("h1").text("Level " + level); //updates level
  var randomNumber = Math.floor( Math.random() * 4);
  var randomColor = buttonColors[randomNumber];
  gamePattern.push(randomColor);
  playPattern(); //for random patterns
}

//Plays random patterns
function playPattern() {
  var i = 0;
  const intervalId = setInterval(function() {
    $("#"+gamePattern[i]).fadeOut(100).fadeIn(100);
    i ++;
    if (i === gamePattern.length) {
        clearInterval(intervalId);
      }}, 1000);
}

//Event listener for buttons
$(".btn").click(function(event){
  if(started === true) { //If user started the game
    var userColour = this.id;
    userClickedPattern.push(userColour);  // adds to userPattern array
   animatePress(userColour);
    checkAnswer(userClickedPattern.length -1); // checks if correct pattern
  }
});


function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) { //if user is choosing the correct colors
    if(userClickedPattern.length === gamePattern.length){ //if the level is completed
      setTimeout(function() {
        nextSequence(); // wait one second and add to sequence
      },1000);
    }
  }
  else { // failed
    var sound = new Audio("sounds/wrong.mp3");
    sound.play(); // play wrong sound
    animateGameOver(); // animation for game ended
    $("h1").text("Game Over, Press Restart To Play Again");

// Sets highscore
    if(level > highScore){
      highScore = level -1;
      $("h3").text("High Score: " + highScore);
    }
// Sets highscore

    $(".startButton").text("Restart");
    startOver()
    $(".startButton").show();
  }
}

//clears the process
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

//when game is over
function animateGameOver() {
  $("body").addClass("game-over");  //adds this class so that we can change the colors etc on css
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
}

//Animates the buttons
function animatePress(currentButton){
  $("." + currentButton).addClass("pressed");  //adds this class so that we can change the colors etc. on css
  setTimeout(function(){
    $("." + currentButton).removeClass("pressed");
  }, 100);

}
