var started = false;
var level = 0;
var col = ["red", "blue", "green", "yellow"];
var choosen = [];
var userpattern=[];

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    sequence();
    started = true;
  }
});

$(document).click(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    sequence();
    started = true;
  }
});

function sequence() {
  userpattern=[];
  level++;
  $("#level-title").text("Level " + level);
  var r = Math.floor(Math.random() * 4);

  $("#" + col[r]).fadeIn(100).fadeOut(100).fadeIn(100);
  choosen.push(col[r]);
  play(col[r])
}

function play(name) {
  var s = new Audio("sounds/" + name + ".mp3");
  s.play();
}
$(".btn").click(function() {
  var user = $(this).attr("id");
  userpattern.push(user);
  animatePress(user);
  play(user);
  checkAnswer(userpattern.length-1)
})
function checkAnswer(last){
  if(userpattern[last]===choosen[last]){
    if(userpattern.length===choosen.length){
      setTimeout(function () {
          sequence();
        }, 1000);
    }
  }
  else{
    play("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any key to restart");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function startOver(){
  level=0;
  choosen=[];
  started=false;
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
