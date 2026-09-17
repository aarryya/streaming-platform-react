import "./Banner.css";
import { useEffect, useState } from "react";
import { fetchMovies } from "../../services/tmdb";
import requests from "../../services/requests";

function Banner() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const loadBanner = async () => {
      try {
        const movies = await fetchMovies(requests.trending);
        const withBackdrop = movies.filter((m) => m.backdrop_path);
        setMovie(withBackdrop[Math.floor(Math.random() * withBackdrop.length)]);
      } catch (err) {
        console.error(err);
      }
    };
    loadBanner();
  }, []);

  if (!movie) return null;

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="banner-content">
        <h1>{movie.title || movie.name}</h1>
        <p>
          ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
          {" • "}
          {movie.release_date?.substring(0, 4) || movie.first_air_date?.substring(0, 4)}
        </p>
        <p className="overview">{movie.overview}</p>
        <div className="buttons">
          <button>▶ Watch Now</button>
          <button>＋ My List</button>
        </div>
      </div>
      <div className="banner-fade"></div>
    </header>
  );
}

export default Banner;
