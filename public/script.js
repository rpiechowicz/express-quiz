const question = document.querySelector("#question");
const buttons = document.querySelectorAll("button");
const goodAnswerSpan = document.querySelector("#goodAnswers");
const answer1 = document.querySelector("#answer1");
const answer2 = document.querySelector("#answer2");
const answer3 = document.querySelector("#answer3");
const answer4 = document.querySelector("#answer4");

for (button of buttons) {
  button.addEventListener("click", function () {
    const answerIndex = this.dataset.answer;
    sendAnswer(answerIndex);
  });
}

function fillQuestionElements(data) {
  question.innerText = data.question;

  for (const i in data.answers) {
    const answerEl = document.querySelector(`#answer${Number(i) + 1}`);
    answerEl.innerText = data.answers[i];
  }
}

function showNextQuestion() {
  fetch("/question", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => fillQuestionElements(data));
}

function handleAnswerFeedback(data) {
  goodAnswerSpan.innerText = data.goodAnswers;
}

function sendAnswer(answerIndex) {
  fetch(`/answer/${answerIndex}`, {
    method: "POST",
  })
    .then((res) => res.json())
    .then((data) => handleAnswerFeedback(data));
}

showNextQuestion();
