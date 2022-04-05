import React, { useState, useEffect } from "react";
import axios from "../axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import "../css/row.css";

const baseImgUrl = "https://image.tmdb.org/t/p/original";

const Row = ({ title, fetchUrl, large }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    axios
      .get(fetchUrl)
      .then((res) => {
        const data = res.data.results;
        setMovies(data);
        onPosterClick(data[0]);
      })
      .catch((err) => {});
  }, []);

  const getPosterClasses = () => {
    return `row__poster ${large ? "row__poster--large" : ""}`;
  };

  const getImgSrc = ({ poster_path, backdrop_path }) => {
    return baseImgUrl + (large ? poster_path : backdrop_path);
  };

  const opts = {
    height: "390",
    width: "99%",
    playerVars: {
      autoplay: 0,
    },
  };

  const onPosterClick = (movie) => {
    try {
      if (trailerUrl) return setTrailerUrl("");

      movieTrailer(movie?.title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => {});
    } catch (ex) {}
  };

  return (
    <section className="row">
      <h2 className="row__heading">{title}</h2>

      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => onPosterClick(movie)}
            className={getPosterClasses()}
            src={getImgSrc(movie)}
            alt={movie.name}
          />
        ))}
      </div>

      <YouTube videoId={trailerUrl} opts={opts} />
    </section>
  );
};

export default Row;
