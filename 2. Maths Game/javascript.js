window.onload = function() {
  var playing = false;
  var score;
  var action;
  var correctAnswer;
  var timeremaining;

  //if we click on the start/reset
  document.getElementById("startreset").onclick = function() {
    //if we are playing
    if (playing == true) {
      //reload page
      location.reload();
      //if we are not playing
    } else {
      playing = true;
      //set score to 0
      score = 0;
      document.getElementById("scorevalue").innerHTML = score;
      //show countdown box
      show("timeremaining");
      timeremaining = 60;
      document.getElementById("timeremainingvalue").innerHTML = timeremaining;
      //hide game over box
      hide("gameover");
      //change button to reset
      document.getElementById("startreset").innerHTML = "Reset Game";

      //start countdown
      startCountdown();

      //generate a new Q&A
      generateQA();
    }
  };

  for (i = 1; 1 < 5; i++) {
    document.getElementById("box" + i).onclick = function() {
      //check if we are playing
      if (playing == true) {
        if (this.innerHTML == correctAnswer) {
          //correct answer
          //increase score by 1
          score++;
          document.getElementById("scorevalue").innerHTML = score;
          //hide wrong box & show correct box
          hide("wrong");
          show("correct");
          setTimeout(function() {
            hide("correct");
          }, 1000);
          //generate new Q&A
          generateQA();
        } else {
          //wrong answer
          hide("correct");
          show("wrong");
          setTimeout(function() {
            hide("wrong");
          }, 1000);
        }
      }
    };
  }

  //functions
  //start counter
  function startCountdown() {
    action = setInterval(function() {
      timeremaining--;
      document.getElementById("timeremainingvalue").innerHTML = timeremaining;
      if (timeremaining == 0) {
        stopCountdown();
      }
    }, 1000);
  }

  //stop the counter
  function stopCountdown() {
    clearInterval(action);
    show("gameover");
    document.getElementById("gameover").innerHTML =
      "<p>Game over!</p><p>Your score is " + score + "</p>";
    hide("timeremaining");
    hide("correct");
    hide("wrong");
    playing = false;
    document.getElementById("startreset").innerHTML = "Start Game";
  }

  //hide an element
  function hide(Id) {
    document.getElementById(Id).style.display = "none";
  }

  //show an element
  function show(Id) {
    document.getElementById(Id).style.display = "block";
  }

  //generate question and multiple answers
  function generateQA() {
    var x = Math.round(Math.random() * 9) + 1;
    var y = Math.round(Math.random() * 9) + 1;

    var selection = Math.round(Math.random() * 3) + 1;
    switch (selection) {
      case 1:
        {
          correctAnswer = x * y;
          document.getElementById("question").innerHTML = x + "x" + y;
          var correctPosition = Math.round(Math.random() * 3) + 1;
          //fill one box with correct answer
          document.getElementById(
            "box" + correctPosition
          ).innerHTML = correctAnswer;
          //fill other boxes with wrong answers
          var answers = [correctAnswer];
          for (i = 1; i < 5; i++) {
            if (i != correctPosition) {
              var wrongAnswer;
              do {
                wrongAnswer =
                  (Math.round(Math.random() * 9) + 1) *
                  (Math.round(Math.random() * 9) + 1);
              } while (answers.indexOf(wrongAnswer) > -1);
              document.getElementById("box" + i).innerHTML = wrongAnswer;
              answers.push(wrongAnswer);
            }
          }
        }
        break;
      case 2:
        {
          correctAnswer = x + y;
          document.getElementById("question").innerHTML = x + "+" + y;
          var correctPosition = Math.round(Math.random() * 3) + 1;
          //fill one box with correct answer
          document.getElementById(
            "box" + correctPosition
          ).innerHTML = correctAnswer;
          //fill other boxes with wrong answers
          var answers = [correctAnswer];
          for (i = 1; i < 5; i++) {
            if (i != correctPosition) {
              var wrongAnswer;
              do {
                wrongAnswer =
                  Math.round(Math.random() * 9) +
                  1 +
                  (Math.round(Math.random() * 9) + 1);
              } while (answers.indexOf(wrongAnswer) > -1);
              document.getElementById("box" + i).innerHTML = wrongAnswer;
              answers.push(wrongAnswer);
            }
          }
        }
        break;
      case 3:
        {
          correctAnswer = x - y;
          document.getElementById("question").innerHTML = x + "-" + y;
          var correctPosition = Math.round(Math.random() * 3) + 1;
          //fill one box with correct answer
          document.getElementById(
            "box" + correctPosition
          ).innerHTML = correctAnswer;
          //fill other boxes with wrong answers
          var answers = [correctAnswer];
          for (i = 1; i < 5; i++) {
            if (i != correctPosition) {
              var wrongAnswer;
              do {
                wrongAnswer =
                  Math.round(Math.random() * 9) +
                  1 -
                  (Math.round(Math.random() * 9) + 1);
              } while (answers.indexOf(wrongAnswer) > -1);
              document.getElementById("box" + i).innerHTML = wrongAnswer;
              answers.push(wrongAnswer);
            }
          }
        }
        break;
      case 4:
        {
          var temp01 = x / y;
          correctAnswer = temp01.toFixed(2);
          document.getElementById("question").innerHTML = x + ":" + y;
          var correctPosition = Math.round(Math.random() * 3) + 1;
          //fill one box with correct answer
          document.getElementById(
            "box" + correctPosition
          ).innerHTML = correctAnswer;
          //fill other boxes with wrong answers
          var ansewrs = [correctAnswer];
          for (i = 1; i < 5; i++) {
            if (i != correctPosition) {
              var wrongAnswer;
              var temp02;
              do {
                temp02 =
                  (Math.round(Math.random() * 9) + 1) /
                  (Math.round(Math.random() * 9) + 1);
                wrongAnswer = temp02.toFixed(2);
              } while (ansewrs.indexOf(wrongAnswer) > -1);
              document.getElementById("box" + i).innerHTML = wrongAnswer;
              ansewrs.push(wrongAnswer);
            }
          }
        }
        break;
      default:
        window.alert("I do not recognize this");
    }
  }
};
