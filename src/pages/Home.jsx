import NavBar from "../components/NavBar/NavBar";
import Banner from "../components/Banner/Banner";
import MovieRow from "../components/MovieRow/MovieRow";
import requests from "../services/requests";

function Home() {
  return (
    <>
      <NavBar />
      <Banner />
      <div className="home-rows">
        <MovieRow title="🔥 Trending Now" endpoint={requests.trending} />
        <MovieRow title="⭐ Popular" endpoint={requests.popular} />
        <MovieRow title="🏆 Top Rated" endpoint={requests.topRated} />
        <MovieRow title="💥 Action Movies" endpoint={requests.action} />
        <MovieRow title="😂 Comedy Movies" endpoint={requests.comedy} />
        <MovieRow title="👻 Horror Movies" endpoint={requests.horror} />
        <MovieRow title="🎨 Animation" endpoint={requests.animation} />
      </div>
    </>
  );
}

export default Home;
