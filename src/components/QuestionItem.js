import React from "react";

function QuestionItem({ question, onDelete, onUpdateAnswer }) {
  const { id, prompt, answers, correctIndex } = question;

  const handleDeleteClick = () => {
    onDelete(id);
  };

  const handleAnswerChange = (e) => {
    const updatedIndex = e.target.value;
    onUpdateAnswer({ ...question, correctIndex: updatedIndex });
  };

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={correctIndex} onChange={handleAnswerChange} aria-label="Correct Answer">
          {answers.map((answer, index) => (
            <option key={index} value={index.toString()}>
              {answer}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;