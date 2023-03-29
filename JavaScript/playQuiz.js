let quizData = JSON.parse(localStorage.getItem("quiz"));
const quizSize = Number(quizData.quizInfo.questions);
let pointer = 0; //for change questions

let title = document.getElementById("title");
let questionElement = document.getElementById("question");
let result = document.getElementById("resultDiv");

//answer
let options = [document.getElementById("op1"), document.getElementById("op2"),document.getElementById("op3"),document.getElementById("op4")];

//buttones
let buttons = [document.getElementById("backBtn") , document.getElementById("nextBtn"), document.getElementById("submitBtn")];

//score
let score = 0;

let isEnd = false;

console.log(quizSize);

let setupQuiz = () =>{
    // quiz name
    title.innerHTML = quizData.quizInfo.name;
    
    // question
    questionElement.innerHTML = Object.values(quizData.Questions)[pointer].question; 

    // answers
    for(let i = 0; i < 4; i++){
        if(i< Object.values(quizData.Questions)[pointer].answers.length){
            options[i].innerHTML =  Object.values(quizData.Questions)[pointer].answers[i];
        }
        else{
            options[i].innerHTML = "";
        }
        
    }

    // for(option in options){
    //     option.addEventListener("click", () => {

    //         console.log("Click " + option.values);
    //     });
    // }
}
setupQuiz();

// Add event listener to the back button
buttons[0].addEventListener("click", () => {
    if(pointer > 0){
        pointer--;
        setupQuiz();
    }
    
});


// Add event listener to the next button
buttons[1].addEventListener("click", () => {
    if(pointer < quizSize-1){
        pointer++;
        setupQuiz();
    }

    if(pointer >= quizSize - 1){
        // end show submit
        buttons[2].style.visibility = "visible";
    }
});

// Add event listener to the next button
buttons[1].addEventListener("click", () => {
    if(pointer < quizSize-1){
        pointer++;
        setupQuiz();
    }

    if(pointer >= quizSize - 1){
        // end show final result
        buttons[2].style.visibility = "visible";
    }
});

// Add event listener to the submit button
buttons[2].addEventListener("click", () => {
    buttons[2].style.visibility = "hidden";
    // show result
    result.innerHTML = `<h1>Your Result: ${score}</h1>`;
    setTimeout(()=>{
        result.innerHTML = "";
        window.location = "viewquizzes.html"
    }, 10000);

});








