var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var checkList = [];
var level = 0;
var myControl = true;

// KEYBOARD EVENTLISTENER:
$(document).keypress(function() {
    if (myControl) {
        level++;
        nextSequence();
    }
    myControl = false;
})

function nextSequence() {
    // step 1
    var randomNumber = Math.floor(Math.random() * 4);
    // step 2
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    // step 3
    $("#" + randomChosenColor).fadeOut().fadeIn().fadeOut().fadeIn();
    // step 4
    playSound(randomChosenColor);
    // step 5
    $("#level-title").text("Level " + level);
    // step 6
    userClickedPattern = [];
}

// BUTTON HANDLER FUNCTION:
$(".mybtn").click(function() {
    var userChosenColor = $(this).attr("id");
    playSound(userChosenColor);
    animatePressed(userChosenColor);
    userClickedPattern.push(userChosenColor);
    // check remembered sequence
    checkPatterns();
})

function playSound(btnID) {
    var audio = new Audio("sound/" + btnID + ".mp3");
    audio.play();
}

// BUTTON ANIMATE FUNCTION:
function animatePressed(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed"); 
    }, 100)
}

// MY VERSION OF GAME LOGIC:
function gameOver() {
    // game over effect
    $("#level-title").text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 300)
    // game renew
    gamePattern = [];
    userClickedPattern = [];
    checkList = [];
    myControl = true;
    level = 0;
}

function checkPatterns() {
    var counter = 0;
    for (var i = 0; i < userClickedPattern.length; i++) {
        if (userClickedPattern[i] == gamePattern[i]) {
            counter++;
            checkList.push("correct");
        }
        else {
            checkList.push("wrong");
        }
    }
    // logic
    if (counter == gamePattern.length && checkList.every(element => element === "correct")) {
        level++;
        $("#level-title").text("Level " + level);
        setTimeout(function() {
            nextSequence();
        }, 1000)
    }
    else if (checkList.includes("wrong")) {
        gameOver();
    }
}
