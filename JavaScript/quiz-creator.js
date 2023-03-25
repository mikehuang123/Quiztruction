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


// Retrieve the quiz number from localStorage
const quizNumber = localStorage.getItem("quizNumber");

// Get the quiz data from the database

const quizRef = db.collection("quizzes").doc(`quiz${quizNumber}`);

quizRef.get().then((doc) => {
  if (doc.exists) {
    const quizData = doc.data();
    const updateQuizForm = document.querySelector("#updateQuizForm");

    updateQuizForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const updatedQuizData = {};

      // Update quizInfo fields
      updatedQuizData["quizInfo"] = [
        {
          "number": quizData.quizInfo[0].number,
          "name": updateQuizForm.quizName.value,
          "questions": parseInt(updateQuizForm.questions.value),
          "difficulty": updateQuizForm.difficulty.value,
        },
      ];

      // Update each question field
      updatedQuizData["questions"] = quizData.questions.map((question, index) => ({
        "number": question.number,
        "question": updateQuizForm[`question${index}`].value,
        "answers": [
          updateQuizForm[`answer${index}-0`].value,
          updateQuizForm[`answer${index}-1`].value,
          updateQuizForm[`answer${index}-2`].value,
          updateQuizForm[`answer${index}-3`].value,
        ],
        "correctAnswer": parseInt(updateQuizForm[`correctAnswer${index}`].value),
      }));

      // Update the quiz in the database
      quizRef.update(updatedQuizData).then(() => {
        console.log("Quiz updated successfully!");
        window.location.href = "viewquizzes.html";
      }).catch((error) => {
        console.error("Error updating quiz: ", error);
      });
    });
    
    // Add event listeners to show/hide answer buttons
    const showAnswerButtons = document.querySelectorAll(".show-answer-button");
    showAnswerButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const answerContainer = button.previousElementSibling;
        answerContainer.classList.toggle("hidden");
        button.textContent = answerContainer.classList.contains("hidden") ? "Show Answer" : "Hide Answer";
      });
    });
  } else {
    console.log("No such quiz found.");
  }
}).catch((error) => {
  console.error("Error getting quiz document: ", error);
});


 */