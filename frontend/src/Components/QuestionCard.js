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

  useEffect(() => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_API_URL}/quiz/${topic}/`)
      .then(res => {
        setQuestions(res.data);
        setLoading(false);
        setCurrent(0);
      })
      .catch(() => {
        setQuestions([]);
        setLoading(false);
      });
  }, [topic]);

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
    <div className="quiz-container">
      <div className="quiz-header">
        <h2>{topic} Quiz</h2>
        <div className="timer">⏱ {minutes}:{seconds}</div>
      </div>

      <div className="question-card">
        <h3>Question {current + 1}</h3>
        <p>{q.question_text}</p>

        <div className="options">
          <button>{q.option_a}</button>
          <button>{q.option_b}</button>
          <button>{q.option_c}</button>
          <button>{q.option_d}</button>
        </div>
      </div>

      <div className="navigation">
        {current > 0 && <button onClick={() => setCurrent(current - 1)}>Previous</button>}
        {current < questions.length - 1 && <button onClick={() => setCurrent(current + 1)}>Next</button>}
      </div>
        <button onClick={() => navigate("/topics")}>Back to Topics</button>
    </div>
  );
}

export default QuestionCard;