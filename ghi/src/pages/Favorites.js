import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./favorites.css"

export default function Favorites() {
const [favorites, setFavorites] = useState([])
const [token, setToken] = useState([])

useEffect(() => {
    async function getData() {
        let url = `${process.env.REACT_APP_RIPE_TOMATOES_API_HOST}/token`;
        let response = await fetch(url, { credentials: "include" });
        if (response.ok) {
            let data = await response.json();
            setToken(data);
            if (data.user.username) {
                let response = await fetch(`${process.env.REACT_APP_RIPE_TOMATOES_API_HOST}/favorites/${data.user.username}`, { credentials: "include" });
                if (response.ok) {
                    let data = await response.json();
                    setFavorites(data.favorites);
                    console.log(favorites)
                }
            }
        }
    }
    getData();
  }, []);



return(
    <main id="background" className="favorites-page">
    <h1 id="your-favorites">yua faboritess~~ ʕ•́ᴥ•̀ʔっ♡</h1>
        <div className="favorites-grid">
            {favorites.map((favorite) => (
            <div className="favorites-item" key={favorite.id}>
                <Link to={`/${favorite.imdb}`}>
                <div id="favorites-poster">
                    <img src={favorite.poster} alt="poster" />
                </div>
                </Link>
            </div>
            ))}
        </div>
    </main>
)
}
