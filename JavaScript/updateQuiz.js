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

// Get the quiz info, questions, and answers from the database
quizRef.get().then((doc) => {
  if (doc.exists) {
    const data = doc.data();

    // Update the quiz info input fields
    quizNumber = data.quizInfo[0]
    document.getElementById("quiz-name").value = data.quizInfo[1];
    document.getElementById("quiz-difficulty").value = data.quizInfo[3];
    document.getElementById("quiz-questions").value = data.quizInfo[2];

    // Loop through each question and update the input fields
    data.questions.forEach((question, index) => {
      const questionDiv = document.createElement("div");
      questionDiv.innerHTML = `
        <h3>Question ${index + 1}</h3>
        <label>Question:</label>
        <input type="text" name="question-${index + 1}" value="${question.question}">
        <br>
        <label>Answer 1:</label>
        <input type="text" name="answer-${index + 1}-1" value="${question.answers[0]}">
        <br>
        <label>Answer 2:</label>
        <input type="text" name="answer-${index + 1}-2" value="${question.answers[1]}">
        <br>
        <label>Answer 3:</label>
        <input type="text" name="answer-${index + 1}-3" value="${question.answers[2]}">
        <br>
        <label>Correct Answer:</label>
        <select name="correct-answer-${index + 1}">
          <option value="1" ${question.correctAnswer === 1 ? "selected" : ""}>Answer 1</option>
          <option value="2" ${question.correctAnswer === 2 ? "selected" : ""}>Answer 2</option>
          <option value="3" ${question.correctAnswer === 3 ? "selected" : ""}>Answer 3</option>
        </select>
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
      userId: "VXZetFDhvs9sKTtNrAUs"
    },
    questions: []
  };

  // Loop through each question and update
  const questions = document.querySelectorAll('.question');
  questions.forEach((question) => {
    const questionNumber = question.dataset.questionNumber;
    const questionText = question.querySelector('.question-text').value;
    const answers = question.querySelectorAll('.answer');
    const correctAnswer = question.querySelector('.correct-answer').value;

    const updatedQuestion = {
      map: {
        number: questionNumber,
        question: questionText,
        answers: [],
        correctAnswer: correctAnswer
      }
    };

    // Loop through each answer and add to question
    answers.forEach((answer) => {
      updatedQuestion.map.answers.push(answer.value);
    });

    // Add updated question to updated quiz object
    updatedQuiz.questions.push(updatedQuestion);
  });

  // Update quiz in Firestore
  try {
    await db.collection('Quiz').doc(quizId).update(updatedQuiz);
    alert('Quiz updated successfully!');
  } catch (error) {
    console.error(error);
    alert('Error updating quiz.');
  }
});
  


 