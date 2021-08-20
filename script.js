// array of objects containing questions.
var questions = [

    {
        question : "The attribute used to define a new namespace is",
        options : ["XMLNS",
        "XmlNameSpace",
        "Xmlns",
        "XmlNs"
        ],
        right_answer : "Xmlns"
    },

    {
        question : "What is full form of css",
        options : ["Javascript",
        "Java",
        "HTML",
        "None of these"
        ],
        right_answer : "None of these"
    },

    {
        question : "Which of the following attribute can hold the JavaScript version",
        options : ["Language",
        "Script",
        "Version",
        "None of these"
        ],
        right_answer : "Language"
    },


    {
        question : "Html is programming language",
        options : ["Yes",
        "No",
        ],
        right_answer : "No"
    },

    {
        question : "What is full form of HTML",
        options : ["hyper text markup language", 
        "High markup language", 
        "hyper text mockup language", 
        "None of these"
        ],
        right_answer : "hyper text markup language",
    },

    {
        question : "There are no array in js",
        options : ["yes", 
        "no", 
        "maybe", 
        "None of these"
        ],
        right_answer : "no",

    },

    {
        question : "How to include js in HTML document",
        options : ["style", 
        "link", 
        "script", 
        "text"
        ],
        right_answer : "script",
    },

    {
        question : "What is  the output of '2' + 2",
        options : ["4", 
        "2",
        "22"
        ],
        right_answer : "22",

    },

    {
        question : "which of these is not js framework",
        options : ["bootstrap", 
        "angular", 
        "Django", 
        "react"],
        right_answer : "Django",

    },

    {
        question : "How to define object in javascript",
        options : ["{}",
        "()",
        "<>",
        "None of these"
        ],
        right_answer : "{}",

    },

];

// get elements
var question_container = document.getElementById("question_container");
var title = document.getElementById("title");
var options = document.getElementById("options");
var result = document.getElementById("result");
var submit = document.getElementById("submit");
var next = document.getElementById("next");
var answersheet = document.getElementById("answersheet");
var header = document.getElementById("header");

var score = 0;
var current_question = 0;

function createQuestion(){
    var question = questions[current_question];

    header.innerText = "Quiz";
    next.style.display = "none";

    title.innerHTML = question.question;

    question.options.forEach(function(option, index){

        var radio = document.createElement("input");
        radio.setAttribute("type","radio");
        radio.setAttribute("name","option");
        radio.setAttribute("value",option);

        var label = document.createElement("label");
        label.innerHTML = option;

        var list_item = document.createElement("li");

        list_item.appendChild(radio);
        list_item.appendChild(label);

        options.appendChild(list_item);
})
}

createQuestion();

// submit button

submit.addEventListener("click", function(event){

    var options = document.getElementsByName("option");

    var checked_answer = "";
    
    options.forEach(function(option, index){

        if( option.checked ){
            checked_answer = index;
        }
    })

    if (checked_answer === "")
        result.innerText = "Error";
    else {
    var selected_option = options[checked_answer].value;

    var is_right = questions[current_question].right_answer === selected_option;

    if( is_right )
    {
        submit.style.display = "none";
        result.innerHTML = "Correct";
        result.classList.add("correct");
        next.style.display = "block";
        score++;
    }
    else
    {
        submit.style.display = "none";
        result.innerHTML = "Incorrect";
        result.classList.add("incorrect");
        next.style.display = "block";
    }
    }
})

// next button
next.addEventListener("click",function(){

    result.setAttribute("class","");
    result.innerHTML = "";
    options.innerHTML = "";
    next.style.display = "none";
    submit.style.display = "block";

    // questions.shift();
    current_question++;

    if( questions[current_question] ){

        createQuestion();
    }else{

        answersheet.style.display = "block";
        question_container.style.display = "none";
        showAnswerSheet();
    }
    
})

// answet sheet
function showAnswerSheet()
{
    header.innerText = "Score: " + score;
    var label = document.createElement("h1");
    label.innerText = "Answer key";
    label.style.setProperty("padding-left", "100px");
    answersheet.appendChild(label);


    var list = document.createElement("ul");
    list.setAttribute("class", "x");
    list.style.setProperty("padding-left", "35px");
    
    questions.forEach(function(question)
    {
        var list_item = document.createElement("li");
        list_item.innerHTML = question.question + " - " + '<span style="background-color:#28a745;color:white; padding: 0.1rem;border-radius:3px;" >' + question.right_answer + '</span >';
        list_item.style.setProperty("padding", "0.2rem");
        list.appendChild(list_item);
    })

// restart button
    var btn = document.createElement("button");
    btn.innerHTML = "Restart";
    btn.setAttribute("class", "btn");

    btn.addEventListener("click",function(){
        answersheet.innerHTML = "";
        score = 0;
        current_question = 0;
        header.innerHTML = "";
        answersheet.style.display = "none";
        question_container.style.display = "block";
        createQuestion();
    })

    answersheet.appendChild(list);
    answersheet.appendChild(btn);
}