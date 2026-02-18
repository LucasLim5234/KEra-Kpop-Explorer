import React, { useEffect, useState } from 'react';
import { fetchKpopGroups } from '../../../api/tour';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, InputGroup, Button, Badge } from 'react-bootstrap';

export default function TourIndex() {
  const [groups, setGroups] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchKpopGroups(search).then(data => {
      setGroups(data);
      setLoading(false);
    });
  }, [search]);

  const handleGroupClick = (group) => {
    navigate(`/user/tour-group/${encodeURIComponent(group.name)}`);
  };

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold gradient-text">K-Pop Concerts</h1>
        <p className="lead">Discover your favourite idols and their upcoming concerts worldwide!</p>
      </div>
      <InputGroup className="mb-5 w-75 mx-auto shadow-sm rounded-pill bg-white" style={{maxWidth:'500px'}}>
        <Form.Control
          className="border-0 rounded-pill ps-4"
          placeholder="Search K-pop groups..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{background:'transparent'}}
        />
        <Button variant="pink" className="rounded-pill px-4" onClick={() => setSearch(search)}>
          <i className="bi bi-search"></i> Search
        </Button>
      </InputGroup>
      {loading ? (
        <div className="text-center py-5"><div className="spinner-border text-pink" role="status"></div></div>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {groups.map(group => (
            <Col key={group.id}>
              <Card className="h-100 shadow-lg group-card border-0 position-relative overflow-hidden" onClick={() => handleGroupClick(group)} style={{ cursor: 'pointer', background: 'rgba(255,255,255,0.95)' }}>
                <div className="group-img-wrapper">
                  <Card.Img variant="top" src={group.image} alt={group.name} className="group-img" />
                  <div className="group-img-overlay d-flex align-items-end p-2">
                    <Badge bg="pink" className="fs-6 px-3 py-2 shadow">{group.name}</Badge>
                  </div>
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Text className="text-muted small flex-grow-1">{group.description || 'No description available.'}</Card.Text>
                  <Button variant="outline-pink" className="mt-2 w-100 rounded-pill">View Concerts</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      <style>{`
        .gradient-text { background: linear-gradient(90deg,#e83e8c,#6f42c1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .group-img-wrapper { position:relative; height:220px; overflow:hidden; }
        .group-img { object-fit:cover; width:100%; height:100%; transition:transform .3s; }
        .group-card:hover .group-img { transform:scale(1.08) rotate(-1deg); }
        .group-img-overlay { position:absolute; left:0; right:0; bottom:0; background:rgba(232,62,140,0.12); min-height:40px; }
        .btn-pink, .bg-pink, .badge-pink { background:#e83e8c!important; color:#fff!important; border:none; }
        .btn-outline-pink { border:1.5px solid #e83e8c!important; color:#e83e8c!important; background:transparent!important; }
        .btn-outline-pink:hover { background:#e83e8c!important; color:#fff!important; }
        .text-pink { color:#e83e8c!important; }
      `}</style>
    </Container>
  );
}
