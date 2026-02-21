import React, { useEffect, useState } from "react";
import { fetchQuizLeaderboard } from "../../../api/quiz";
import { Card, Table, Badge } from "react-bootstrap";

export default function QuizLeaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [myScore, setMyScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuizLeaderboard().then((data) => {
      setLeaderboard(data.top || []);
      setMyScore(data.myScore || 0);
      setLoading(false);
    });
  }, []);

  return (
    <Card className="mt-5 shadow">
      <Card.Body>
        <h3 className="mb-4 text-center">🏆 Quiz Beat Leaderboard</h3>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "10vh" }}>
            <div className="spinner-grow text-primary" role="status"></div>
          </div>
        ) : (
          <Table striped bordered hover responsive className="mb-0">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Total Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, idx) => (
                <tr key={entry.user_id} className={idx === 0 ? "table-warning" : ""}>
                  <td>{idx + 1}</td>
                  <td>{entry.user?.name || `User #${entry.user_id}`}</td>
                  <td><Badge bg="success">{entry.total_score}</Badge></td>
                </tr>
              ))}
              <tr className="table-info">
                <td colSpan={2}><b>Your Total Score</b></td>
                <td><Badge bg="primary">{myScore}</Badge></td>
              </tr>
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
}
