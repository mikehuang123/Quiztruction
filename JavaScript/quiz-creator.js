var numAnswers = 0;
const addButton = document.getElementById("addAnswer");

addButton.addEventListener("click", function() {

const lineBreak = document.createElement('br');
const container = document.getElementById("answer-container");
const answerText = document.getElementById("answer-text");
const radio = document.createElement("input");
const radioLabel = document.createElement("label");
radio.setAttribute('id', 'radio' + numAnswers);
radioLabel.setAttribute('for', 'radio' + numAnswers);
radioLabel.innerHTML = answerText.value;
radio.type = "radio";
radio.name = "radio-group";
radio.value = numAnswers;
numAnswers++;
container.appendChild(radio);
radio.after(radioLabel);
radioLabel.after(lineBreak)});





/**
 * 
 * const firebaseConfig = {
    apiKey: "AIzaSyAoiwpM4SMW2fx1E0RSXCIzMsYIXT84kv4",
    authDomain: "quizstruction.firebaseapp.com",
    projectId: "quizstruction",
    storageBucket: "quizstruction.appspot.com",
    messagingSenderId: "1012312141205",
    appId: "1:1012312141205:web:2b4fc0bce20599a9d21a9c"
};

firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();



 */