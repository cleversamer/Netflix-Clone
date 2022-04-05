import React, { useState, useEffect } from "react";
import axios from "../axios";
import requests from "../requests";
import "../css/banner.css";

const baseImgUrl = "https://image.tmdb.org/t/p/original";

const Banner = () => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios
      .get(requests.fetchNetflixOriginals)
      .then((res) => {
        const data = res.data.results;
        const rndIndex = Math.floor(Math.random() * data.length - 1);
        setMovie(data[rndIndex]);
      })
      .catch((err) => {});
  }, []);

  const getHeadingTitle = () => {
    return movie?.title || movie?.name || movie?.original_name;
  };

  const truncate = (str, n) => {
    const condition = str?.length > 2;
    return condition ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${baseImgUrl + movie?.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__content">
        <h1 className="banner__heading">{getHeadingTitle()}</h1>

        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>

        <p className="banner__movie-overview">
          {truncate(movie?.overview, 150)}
        </p>
      </div>

      <div className="banner--fade-bottom"></div>
    </header>
  );
};

export default Banner;
