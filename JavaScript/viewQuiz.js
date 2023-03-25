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

// Get all quizzes from the database
db.collection("Quiz").get().then((querySnapshot) => {
    // Create a container for the quiz list
    const quizListContainer = document.getElementById("quiz-list");
  
    // Loop through each quiz and create an HTML element for it
    querySnapshot.forEach((doc) => {
      const quizData = doc.data();
        
      // Create a div for the quiz
      const quizContainer = document.createElement("div");
      quizContainer.classList.add("quiz-container");
        
      
      // Add quiz information to the container
      const quizInfo = document.createElement("div");
      quizInfo.classList.add("quiz-info");
      quizInfo.innerHTML = `
        <h2>${quizData.quizInfo[0]}. ${quizData.quizInfo[1]}</h2>
        <p>Difficulty: ${quizData.quizInfo[3]}</p>
        <p>Number of Questions: ${quizData.quizInfo[2]}</p>
        <button class="update-quiz-btn">Update Quiz</button>
      `;
        // Add event listener to the update quiz button
        const updateBtn = quizInfo.querySelector(".update-quiz-btn");
        updateBtn.addEventListener("click", () => {
            // here need to add validation if the current user is the quiz creator --> quizData.quizInfo[4] is the creator id
                console.log("Update quiz: " + doc.id);
                localStorage.setItem("quizId", doc.id);
                window.location = "updatequiz.html";
        });

      quizContainer.appendChild(quizInfo);
  
       // Add each question to the container
       const questionList = document.createElement("ul");
       questionList.classList.add("question-list");
      quizData.questions.forEach((question) => {
        const questionItem = document.createElement("li");

        const answerList = question.answers ? question.answers.map((answer, index) => `
            <li>
            <input type="radio" name="quiz-${quizData.quizInfo.number}-question-${question.number}" id="quiz-${quizData.quizInfo.number}-question-${question.number}-answer-${index+1}">
            <label for="quiz-${quizData.quizInfo.number}-question-${question.number}-answer-${index+1}">${answer}</label>
            </li>
        `).join("") : '';

        

      questionItem.innerHTML = `
        <h3>${question.question} </h3>
        <ul class="answer-list">
          ${answerList}
        </ul>
        <button class="show-answer-btn">Show Answer</button>
        
        <p class="answer" style="display: none;">Correct answer is: ${question.answers[question.correctAnswer-1]}</p>
      `;

      // Add event listener to the show answer button
      const showAnswerBtn = questionItem.querySelector(".show-answer-btn");
      const answer = questionItem.querySelector(".answer");
      showAnswerBtn.addEventListener("click", () => {
        answer.style.display = "block";
      });

      


        
        questionList.appendChild(questionItem);
      });
      quizContainer.appendChild(questionList);
  
       // Add the quiz container to the quiz list container
       quizListContainer.appendChild(quizContainer);
    });
  });