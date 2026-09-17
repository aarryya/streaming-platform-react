import "./MovieRow.css";
import MovieCard from "../MovieCard/MovieCard";
import { useEffect, useState } from "react";
import { fetchMovies } from "../../services/tmdb";

function MovieRow({ title, endpoint }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchMovies(endpoint);
        setMovies(data.filter((m) => m.poster_path));
      } catch (err) {
        console.error(err);
      }
    };
    loadMovies();
  }, [endpoint]);

  if (!movies.length) return null;

  return (
    <div className="movie-row">
      <h2>{title}</h2>
      <div className="cards">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={{
              title: movie.title || movie.name || "Untitled",
              rating: movie.vote_average ? movie.vote_average.toFixed(1) : "N/A",
              year: movie.release_date
                ? movie.release_date.substring(0, 4)
                : movie.first_air_date
                ? movie.first_air_date.substring(0, 4)
                : "N/A",
              image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default MovieRow;
