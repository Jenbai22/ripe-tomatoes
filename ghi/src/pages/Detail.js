import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Detail() {
  let [token, setToken] = useState("");
  let [loggedIn, setLoggedIn] = useState(false);

  let { imdb } = useParams();
  let [movie, setMovie] = useState([]);
  let [reviews, setReviews] = useState([]);

  const [formData, setFormData] = useState({
    imdb: imdb,
    body: "",
    username: "",
  });

  useEffect(() => {
    async function getData() {
      let url = `${process.env.REACT_APP_RIPE_TOMATOES_API_HOST}/token`;
      let response = await fetch(url, {credentials: "include"});
      if (response.ok) {
        let data = await response.json();
        if (data) {
          setLoggedIn(true);
          setToken(data.access_token);
          formData.username = data.user.username;
        }
      }
      response = await fetch(`https://www.omdbapi.com/?apikey=7c7456b5&i=${imdb}`)
      if (response.ok) {
        const data = await response.json()
        setMovie(data)
        if (data.Response) {
          response = await fetch(`${process.env.REACT_APP_RIPE_TOMATOES_API_HOST}/reviews/${imdb}`)
          if (response.ok) {
            let data = await response.json()
            setReviews(data.reviews)
          }
        }
      }
    }
    getData();
  }, []);

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch("http://localhost:8000/reviews", config);
    if (response.ok) {
      const d = await response.json()
      setReviews(prevState => [...prevState, {id: d.id, body: d.body, imdb: d.imdb, posted: d.posted, username: d.username}]);
      document.getElementById("form").reset();
    } else {
      console.log("Failed to post review");
    }
  };

  return (
    <>
      {loggedIn ? (
        <>
          <div>detail page || imdb is "{imdb}"</div>
          <div>{movie.Title} ({movie.Year})</div>
          <div>Reviews</div>
          <div>
              {reviews.map(review =>
                <div key={review.id}>Username: {review.username} | Body: {review.body}</div>
                )}
                <div/>
          </div>
          <form onSubmit={handleSubmit} id="form">
            <input onChange={handleFormChange} name="body" type="text" />
            <button type="submit">Post</button>
          </form>
        </>
      ) : (
        <>
          <div id="loading">not logged in</div>
        </>
      )}
    </>
  );
}
