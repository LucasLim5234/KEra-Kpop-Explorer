import React, { useEffect, useState } from "react";
import { readIdols } from "../../../api/idol";
import { useNavigate } from "react-router-dom";
import "../../../styles/idol.css";

export default function IdolIndex() {
  const [idols, setIdols] = useState([]);
  const [company, setCompany] = useState("");
  const [debutYear, setDebutYear] = useState("");
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [years, setYears] = useState([]);
  const navigate = useNavigate();

  const fetchIdols = async () => {
    const data = await readIdols(company, debutYear);
    setIdols(data);
    setLoading(false);
    setCompanies([...new Set(data.map((i) => i.company))]);
    setYears([...new Set(data.map((i) => i.debut_year))].sort((a, b) => a - b));
  };

  useEffect(() => {
    setLoading(true);
    fetchIdols();
  }, [company, debutYear]);

  const handleClick = (id) => {
    navigate(`/user/idol/${id}`);
  };

  return (
    <div className="idol-index-container">
      <h1 className="idol-title">K-Pop Idol Archive</h1>
      <div className="idol-filters">
        <select value={company} onChange={(e) => setCompany(e.target.value)}>
          <option value="">All Companies</option>
          {companies.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={debutYear}
          onChange={(e) => setDebutYear(e.target.value)}
        >
          <option value="">All Debut Years</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center gap-3"
          style={{ minHeight: "40vh" }}
        >
          <div className="spinner-grow text-primary" role="status"></div>
          <div className="spinner-grow text-primary" role="status"></div>
          <div className="spinner-grow text-primary" role="status"></div>
        </div>
      ) : (
        <div className="idol-list">
          {idols.map((idol) => (
            <div
              className="idol-card"
              key={idol.id}
              onClick={() => handleClick(idol.id)}
            >
              <img
                src={idol.thumbnail}
                alt={idol.name}
                className="idol-thumb"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://kpop-archive-default.s3.ap-northeast-2.amazonaws.com/default-idol.png";
                  e.target.classList.add("broken");
                }}
              />
              <div className="idol-info">
                <h2>{idol.name}</h2>
                <p className="idol-company">{idol.company}</p>
                <p className="idol-year">Debut: {idol.debut_year}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
