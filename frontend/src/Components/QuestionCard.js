import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../Css/Questioncard.css";

function QuestionCard() {
  const { topic } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/quiz/${topic}/`);
        setQuestions(res.data.questions);
        setCurrent(0);
      } catch {
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [topic]);
  
  const handleSubmit = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/submit-quiz/${topic}/`,
        {
          answers: Object.entries(answers).map(([question_id, selected]) => ({
             question_id: parseInt(question_id),
              selected: selected,
          })),
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
          }
        }
      );
      console.log("Score submitted:", res.data.score);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("Failed to submit quiz. Please try again.");
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          alert("Time Up!");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return <div className="no-quiz"><h2>⏳ Loading Questions...</h2></div>;
  }

  if (!questions.length) {
    return (
      <div className="no-quiz">
        <h2>🚧 Work in Progress</h2>
        <p>Questions for this topic will be added soon.</p>
        <button onClick={() => navigate("/topics")}>Back to Topics</button>
      </div>
    );
  }

  const q = questions[current];

  if (!q) {
    return <div className="no-quiz"><h2>No question available.</h2></div>;
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60;

  return (
    <div className="quiz-page">
      <div className="quiz-wrapper">

        <div className="quiz-header">
          <h2 className="quiz-title">{topic} Quiz</h2>
          <div className="timer">⏱ {minutes}:{seconds}</div>
        </div>

        <div className="progress">
          Question {current + 1} of {questions.length}
        </div>

        <div className="question-card">
          <h3 className="question-text">{q.question_text}</h3>

          <div className="options">
            {[q.option_a, q.option_b, q.option_c, q.option_d].map((opt, i) => (
              <button
                key={i}
                className={`option-btn ${answers[q.id] === opt ? "selected" : ""}`}
                onClick={() => setAnswers({ ...answers, [q.id]: opt })}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="navigation">
          {current > 0 && (
            <button
              className="nav-btn prev"
              onClick={() => setCurrent(current - 1)}
            >
              Previous
            </button>
          )}

          {current < questions.length - 1 ? (
            <button
              className="nav-btn next"
              onClick={() => setCurrent(current + 1)}
            >
              Next
            </button>
          ) : (
            <button className="nav-btn submit" onClick={handleSubmit}>
              Submit Quiz
            </button>
          )}
        </div>

        <div className="back">
          <button onClick={() => navigate("/topics")}>Back to Topics</button>
        </div>

      </div>
    </div>
  );
}

export default QuestionCard;