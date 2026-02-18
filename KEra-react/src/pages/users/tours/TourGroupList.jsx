import React, { useEffect, useState } from 'react';
import { fetchConcertsByGroup } from '../../../api/tour';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, InputGroup, Badge } from 'react-bootstrap';

export default function TourGroupList() {
  const { groupName } = useParams();
  const [concerts, setConcerts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchConcertsByGroup(groupName).then(data => {
      let filtered = data;
      if (search) {
        filtered = data.filter(concert =>
          concert.name.toLowerCase().includes(search.toLowerCase())
        );
      }
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
      setConcerts(filtered);
      setLoading(false);
    });
  }, [groupName, search]);

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold gradient-text">{groupName} Concerts</h2>
        <p className="lead">Explore all upcoming shows and get your tickets now!</p>
      </div>
      <InputGroup className="mb-5 w-75 mx-auto shadow-sm rounded-pill bg-white" style={{maxWidth:'500px'}}>
        <Form.Control
          className="border-0 rounded-pill ps-4"
          placeholder="Search concerts..."
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
      ) : concerts.length === 0 ? (
        <div className="text-center">No concerts found.</div>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {concerts.map(concert => (
            <Col key={concert.id}>
              <Card className="h-100 shadow-lg concert-card border-0 position-relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.97)' }}>
                <div className="concert-img-wrapper">
                  <Card.Img variant="top" src={concert.image} alt={concert.name} className="concert-img" />
                  <div className="concert-img-overlay d-flex align-items-end p-2">
                    <Badge bg="pink" className="fs-6 px-3 py-2 shadow">{concert.venue}</Badge>
                  </div>
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fw-bold text-pink">{concert.name}</Card.Title>
                  <Card.Text className="mb-2">
                    <span className="me-2"><i className="bi bi-calendar-event"></i><i>Date:</i> {concert.date}</span><br/>
                    <span className="me-2"><i className="bi bi-clock"></i><i>Start At: </i> {concert.time}</span><br/>
                    <span className="me-2"><i className="bi bi-geo-alt"></i><i>Venue:</i> {concert.city}, {concert.country}</span>
                  </Card.Text>
                  <Button variant="outline-pink" href={concert.ticket_url} target="_blank" rel="noopener noreferrer" className="mt-auto rounded-pill fw-bold">
                    <i className="bi bi-ticket-perforated"></i> Buy Ticket
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      <style>{`
        .gradient-text { background: linear-gradient(90deg,#e83e8c,#6f42c1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .concert-img-wrapper { position:relative; height:220px; overflow:hidden; }
        .concert-img { object-fit:cover; width:100%; height:100%; transition:transform .3s; }
        .concert-card:hover .concert-img { transform:scale(1.08) rotate(-1deg); }
        .concert-img-overlay { position:absolute; left:0; right:0; bottom:0; background:rgba(232,62,140,0.12); min-height:40px; }
        .btn-pink, .bg-pink, .badge-pink { background:#e83e8c!important; color:#fff!important; border:none; }
        .btn-outline-pink { border:1.5px solid #e83e8c!important; color:#e83e8c!important; background:transparent!important; }
        .btn-outline-pink:hover { background:#e83e8c!important; color:#fff!important; }
        .text-pink { color:#e83e8c!important; }
      `}</style>
    </Container>
  );
}
