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
        setMovies(data);
      } catch (err) {
        console.error(err);
      }
    };

    loadMovies();
  }, [endpoint]);

  return (
    <div className="movie-row">
      <h2>{title}</h2>

      <div className="cards">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={{
              title: movie.title,
              rating: movie.vote_average.toFixed(1),
              year: movie.release_date
                ? movie.release_date.substring(0, 4)
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