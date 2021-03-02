

var questions = [
    {
        question: "Who shot first?",
        choices: ["Greedo", "Han", "Luke"],
        answer: "Han"
    },
    {   question: "Who is Luke's Father?",
        choices: ["Darth Vader", "Jabba the Hutt", "Yoda"],
        answer: "Darth Vader"
    },
    {
        question: "What is the name of the ice planet from The Empire Strikes Back?",
        choices: ["Yavin", "Degobah", "Hoth"],
        answer: "Hoth"
    }
]

var currentQuestionIndex = 0;

//timer
var timeEl = document.querySelector(".time");

// Selects element by id
//var mainEl = document.getElementById("main");

var secondsLeft = 60;

var timerInterval;

function setTime() {
  // Sets interval in variable
  timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds left";

    if(secondsLeft <= 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to create and append image
      sendMessage();
    }
  }, 1000);
}

var score;

function sendMessage() {
    score = secondsLeft;
    clearInterval(timerInterval);
    timeEl.textContent = "You Scored: " + score + "!";
    $("#questionsDiv").empty();
    var heading = $("<h2></h2>").text("Enter your initials:  ");
    var input = $("<input id='initials'>");
    var button = $("<button id='save'>").text("Save");
    heading.append(input);
    heading.append(button);
    $("#main").append(heading);
}

var highScores = JSON.parse(localStorage.getItem("high scores")) || [];

$(document).on("click", "#save", function(){
    console.log($("#initials").val());

    var initials = $("#initials").val();
    var savedScore = {name:initials,
    score:score}
    highScores.push(savedScore);
    localStorage.setItem("high scores", JSON.stringify(highScores));
});

// make function for showing high scores (for loop to make separate divs)


function displayQuestion(q) {
    $("#questionsDiv").empty();
    console.log(currentQuestionIndex);
    var questionText = $("<h1></h1>").text(q.question);
    $("#questionsDiv").append(questionText)

    for (i=0; i<q.choices.length; i++) {
        var choiceBtn = $("<button></button>").text(q.choices[i]);
        choiceBtn.addClass("choice");
        choiceBtn.val(q.choices[i]);
        $("#questionsDiv").append(choiceBtn)
    }
}

$(document).on("click", ".choice", function(){
    console.log($(this).val());
    var userChoice=$(this).val()
    answerChoice(userChoice);
});

function answerChoice(userChoice) {
    console.log("clicked");
    if(userChoice !== questions[currentQuestionIndex].answer) {
        console.log("wrong");
        secondsLeft -= 10;
    } else {
        console.log("correct");
        secondsLeft += 10;
    }
    currentQuestionIndex++;
    
    if(currentQuestionIndex >= questions.length) {
        sendMessage()
    } else {
        displayQuestion(questions[currentQuestionIndex]);
    }
}

function startQuiz() {
    $("#startQuizBtn").hide();

    displayQuestion(questions[currentQuestionIndex]);
}

$("#startQuizBtn").click(function() {
    startQuiz();
    setTime();
})