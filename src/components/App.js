import React, { useState, useEffect } from "react";
import QuestionList from "./QuestionList";
import QuestionForm from "./QuestionForm";

function App() {
  const [questions, setQuestions] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((questions) => setQuestions(questions));
  }, []);

  const handleDeleteQuestion = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, { method: "DELETE" })
      .then(() => {
        const updatedQuestions = questions.filter((question) => question.id !== id);
        setQuestions(updatedQuestions);
      });
  };

  const handleAddQuestion = (newQuestion) => {
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuestion),
    })
      .then((r) => r.json())
      .then((addedQuestion) => {
        setQuestions([...questions, addedQuestion]);
        setShowQuestions(true);  // Switch to question list view after adding
      });
  };

  const handleUpdateAnswer = (updatedQuestion) => {
    setQuestions(questions.map(q => q.id === updatedQuestion.id ? updatedQuestion : q));
  };

  return (
    <main>
      <button onClick={() => setShowQuestions(!showQuestions)}>
        {showQuestions ? "New Question" : "View Questions"}
      </button>
      {showQuestions ? (
        <QuestionList
          questions={questions}
          onDelete={handleDeleteQuestion}
          onUpdateAnswer={handleUpdateAnswer}
        />
      ) : (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      )}
    </main>
  );
}

export default App;