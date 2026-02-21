import React, { useEffect, useState } from "react";
import { fetchQuizQuestions, submitQuizAnswers } from "../../../api/quiz";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, ProgressBar, Alert } from "react-bootstrap";

export default function QuizPlay() {
  const { idolId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizQuestions(idolId)
      .then((data) => {
        if (data.error) setError(data.error);
        else setQuestions(data);
      })
      .catch(() => setError("Failed to load quiz."));
  }, [idolId]);

  const handleOption = (quizId, option) => {
    setAnswers({ ...answers, [quizId]: option });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const answerArr = questions.map((q) => ({ quiz_id: q.id, answer: answers[q.id] }));
      const res = await submitQuizAnswers(idolId, answerArr);
      setScore(res.score);
    } catch (e) {
      setError("Submission failed or already attempted.");
    }
    setSubmitting(false);
  };

  if (error) return <Alert variant="danger" className="mt-5 text-center">{error}</Alert>;
  if (score !== null)
    return (
      <div className="text-center py-5">
        <h2 className="mb-4">Quiz Complete!</h2>
        <h3 className="mb-3">Your Score: <span className="text-success">{score} / 10</span></h3>
        <Button variant="primary" onClick={() => navigate("/user/quiz-index")}>Back to Quiz List</Button>
      </div>
    );

  return (
    <div className="py-5">
      <h2 className="mb-4 text-center">Quiz Time!</h2>
      {questions.length > 0 && (
        <ProgressBar now={((step + 1) / questions.length) * 100} className="mb-4" />
      )}
      {questions.length > 0 && (
        <Card className="mb-4 shadow">
          <Card.Body>
            <Card.Title>Q{step + 1}: {questions[step].question}</Card.Title>
            <div className="d-flex flex-column gap-2 mt-3">
              {["A", "B", "C", "D"].map((opt) => (
                <Button
                  key={opt}
                  variant={answers[questions[step].id] === opt ? "success" : "outline-secondary"}
                  className="text-start"
                  onClick={() => handleOption(questions[step].id, opt)}
                  disabled={submitting}
                >
                  {opt}. {questions[step][`option_${opt.toLowerCase()}`]}
                </Button>
              ))}
            </div>
          </Card.Body>
        </Card>
      )}
      <div className="d-flex justify-content-between">
        <Button
          variant="secondary"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0 || submitting}
        >
          Previous
        </Button>
        {step < questions.length - 1 ? (
          <Button
            variant="primary"
            onClick={() => setStep((s) => Math.min(questions.length - 1, s + 1))}
            disabled={typeof answers[questions[step]?.id] === "undefined" || submitting}
          >
            Next
          </Button>
        ) : (
          <Button
            variant="success"
            onClick={handleSubmit}
            disabled={Object.keys(answers).length !== questions.length || submitting}
          >
            Submit Quiz
          </Button>
        )}
      </div>
    </div>
  );
}
