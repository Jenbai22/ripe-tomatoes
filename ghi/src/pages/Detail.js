import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import "./detail.css";
import ScaleLoader from "react-spinners/ScaleLoader";

export default function Detail() {
  const topRef = useRef(null);

  let [loading, setLoading] = useState(true);

  let [token, setToken] = useState("");
  let [loggedIn, setLoggedIn] = useState(false);

  let { imdb } = useParams();
  let [movie, setMovie] = useState([]);
  let [reviews, setReviews] = useState([]);

  let [isEditing, setIsEditing] = useState(false);
  let [reviewUnderEdit, setReviewUnderEdit] = useState(false);

  let [isFavorited, setIsFavorited] = useState(false);
  let [favoritedId, setFavoritedId] = useState("");

  let [favorites, setFavorites] = useState(0);

  const [formData, setFormData] = useState({
    imdb: imdb,
    body: "",
    username: "",
    edited: 0,
  });

  const formBody = { body: "" };

  useEffect(() => {
    async function getData() {
      let url = `${process.env.REACT_APP_RIPE_TOMATOES_API_HOST}/token`;
      let response = await fetch(url, { credentials: "include" });
      if (response.ok) {
        let data = await response.json();
        if (data) {
          setLoggedIn(true);
          setToken(data);
          formData.username = data.user.username;
        }
      }
      response = await fetch(
        `${process.env.REACT_APP_RIPE_TOMATOES_API_HOST}/searchimdb/${imdb}`
      );
      if (response.ok) {
        const data = await response.json();
        setMovie(data);
        if (data.Response) {
          response = await fetch(
            `${process.env.REACT_APP_RIPE_TOMATOES_API_HOST}/reviews/${imdb}`
          );
          if (response.ok) {
            let data = await response.json();
            for (let x of data.reviews) {
              if (x.edited === 1) {
                x.edited = "(edited)";
              } else {
                x.edited = "";
              }
            }
            setReviews(data.reviews);
            response = await fetch(
              `${process.env.REACT_APP_RIPE_TOMATOES_API_HOST}/favorites/count/${formData.imdb}`
            );
            if (response.ok) {
              data = await response.json();
              setFavorites(data.favorites);
            }
            setLoading(false);
            if (formData.username !== "") {
              response = await fetch(
                `${process.env.REACT_APP_RIPE_TOMATOES_API_HOST}/favorites/${formData.username}`,
                { credentials: "include" }
              );
              if (response.ok) {
                const d = await response.json();
                const check = d.favorites.find(
                  ({ imdb }) => imdb === formData.imdb
                );
                if (check) {
                  const addButton = document.querySelector(".add-faves");
                  addButton.innerHTML = "Remove from favorites";
                  setFavoritedId(check.id);
                  setIsFavorited(true);
                }
              }
            }
          }
        }
      }
    }
    getData();
  }, [imdb, formData]);

  const handleFormChange = (e) => {
    formBody.body = e.target.value;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({ ...formData, body: formBody.body });
    formData.body = formBody.body;
    if (formData.body.length >= 1 && formData.body.length <= 1000) {
      if (isEditing) {
        formData.edited = 1;
        e.preventDefault();
        const url = `${process.env.REACT_APP_RIPE_TOMATOES_API_HOST}/reviews/${reviewUnderEdit}`;
        const response = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.access_token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          let r = [...reviews];
          let i = r.findIndex((x) => x.id === reviewUnderEdit);
          r[i].body = data.body;
          r[i].edited = "(edited)";
          setReviews(r);
          formData.body = "";

          setIsEditing(false);
          const editButton = document.querySelector(`#edit${reviewUnderEdit}`);
          editButton.classList.toggle("active");
          const postButton = document.querySelector("#post-button");
          postButton.classList.toggle("editingmode");
          postButton.innerHTML = "Post";
          const postArea = document.querySelector("#post-area");
          postArea.value = "";
        }
      } else {
        formData.edited = 0;
        e.preventDefault();
        const config = {
          method: "post",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.access_token}`,
          },
        };
        const response = await fetch(
          `${process.env.REACT_APP_RIPE_TOMATOES_API_HOST}/reviews`,
          config
        );
        if (response.ok) {
          const d = await response.json();
          setReviews((prevState) => [
            {
              id: d.id,
              body: d.body,
              imdb: d.imdb,
              posted: d.posted,
              username: d.username,
            },
            ...prevState,
          ]);
          formData.body = "";
          topRef.current?.scrollIntoView({ behavior: "smooth" });
          document.querySelector("#post-area").value = "";
          document.getElementById("review-form").reset();
        } else {
          const charError = document.querySelector(".post-fail-error");
          charError.classList.toggle("active");
          setTimeout(() => {
            charError.classList.toggle("active");
          }, "5000");
        }
      }
    } else {
      const charError = document.querySelector(".char-limit-error");
      charError.classList.toggle("active");
      setTimeout(() => {
        charError.classList.toggle("active");
      }, "5000");
    }
  };

  const editingModeToggle = (e) => {
    const id = e.target.id;

    const editButton = document.querySelector(`#${id}`);
    editButton.classList.toggle("active");
    const postButton = document.querySelector("#post-button");
    postButton.classList.toggle("editingmode");
    const postArea = document.querySelector("#post-area");

    if (isEditing === false) {
      setIsEditing(true);
      postButton.innerHTML = "Edit";
      let r = [...reviews];
      let i = r.findIndex((x) => x.id === parseInt(id.slice(4)));
      postArea.value = r[i].body;
      setReviewUnderEdit(parseInt(id.slice(4)));
    } else {
      setIsEditing(false);
      postButton.innerHTML = "Post";
      postArea.value = "";
    }
  };

  const addedToggle = async (e) => {
    e.preventDefault();

    if (isFavorited) {
      const url = `${process.env.REACT_APP_RIPE_TOMATOES_API_HOST}/favorites/${favoritedId}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token}`,
        },
      });
      if (response.ok) {
        setFavorites(favorites - 1);
        setIsFavorited(false);
        const addButton = document.querySelector(".add-faves");
        addButton.innerHTML = "Add to favorites";
      }
    } else {
      const favorite = {
        username: formData.username,
        imdb: formData.imdb,
        poster: movie.Poster,
      };
      const url = `${process.env.REACT_APP_RIPE_TOMATOES_API_HOST}/favorites`;
      const response = await fetch(url, {
        method: "post",
        body: JSON.stringify(favorite),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setFavorites(favorites + 1);
        setFavoritedId(data.id);
        setIsFavorited(true);
        const addButton = document.querySelector(".add-faves");
        addButton.innerHTML = "Remove from favorites";
      }
    }
  };

  const handleDelete = async (e) => {
    const id = e.target.id;
    const url = `${process.env.REACT_APP_RIPE_TOMATOES_API_HOST}/reviews/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token}`,
      },
    });
    if (response.ok) {
      let r = [...reviews];
      r.splice(
        r.findIndex((x) => x.id === Number(id)),
        1
      );
      setReviews(r);
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
        <main>
          <div id="row">
            <div id="column">
              <div id="movie-card">
                <div id="title">
                  {movie.Title} ({movie.Year})
                </div>
                <div id="column-details">
                  <div id="poster">
                    <img src={movie.Poster} alt="poster"></img>
                  </div>
                  <div id="info">
                    <div>{movie.Genre}</div>
                    <div>{movie.Runtime}</div>
                    {loggedIn ? (
                      <button className="add-faves" onClick={addedToggle}>
                        Add to Favorites
                      </button>
                    ) : (
                      <button className="add-faves-no-login">
                        Login to Favorite
                      </button>
                    )}
                    <div className="favorites-count">
                      <span style={{ color: "red" }}>{favorites}</span>{" "}
                      favorites
                    </div>
                  </div>
                </div>
                <div id="plot">{movie.Plot}</div>
              </div>
            </div>
            <div id="column">
              <div id="reviews-title">Reviews</div>
              <div id="reviews">
                <div ref={topRef} />
                {reviews.map((review) => {
                  if (review.username === formData.username) {
                    return (
                      <div id="review" key={review.id}>
                        <div id="username">
                          {review.username}
                          <span id="date">
                            {" "}
                            {moment(review.posted)
                              .subtract(6, "hours")
                              .calendar()}{" "}
                            {review.edited}
                          </span>
                          <span>
                            <button
                              className="delete-button"
                              onClick={handleDelete}
                              id={review.id}
                            >
                              delete
                            </button>
                          </span>
                          <span>
                            <button
                              className="edit-button"
                              onClick={editingModeToggle}
                              id={"edit" + review.id}
                            >
                              edit
                            </button>
                          </span>
                        </div>
                        <div id="body">{review.body}</div>
                      </div>
                    );
                  } else {
                    return (
                      <div id="review" key={review.id}>
                        <div id="username">
                          {review.username}
                          <span id="date">
                            {" "}
                            {moment(review.posted)
                              .subtract(6, "hours")
                              .calendar()}{" "}
                            {review.edited}
                          </span>
                        </div>
                        <div>{review.body}</div>
                      </div>
                    );
                  }
                })}
              </div>
              <div className="char-limit-error">
                Character limit between 1 and 1000
              </div>
              <div className="post-fail-error">
                Failed to post, please try again later
              </div>
              <form id="review-form" onSubmit={handleSubmit}>
                {loggedIn ? (
                  <textarea
                    id="post-area"
                    onChange={handleFormChange}
                    name="body"
                    type="text"
                    placeholder="What's on your mind~!"
                  />
                ) : (
                  <textarea
                    id="post-area-denied"
                    onChange={handleFormChange}
                    name="body"
                    type="text"
                    placeholder="Sign up or login in to comment!"
                    disabled
                  />
                )}
                {loggedIn ? (
                  <button id="post-button" type="submit">
                    Post
                  </button>
                ) : (
                  <button
                    id="post-button"
                    style={{ pointerEvents: "none", userSelect: "none" }}
                  >
                    Post
                  </button>
                )}
              </form>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
