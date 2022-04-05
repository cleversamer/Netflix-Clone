import React, { useState, useEffect } from "react";
import axios from "../axios";
import "../css/row.css";

const baseImgUrl = "https://image.tmdb.org/t/p/original";

const Row = ({ title, fetchUrl, large }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(fetchUrl)
      .then((res) => setMovies(res.data.results))
      .catch((err) => {});
  }, []);

  const getPosterClasses = () => {
    return `row__poster ${large ? "row__poster--large" : ""}`;
  };

  return (
    <section className="row">
      <h2 className="row__heading">{title}</h2>

      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={getPosterClasses()}
            src={baseImgUrl + movie.poster_path}
            alt={movie.name}
          />
        ))}
      </div>
    </section>
  );
};

export default Row;
