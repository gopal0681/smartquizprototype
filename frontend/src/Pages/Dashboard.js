import { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import '../Css/Dashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

function Dashboard() {
  const [data, setData] = useState({
    total_quizzes: res.data.total_quizzes || 0,
    total_attempts: res.data.total_attempts || 0,
    average_score: res.data.average_score || 0,
    highest_score: res.data.highest_score || 0,
    leaderboard: res.data.leaderboard || []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/dashboard/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
          }
        });
        setData({
          total_quizzes: res.data.total_quizzes || 0,
          total_attempts: res.data.total_attempts || 0,
          average_score: res.data.average_score || 0,
          highest_score: res.data.highest_score || 0,
          leaderboard: res.data.leaderboard || []
        });

      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      }
    };

    fetchData();
  }, []);

  const barData = {
    labels: ["Quizzes", "Attempts", "Avg Score", "Highest"],
    datasets: [
      {
        label: "Quiz Stats",
        data: [
          data.total_quizzes,
          data.total_attempts,
          data.average_score,
          data.highest_score
        ],
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"]
      }
    ]
  };

  const pieData = {
    labels: ["Average Score", "Remaining"],
    datasets: [
      {
        data: [data.average_score, 100 - data.average_score],
        backgroundColor: ["#6366f1", "#e5e7eb"]
      }
    ]
  };

  return (
    <div className="main-contianer">
      <div className="dashboard-container">
        <h2>Dashboard</h2>

        <div className="card-grid">
          <div className="card">
            <h3>{data.total_quizzes}</h3>
            <p>Total Quizzes</p>
          </div>
          <div className="card">
            <h3>{data.total_attempts}</h3>
            <p>Total Attempts</p>
          </div>
          <div className="card">
            <h3>{data.average_score}</h3>
            <p>Average Score</p>
          </div>
          <div className="card">
            <h3>{data.highest_score}</h3>
            <p>Highest Score</p>
          </div>
        </div>

        <div className="charts">
          <div className="chart-box">
            <Bar data={barData} />
          </div>
          <div className="chart-box">
            <Pie data={pieData} />
          </div>
        </div>

        <div className="leaderboard">
          <h3>Leaderboard</h3>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {data.leaderboard?.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.score}</td>
                </tr>
              ))}
              {data.leaderboard.length === 0 && (
                <tr>
                  <td colSpan="3">No leaderboard data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;