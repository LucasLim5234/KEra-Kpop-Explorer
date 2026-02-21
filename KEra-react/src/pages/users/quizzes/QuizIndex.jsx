import React, { useEffect, useState } from "react";
import { fetchQuizIdols } from "../../../api/quiz";
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Button, Badge } from "react-bootstrap";
import QuizLeaderboard from "./QuizLeaderboard";

export default function QuizIndex() {
  const [idols, setIdols] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizIdols().then((data) => {
      setIdols(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="py-5">
      <h1 className="display-5 fw-bold gradient-text text-center">Are you a true K-Pop fan?</h1>
      <p className="lead text-center mb-5">Test your knowledge and climb the leaderboard. You only get one shot per group!</p>
      <QuizLeaderboard />
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "30vh" }}>
          <div className="spinner-grow m-2 text-primary" role="status"></div>
          <div className="spinner-grow m-2 text-primary" role="status"></div>
          <div className="spinner-grow m-2 text-primary" role="status"></div>
        </div>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {idols.map((idol) => (
            <Col key={idol.id}>
              <Card
                className={`shadow h-100 quiz-idol-card ${idol.attempted ? "attempted" : ""}`}
                style={{ opacity: idol.attempted ? 0.5 : 1, cursor: idol.attempted ? "not-allowed" : "pointer" }}
                onClick={() => !idol.attempted && navigate(`/user/quiz/${idol.id}`)}
              >
                <Card.Img
                  variant="top"
                  src={idol.thumbnail || "/default-group.png"}
                  alt={idol.name}
                  style={{ height: 180, objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column align-items-center">
                  <Card.Title className="mb-2">{idol.name}</Card.Title>
                  {idol.attempted && <Badge bg="secondary">Attempted</Badge>}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
