import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export const fetchMovies = async (endpoint) => {
  const separator = endpoint.includes("?") ? "&" : "?";

  const response = await tmdb.get(
    `${endpoint}${separator}api_key=${API_KEY}`
  );

  return response.data.results;
};

export default tmdb;