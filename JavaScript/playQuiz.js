let quizData = JSON.parse(localStorage.getItem("quiz"));
const quizSize = Number(quizData.quizInfo.questions);
let pointer = 0; //for change questions

let title = document.getElementById("title");
let questionElement = document.getElementById("question");
let result = document.getElementById("resultDiv");

//answer
let options = [document.getElementById("op1"), document.getElementById("op2"),document.getElementById("op3"),document.getElementById("op4")];


//score
let score = 0;

let isEnd = false;


console.log(quizSize);

let setupQuiz = () =>{
    console.log(pointer+ ". hiasd " + quizSize);
    if(pointer <quizSize){
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
    }
   

    for(let i = 0; i < 4; i++){
        options[i].addEventListener("click", () => { 
            //increment pointer and setup quiz
            if(pointer >= quizSize ){
                // end show final result
                result.innerHTML = `<h1>Your Result: ${score}</h1>`;
                    setTimeout(()=>{
                        result.innerHTML = "";
                        window.location = "viewquizzes.html"
                    }, 5000);
            }
            else{
                let select = i;
                if(select.toString() == Object.values(quizData.Questions)[pointer].correctAnswer.toString()){
                    score += 1;
                }
                pointer++;
                setupQuiz();
            }
            
            

        });
    

        }
    


    
    
}
setupQuiz();












