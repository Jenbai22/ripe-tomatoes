import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import "./detail.css";

export default function Detail() {
  const topRef = useRef(null);

  let [token, setToken] = useState("");
  let [loggedIn, setLoggedIn] = useState(false);

  let { imdb } = useParams();
  let [movie, setMovie] = useState([]);
  let [reviews, setReviews] = useState([]);

  let [isEditing, setIsEditing] = useState(false)
  let [reviewUnderEdit, setReviewUnderEdit] = useState(false)

  const [formData, setFormData] = useState({
    imdb: imdb,
    body: "",
    username: "",
    edited: 0
  });

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
              if (x.edited == 1) {
                x.edited = "(edited)"
                console.log(x)
              } else {
                x.edited = ""
              }
            }
            setReviews(data.reviews);
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
    if (isEditing) {
      formData.edited = 1
      e.preventDefault();
      const url = `${process.env.REACT_APP_RIPE_TOMATOES_API_HOST}/reviews/${reviewUnderEdit}`;
      console.log(url)
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token}`
        }});
      if (response.ok) {
        const data = await response.json();
        let r = [...reviews]
        let i = r.findIndex(x => x.id == reviewUnderEdit)
        r[i].body = data.body
        r[i].edited = "(edited)"
        setReviews(r)
        formData.body = ""

        setIsEditing(false)
        const editButton = document.querySelector(`#edit${reviewUnderEdit}`)
        editButton.classList.toggle('active')
        const postButton = document.querySelector('#post-button')
        postButton.classList.toggle('editingmode')
        postButton.innerHTML = "Post"
        const postArea = document.querySelector('#post-area')
        postArea.value = "";

      }
    } else {
      formData.edited = 0
      e.preventDefault();
      const config = {
        method: "post",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token}`,
        },
      };
      const response = await fetch("http://localhost:8000/reviews", config);
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
        formData.body = ""
        document.querySelector('#post-area').value = "";
        document.getElementById("form").reset();
        topRef.current?.scrollIntoView({ behavior: "smooth" });
      } else {
        console.log("Failed to post review");
      }
    }
  };

  const editingModeToggle = (e) => {
    const id = e.target.id

    const editButton = document.querySelector(`#${id}`)
    editButton.classList.toggle('active')
    const postButton = document.querySelector('#post-button')
    postButton.classList.toggle('editingmode')
    const postArea = document.querySelector('#post-area')

    if (isEditing == false) {
      setIsEditing(true)
      postButton.innerHTML = "Edit"
      let r = [...reviews];
      let i = r.findIndex(x => x.id == parseInt(id.slice(4)));
      postArea.value = r[i].body;
      setReviewUnderEdit(parseInt(id.slice(4)))
    } else {
      setIsEditing(false)
      postButton.innerHTML = "Post"
      postArea.value = "";
    }
  }

  const handleDelete = async (e) => {
    const id = e.target.id
    const url = `${process.env.REACT_APP_RIPE_TOMATOES_API_HOST}/reviews/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token}`
      }});
    if (response.ok) {
      let r = [...reviews]
      r.splice(r.findIndex(x => x.id == id), 1)
      setReviews(r)
    }
  }

  return (
    <>
      <main>
        <div id="row">
          <div id="column">
            <div id="movie-card">
              <div id="title">{movie.Title} ({movie.Year})</div>
                <div id="column-details">
                  <div id="poster">
                    <img src={movie.Poster}></img>
                  </div>
                  <div id="info">
                      <div>{movie.Genre}</div>
                      <div>{movie.Runtime}</div>
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
                if (review.username == formData.username) {
                  return (
                    <div id="review" key={review.id}>
                      <div id="username">{review.username}<span id="date"> {moment(review.posted).subtract(6, "hours").calendar()} {review.edited}</span>
                      <span>
                        <button className="delete-button" onClick={handleDelete} id={review.id}>delete</button>
                      </span>
                      <span>
                        <button className="edit-button" onClick={editingModeToggle} id={"edit" + review.id}>edit</button>
                      </span>
                    </div>
                      <div id="body">
                        {review.body}
                      </div>
                    </div>
                  );
                } else {
                  return (
                  <div id="review" key={review.id}>
                    <div id="username">{review.username}<span id="date"> {moment(review.posted).subtract(6, "hours").calendar()} {review.edited}</span></div>
                    <div>{review.body}</div>
                  </div>
                  )
                }
              })}
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
                id='post-area-denied'
                onChange={handleFormChange}
                name="body"
                type="text"
                placeholder="Sign up or login in to comment!"
                disabled
                />
            )}
            <button id="post-button" type="submit">Post</button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
