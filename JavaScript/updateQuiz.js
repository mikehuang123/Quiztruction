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

// Get the quiz info, questions, and answers from the database
quizRef.get().then((doc) => {
  if (doc.exists) {
    const data = doc.data();

    // Update the quiz info input fields
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



// Add event listener to the form submit button
document.getElementById("update-quiz-form").addEventListener('submit', async (e) => {
    e.preventDefault();
  
    // Get the quiz ID from local storage
    const quizId = localStorage.getItem('quizId');
  
    // Get the quiz document from Firestore
    const quizDocRef = await db.collection('Quiz').doc(quizId).get();
    const quizDocData = quizDocRef.data();
  
    // Update the quiz document with the form data
    const updatedQuizData = {
      quizInfo: [
        parseInt(form.number.value),
        form.name.value,
        parseInt(form.questions.value),
        form.difficulty.value,
        quizInfo[4]
    ],
      questions: [],
    };
  
    // Loop through each question and update the answers
    form.querySelectorAll('.question').forEach((question, index) => {
      const answers = [];
      question.querySelectorAll('.answer').forEach((answer) => {
        answers.push(answer.value);
      });
  
      updatedQuizData.questions.push({
        number: index + 1,
        question: question.querySelector('.question-text').value,
        answers: answers,
        correctAnswer: parseInt(question.querySelector('.correct-answer').value),
      });
    });
  
    // Update the quiz document in Firestore
    await db.collection('Quiz').doc(quizId).update(updatedQuizData);
  
    // Redirect back to the view quiz page
    window.location = 'viewquizzes.html';
  });