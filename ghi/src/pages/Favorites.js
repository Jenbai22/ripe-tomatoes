import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./favorites.css";
import ScaleLoader from "react-spinners/ScaleLoader";

export default function Favorites() {
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [token, setToken] = useState([]);

  useEffect(() => {
    async function getData() {
      let url = `${process.env.REACT_APP_RIPE_TOMATOES_API_HOST}/token`;
      let response = await fetch(url, { credentials: "include" });
      if (response.ok) {
        let data = await response.json();
        setToken(data);
        if (data.user.username) {
          let response = await fetch(
            `${process.env.REACT_APP_RIPE_TOMATOES_API_HOST}/favorites/${data.user.username}`,
            { credentials: "include" }
          );
          if (response.ok) {
            let data = await response.json();
            setFavorites(data.favorites);
            setLoading(false);
          }
        }
      }
    }
    getData();
  }, []);

  const handleRemove = async (e) => {
    e.preventDefault();
    const id = e.target.id;
    const url = `${process.env.REACT_APP_RIPE_TOMATOES_API_HOST}/favorites/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token}`,
      },
    });
    if (response.ok) {
      let f = [...favorites];
      f.splice(
        f.findIndex((x) => x.id === Number(id)),
        1
      );
      setFavorites(f);
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
        <main id="background" className="favorites-page">
          <h1 id="your-favorites">yua faboritess~~ ʕ•́ᴥ•̀ʔっ♡</h1>
          <div className="favorites-grid">
            {favorites.map((favorite) => (
              <>
                <div className="favorites-item" key={favorite.id}>
                  <button
                    className="favorite-delete"
                    onClick={handleRemove}
                    id={favorite.id}
                  >
                    remove
                  </button>
                  <Link to={`/${favorite.imdb}`}>
                    <div id="favorites-poster">
                      <img src={favorite.poster} alt="poster" />
                    </div>
                  </Link>
                </div>
              </>
            ))}
          </div>
        </main>
      )}
    </>
  );
}
