import { useState, useEffect } from "react";
import { fetchKpopGroups } from "../../../api/tour";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";

export default function TourIndex() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchKpopGroups().then((data) => {
      setGroups(data);
      setLoading(false);
    });
  }, []);

  const handleGroupClick = (group) => {
    navigate(`/user/tour-group/${encodeURIComponent(group.name)}`);
  };

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold gradient-text">K-Pop Concerts</h1>
        <p className="lead">
          Discover your favourite idols and their upcoming concerts worldwide!
        </p>
      </div>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "30vh" }}>
          <div className="spinner-grow m-2 text-primary" role="status"></div>
          <div className="spinner-grow m-2 text-primary" role="status"></div>
          <div className="spinner-grow m-2 text-primary" role="status"></div>
        </div>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {groups.map((group) => (
            <Col key={group.id}>
              <Card
                className="group-card shadow h-100 tour-theme-card"
                style={{ cursor: "pointer" }}
                onClick={() => handleGroupClick(group)}
              >
                <Card.Img
                  variant="top"
                  src={group.image || "/default-group.png"}
                  alt={group.name}
                  style={{ height: 180, objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column align-items-center">
                  <Card.Title className="mb-2">{group.name}</Card.Title>
                  <Badge bg="info">{group.company}</Badge>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
