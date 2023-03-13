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