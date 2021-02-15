function gameRoutes(app) {
  let goodAnswers = 0;
  let callToAFriendUsed = false;
  let questionToTheCrowdUsed = false;
  let halfOnHalf = false;
  let isGameOver = false;

  const questions = [
    {
      question: "Jaki jest najlepszy język programowania na świecie?",
      answers: ["C++", "Java", "JavaScript", "C#"],
      correctAnswer: 2,
    },
    {
      question: "Podoba Ci się ta gra?",
      answers: [
        "Jest okej",
        "Uwielbiam ją",
        "Duzo lepsza niz Cyberpunk 2077!",
        "Rafał wymiata",
      ],
      correctAnswer: 3,
    },
    {
      question: "Jeśli Tomek ma 10 lat to ile wazy słońce?",
      answers: [
        "10kg",
        "Pierwsza zasada dynamiki Newtona",
        "Hemoglobina",
        "Tak",
      ],
      correctAnswer: 1,
    },
  ];

  app.get("/question", (req, res) => {
    if (goodAnswers === questions.length) {
      res.json({
        winner: true,
      });
    } else if (isGameOver) {
      res.json({
        looser: true,
      });
    } else {
      const nextQuestion = questions[goodAnswers];
      const { question, answers } = nextQuestion;

      res.json({
        question,
        answers,
      });
    }
  });

  app.post("/answer/:index", (req, res) => {
    if (isGameOver) {
      res.json({
        looser: true,
      });
    }

    const { index } = req.params;
    const question = questions[goodAnswers];
    const isGoodAnswer = question.correctAnswer === Number(index);

    if (isGoodAnswer) {
      goodAnswers++;
    } else {
      isGameOver = true;
    }

    res.json({
      correct: isGoodAnswer,
      goodAnswers,
    });
  });
}

module.exports = gameRoutes;
