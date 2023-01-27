import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import ScaleLoader from "react-spinners/ScaleLoader";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [characterError, setCharacterError] = useState(false);
  const [noResultsError, setNoResultsError] = useState(false);

  useEffect(() => {
    async function getData() {
      let m = [
        "batman",
        "iron man",
        "avengers",
        "harry potter",
        "star wars",
        "x-men",
      ];
      let choice = m[Math.floor(Math.random() * (6 - 0) + 0)];
      const response = await fetch(
        `${process.env.REACT_APP_RIPE_TOMATOES_API_HOST}/searchname/${choice}`
      );
      if (response.ok) {
        let data = await response.json();
        data = data.Search;
        data = data.filter((x) => x.Poster !== "N/A");
        setMovies(data);
        setLoading(false);
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
        if (!data.Error) {
          data = data.Search;
          data = data.filter((x) => x.Poster !== "N/A");
          if (data.length === 0) {
            setNoResultsError(true);
          } else {
            setMovies(data);
          }
        } else {
          setNoResultsError(true);
          setTimeout(() => {
            setNoResultsError(false);
          }, "5000");
        }
      }
    } else {
      setCharacterError(true);
      setTimeout(() => {
        setCharacterError(false);
      }, "5000");
    }
  };

  return (
    <>
      {loading ? (
        <main>
          <div id="loading">
            <ScaleLoader size={300} color={"crimson"} loading={loading} />
          </div>
        </main>
      ) : (
        <main id="home-page">
          <form id="home-form" onSubmit={handleSearch}>
            <div style={{ width: "100%", textAlign: "center" }}>
              <input onChange={handleFormChange} name="search" type="text" />
              <button>search!</button>
            </div>
          </form>
          {characterError && (
            <div className="home-error">
              Search must be longer than two characters
            </div>
          )}
          {noResultsError && <div className="home-error">Movie not found</div>}
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
      )}
    </>
  );
}
