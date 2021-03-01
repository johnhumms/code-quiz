var questions = [
    {
        question: "What is 1+1?",
        choices: ["1", "2", "3"],
        answer: "2"
    },
    {   question: "What is 2+2?",
        choices: ["4", "5", "6"],
        answer: "4"
    }
]

var currentQuestionIndex = 0;

function displayQuestion(q) {
    $("#questionsDiv").empty();
    console.log(currentQuestionIndex);
    var questionText = $("<h1></h1>").text(q.question);
    $("#questionsDiv").append(questionText)

    for (i=0; i<q.choices.length; i++) {
        var choiceBtn = $("<button></button>").text(q.choices[i]);
        choiceBtn.addClass("choice");
        choiceBtn.val(q.choices[i]);
        //choiceBtn.onclick = answerChoice;
        $("#questionsDiv").append(choiceBtn)
    }
}

$(document).on("click", ".choice", function(){
    //alert($(this).val());
    console.log($(this).val());
    var userChoice=$(this).val()
    answerChoice(userChoice);
});

function answerChoice(userChoice) {
    console.log("clicked");
    if(userChoice !== questions[currentQuestionIndex].answer) {
        console.log("wrong");
    } else {
        console.log("correct");
    }
    currentQuestionIndex++;
    displayQuestion(questions[currentQuestionIndex]);
}


function startQuiz() {
    $("#startQuizBtn").hide();

    displayQuestion(questions[currentQuestionIndex]);
}


$("#startQuizBtn").click(function() {
    startQuiz();
})