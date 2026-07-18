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

        const randomMovie =
          movies[Math.floor(Math.random() * movies.length)];

        setMovie(randomMovie);
      } catch (err) {
        console.log(err);
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
        <h1>{movie.title}</h1>

        <p>
          ⭐ {movie.vote_average.toFixed(1)}
          {" • "}
          {movie.release_date?.substring(0, 4)}
        </p>

        <p className="overview">
          {movie.overview}
        </p>

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