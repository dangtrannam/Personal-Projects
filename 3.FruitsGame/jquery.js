var playing = false;
var score;
var trialsleft;
var fruits = [
  "apple",
  "banana",
  "cherries",
  "grapes",
  "mango",
  "orange",
  "peach",
  "pear",
  "watermelon"
];
var step;
var action;
$(function() {
  //click on start reset button
  $("#startreset").click(function() {
    if (playing == true) {
      //reload page
      location.reload();
    } else {
      //we are not playing
      playing = true; // game initiated
      //set score to 0
      score = 0; //set score to 0
      $("#scorevalue").html(score);
      //show trials left
      $("#trialsleft").show();
      trialsleft = 3;
      addHeart();
      //change button text to reset game
      $("#startreset").html("Reset Game");

      //start sending fruits
      startAction();
    }
  });

  //slice fruit
  $("#fruit1").mouseover(function() {
    score++;
    $("#scorevalue").html(score); //update score
    $("#slicesound")[0].play(); //play sound

    //stop fruit
    clearInterval(action);

    //hide fruit
    $("#fruit1").hide("explode", 500);

    //send new fruit
    setTimeout(startAction, 800);
  });

  function addHeart() {
    $("#trialsleft").empty();
    for (i = 0; i < trialsleft; i++) {
      $("#trialsleft").append('<img src="images/heart.png" class="life">');
    }
  }

  //start sending fruits
  function startAction() {
    //generate a fruit
    $("#fruit1").show();
    chooseFruit(); //choose a random fruit
    $("#fruit1").css({ left: Math.round(550 * Math.random()), top: -50 }); //random position
    //generate a random step
    step = Math.round(5 * Math.random()) + 1; //change step

    //Move fruit down by 1 step every 10ms
    action = setInterval(function() {
      //move fruit down by 1 step
      $("#fruit1").css("top", $("#fruit1").position().top + step);

      //check if the fruit is too low
      if ($("#fruit1").position().top > $("#fruitsContainer").height()) {
        //check if we have trials left
        if (trialsleft > 1) {
          //generate a fruit
          $("#fruit1").show();
          chooseFruit(); //choose a random fruit
          $("#fruit1").css({ left: Math.round(550 * Math.random()), top: -50 }); //random position
          //generate a random step
          step = Math.round(5 * Math.random()) + 1; //change step

          //reduce trials by 1
          trialsleft--;

          //populate triasleft box
          addHeart();
        } else {
          //game over
          // playing = false;  // we are not playing anymore //failed code here
          $("#startreset").html("Start Game");
          $("#gameOver").show();
          $("#gameOver").html(
            "<p>Game Over!</p><p>Your score is: " + score + "</p>"
          );
          stopAction();
          $("#trialsleft").hide();
        }
      }
    }, 10);
  }

  //generate a random fruit
  function chooseFruit() {
    $("#fruit1").attr(
      "src",
      "images/" + fruits[Math.round(8 * Math.random())] + ".png"
    );
  }

  //stop  dropping fruits
  function stopAction() {
    clearInterval(action);
    $("#fruit1").hide();
  }
});
