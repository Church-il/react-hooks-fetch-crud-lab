import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [form, setForm] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: "0",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("answer")) {
      const index = parseInt(name.match(/\d/)[0], 10);
      setForm((prevForm) => ({
        ...prevForm,
        answers: prevForm.answers.map((answer, i) => (i === index ? value : answer)),
      }));
    } else {
      setForm((prevForm) => ({ ...prevForm, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddQuestion(form);
    setForm({
      prompt: "",
      answers: ["", "", "", ""],
      correctIndex: "0",
    });
  };

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            name="prompt"
            type="text"
            value={form.prompt}
            onChange={handleChange}
          />
        </label>
        {form.answers.map((answer, index) => (
          <label key={index}>
            Answer {index + 1}:
            <input
              name={`answer${index}`}
              type="text"
              value={answer}
              onChange={handleChange}
            />
          </label>
        ))}
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={form.correctIndex}
            onChange={handleChange}
            aria-label="Correct Answer"
          >
            {[0, 1, 2, 3].map((i) => (
              <option key={i} value={i.toString()}>{`Answer ${i + 1}`}</option>
            ))}
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;