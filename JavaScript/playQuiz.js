let quizData = JSON.parse(localStorage.getItem("quiz"));
const quizSize = Number(quizData.quizInfo.questions);
let pointer = 0; //for change questions

let title = document.getElementById("title");
let questionElement = document.getElementById("question");
let result = document.getElementById("resultDiv");

//answer
let options = [document.getElementById("op1"), document.getElementById("op2"),document.getElementById("op3"),document.getElementById("op4")];

//buttones
let nextBtn = document.getElementById("nextBtn");
let submitBtn = document.getElementById("submitBtn");

//score
let score = 0;

let isEnd = false;
let select = "asd";

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

    for(let i = 0; i < 4; i++){
        options[i].addEventListener("click", () => {
            console.log("Click " + options[i].innerText);
            select = i+1;
        });
    }
}
setupQuiz();

// // Add event listener to the back button
// buttons[0].addEventListener("click", () => {
//     if(pointer > 0){
//         pointer--;
//         setupQuiz();
//     }
    
// });


// Add event listener to the next button
nextBtn.addEventListener("click", () => {
    if(pointer < quizSize-1){
        // check answer and update score
        console.log(select +" " + Object.values(quizData.Questions)[pointer].correctAnswer);
        if(select.toString() == Object.values(quizData.Questions)[pointer].correctAnswer.toString()){
            score += 1;
        }
        select = "";


        // increment pointer and setup quiz
        pointer++;
        setupQuiz();
    }

    if(pointer >= quizSize - 1){
        // end show final result
        nextBtn.style.visibility = "hidden";
        submitBtn.style.visibility = "visible";
        
    }
});

// Add event listener to the submit button
submitBtn.addEventListener("click", () => {
    submitBtn.style.visibility = "hidden";
    // show result
    result.innerHTML = `<h1>Your Result: ${score}</h1>`;
    setTimeout(()=>{
        result.innerHTML = "";
        nextBtn.style.visibility = "visible";
        window.location = "viewquizzes.html"
    }, 10000);

});








