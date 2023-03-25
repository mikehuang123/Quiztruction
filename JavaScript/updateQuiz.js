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


/// Get the quiz ID from local storage
const quizId = localStorage.getItem("quizId");

// Get a reference to the quiz document in the Firestore database
const quizRef = db.collection("Quiz").doc(quizId);
let quizNumber;
let userId;
// Get the quiz info, questions, and answers from the database
quizRef.get().then((doc) => {
  if (doc.exists) {
    const data = doc.data();

    // Update the quiz info input fields
    quizNumber = data.quizInfo.number;
    userId = data.quizInfo.userId;
    document.getElementById("quiz-name").value = data.quizInfo.name;
    document.getElementById("quiz-difficulty").value = data.quizInfo.difficulty;
    document.getElementById("quiz-questions").value = data.quizInfo.questions;

    // Loop through each question and update the input fields
    Object.values(data.Questions).forEach((question, index) => {
      const questionDiv = document.createElement("div");
      questionDiv.innerHTML = `
    <h3>Question ${index + 1}</h3>
    <label>Question:</label>
    <input  class="question-text-${index + 1}" type="text" name="question-${index + 1}" value="${question.question}">
    <br>
        ${question.answers.map((answer, answerIndex) => `
            <label>Answer ${answerIndex + 1}:</label>
            <input class="answer-${index + 1}" type="text" name="answer-${index + 1}-${answerIndex + 1}" value="${answer}">
            <br>
        `).join('')}
        <label>Correct Answer:</label>
        <input class="correct-answer" type="text" name="correct-answer-${index + 1}" value="${question.correctAnswer}">
        `;
        document.getElementById("questions-container").appendChild(questionDiv);
        });
  } else {
    console.log("No such document!");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
});





const form = document.querySelector('form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get quiz id from localStorage
  const quizId = localStorage.getItem('quizId');

  // Get form values
  const quizName = form.name.value;
  const quizDifficulty = form.difficulty.value;

  // Construct updated quiz object 
  const updatedQuiz = {
    quizInfo: {
        number : quizNumber,
        name: quizName,
        difficulty: quizDifficulty,
        questions: document.getElementById("quiz-questions").value,
        userId: userId
    },
    Questions: {}
  };

  // Loop through each question and update
  const questions = document.querySelectorAll('.question');
    for(i = 0; i < document.getElementById("quiz-questions").value; i++){
            
        const questionNumber = i+1;
        const questionText = questions[0].querySelector(`.question-text-${i+1}`).value;
        const answers = questions[0].querySelectorAll(`.answer-${i+1}`);
    
        const correctAnswer = questions[0].querySelector('.correct-answer').value;
        const updatedQuestion = {
            
            number: questionNumber,
            question: questionText,
            answers: [],
            correctAnswer: correctAnswer
        
        };

        // Loop through each answer and add to question
        answers.forEach((answer, answerIndex) => {
            updatedQuestion.answers[answerIndex] = answer.value;     
    });
        // Add updated question to updated quiz object
        updatedQuiz.Questions[`question${i+1}`] = (updatedQuestion);
        console.log(updatedQuiz.Questions[0]);
    }
   


  // Update quiz in Firestore
  try {
    await db.collection('Quiz').doc(quizId).update(updatedQuiz);
    alert('Quiz updated successfully!');
  } catch (error) {
    console.error(error);
    alert('Error updating quiz.');
  }
});
  


 