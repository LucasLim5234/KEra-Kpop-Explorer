import React, { useEffect, useState } from "react";
import { readIdolDetail } from "../../../api/idol";
import { useParams, useNavigate } from "react-router-dom";
import "../../../styles/idol.css";

export default function IdolDetail() {
  const { id } = useParams();
  const [idol, setIdol] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    readIdolDetail(id).then((data) => {
      setIdol(data);
      setLoading(false);
    });
  }, [id]);

  if (loading)
    return (
      <div
        className="d-flex justify-content-center align-items-center gap-3"
        style={{ minHeight: "60vh" }}
      >
        <div className="spinner-grow text-primary" role="status"></div>
        <div className="spinner-grow text-primary" role="status"></div>
        <div className="spinner-grow text-primary" role="status"></div>
      </div>
    );
  if (!idol) return <div className="idol-loading">Not found</div>;

  return (
    <div className="idol-detail-container">
      <button className="idol-back-btn" onClick={() => navigate(-1)}>
        &larr; Back
      </button>
      <div className="idol-detail-card">
        <img
          src={idol.thumbnail}
          alt={idol.name}
          className="idol-detail-thumb"
        />
        <div className="idol-detail-info">
          <h1>{idol.name}</h1>
          <p className="idol-company">Company: {idol.company}</p>
          <p className="idol-year">Debut Year: {idol.debut_year}</p>
          <br />
          <p className="idol-fandom">Fandom: {idol.fandom_name}</p>
          <p className="idol-desc">{idol.description}</p>
          <div className="idol-section">
            <h3>Members</h3>
            <ul>
              {idol.members.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
          <div className="idol-section">
            <h3>Discography</h3>
            <ul>
              {idol.discography.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
          <div className="idol-section">
            <h3>Awards</h3>
            <ul>
              {idol.awards.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
