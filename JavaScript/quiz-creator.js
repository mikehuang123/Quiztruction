var numAnswers = 0;
var questionNumber = 0;
var questionCompleted = false;
const addButton = document.getElementById("addAnswer");
const questionButton = document.getElementById("addQuestion");
const answerText = document.getElementById("answer-text");

addButton.addEventListener("click", function() {
    var forms = document.getElementsByTagName('form');
    for(var i = 0; i < forms.length; i++){
        if(i == questionNumber){
            const lineBreak = document.createElement('br');
            const container = document.getElementById("answer-container" + questionNumber);
            const radio = document.createElement("input");
            const radioLabel = document.createElement("label");
            radio.setAttribute('id', 'radio' + numAnswers);
            radioLabel.setAttribute('for', 'radio' + numAnswers);
            if(answerText.value == null || answerText.value == ""){
                return;
            }
            radioLabel.innerHTML = answerText.value;
            radio.type = "radio";
            radio.name = "radio-group";
            radio.value = numAnswers;
            numAnswers++;
            container.appendChild(radio);
            radio.after(radioLabel);
            radioLabel.after(lineBreak);
        }
    }
});





const firebaseConfig = {
    apiKey: "AIzaSyAoiwpM4SMW2fx1E0RSXCIzMsYIXT84kv4",
    authDomain: "quizstruction.firebaseapp.com",
    projectId: "quizstruction",
    storageBucket: "quizstruction.appspot.com",
    messagingSenderId: "1012312141205",
    appId: "1:1012312141205:web:2b4fc0bce20599a9d21a9c"
};

firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();



questionButton.addEventListener("click", function() {
    questionCompleted = checkQuestionCompleted();
    if(questionCompleted){
        questionCompleted = false;
        questionNumber++;
        numAnswers = 0;
        answerText.remove();
        addButton.remove();
        const questionForm = document.createElement('form');
        const pTag = document.createElement('p');
        const questionArea = document.createElement('textarea');
        questionArea.id='question';
        questionArea.className='w3-input w3-border';
        questionArea.type='text';
        questionArea.placeholder='Question';
        const answerContainer = document.createElement('div');
        answerContainer.id='answer-container' + questionNumber;
        pTag.appendChild(questionArea);
        questionForm.appendChild(pTag);
        questionForm.appendChild(answerContainer);
        questionForm.appendChild(answerText);
        questionForm.appendChild(addButton);
        questionButton.before(questionForm);
    }

});


function createQuizzes(){
    const quizName = document.getElementById("quiz-name");
    const difficulty = document.getElementById("difficulties");
    if(checkQuestionCompleted() && quizName.value != null && quizName.value != ""){
        firebase.auth().onAuthStateChanged(function(user) {
            var forms = document.getElementsByTagName('form');
            var quizzes = {};
            var quizInfo = {
                difficulty: difficulty.value,
                name: quizName.value,
                number: "1",
                questions: questionNumber + 1,
                userId: localStorage.getItem("loginId")
            };
            for(var i = 0; i < forms.length; i++){
                var answers = forms[i].querySelectorAll('input[name="radio-group"]');
                var labelAnswers = forms[i].querySelectorAll('label');
                var answerText = new Array();
                var correctAnswer = -1;
                var number = 1;
                var questionText = forms[i].querySelector('textarea');
                for(var j = 0; j < answers.length; j++){
                    if(answers[j].checked){
                        correctAnswer = j;
                    }
                    answerText.push(labelAnswers[j].textContent);
                }
                quizzes["quesiont"+(i+1)] = {
                    answers: answerText,
                    correctAnswer: correctAnswer,
                    number: (i+1),
                    question: questionText.value
                };
            }
            db.collection("Quiz").add({
                Questions : quizzes,
                quizInfo: quizInfo
            }).then(()=>{
                window.location.href="home.html";
            });
        });
    }
}

function checkQuestionCompleted(){
    if(numAnswers < 2){
        return false;
    }
    var forms = document.getElementsByTagName('form');
    for(var i = 0; i < forms.length; i++){
        if(i==questionNumber){
            var questionText = forms[i].getElementsByTagName("textarea")[0].value;
            if(questionText == null || questionText == ""){
                return false;
            }
            var answers = forms[i].getElementsByTagName("input");
            var checked = false;
            for (j = 0; j < answers.length; j++) {
                if (answers[j].type == 'radio' && answers[j].checked) {
                    checked = true;
                }
            }
            if(!checked){
                return false;
            }
        }
    }
    return true;
}
