import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [characterError, setCharacterError] = useState(false);

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        `${process.env.REACT_APP_RIPE_TOMATOES_API_HOST}/searchname/batman`
      );
      if (response.ok) {
        let data = await response.json();
        data = data.Search;
        data = data.filter((x) => x.Poster != "N/A");
        setMovies(data);
      }
    }
    getData();
  }, []);

  const handleFormChange = async (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (search.length > 2) {
      const response = await fetch(
        `${process.env.REACT_APP_RIPE_TOMATOES_API_HOST}/searchname/${search}`
      );
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        data = data.Search;
        data = data.filter((x) => x.Poster != "N/A");
        setMovies(data);
      }
    } else {
      setCharacterError(true);

    }
  };

  return (
    <main id="home-page">
      <form id="home-form" onSubmit={handleSearch}>
        <div style={{ width: "100%", textAlign: "center" }}>
          <input onChange={handleFormChange} name="search" type="text" />
          <button>search!</button>
        </div>
      </form>
      {characterError && (
        <div id="character-error">
          Search must be longer than two characters
        </div>
      )}
      <div className="home-grid">
        {movies.map((movie) => (
          <div className="home-item" key={movie.imdbID}>
            <Link to={`/${movie.imdbID}`}>
              <div id="home-poster">
                <img src={movie.Poster} alt={movie.Title} />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
