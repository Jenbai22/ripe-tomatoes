import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import moment from "moment"
import "./detail.css";

export default function Detail() {
  const topRef = useRef(null)

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
          setToken(data);
          formData.username = data.user.username;
        }
      }
      response = await fetch(`${process.env.REACT_APP_RIPE_TOMATOES_API_HOST}/searchimdb/${imdb}`)
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
        Authorization: `Bearer ${token.access_token}`,
      },
    };
    const response = await fetch("http://localhost:8000/reviews", config);
    if (response.ok) {
      const d = await response.json()
      setReviews(prevState => [{id: d.id, body: d.body, imdb: d.imdb, posted: d.posted, username: d.username}, ...prevState]);
      document.getElementById("form").reset();
      topRef.current?.scrollIntoView({behavior: 'smooth'});
    } else {
      console.log("Failed to post review");
    }
  };

  function EditModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [review, setReview] = useState({
    body:"",
    username: ""
  });

  const handleFormChange = (e) => {
    setFormData({
      ...review,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    handleClose();
    e.preventDefault();

    const url = `${process.env.REACT_APP_RIPE_TOMATOES_API_HOST}/review`;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      }
    });
    if (response.ok) {
      setShow(false);
      const url = `${process.env.REACT_APP_RIPE_TOMATOES_API_HOST}/token`;
      let form = new FormData();
      form.append("username", formData.username);
      form.append("password", formData.password);
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        body: form,
      });
      if (response.ok) {
        window.location.reload();
        return;
      }
      return;
    }
  };

  return (
    <>
      {loggedIn ? (
        <main>
          <div id="row">
            <div id="column">
              <div id="movie-card">
                <div id="title">{movie.Title} ({movie.Year})</div>
                  <div id="poster">
                    <img src={movie.Poster}></img>
                  </div>
                  {/* <div id="details">
                    <div>{movie.Genre}</div>
                    <div>{movie.Runtime}</div>
                  </div> */}
                <div id="plot">{movie.Plot}</div>
              </div>
            </div>
            <div id="column">
              <div id="reviews-title">Reviews</div>
              <div id="reviews">
                <div ref={topRef}/>
                {reviews.map(review =>{
                  if (review.username == formData.username){
                    return (
                      <div id="review" key={review.id}>
                        <div id="username">
                          {review.username} (
                          {moment(review.posted)
                            .subtract(6, "hours")
                            .calendar()}
                          )
                        </div>
                        <div id="body">
                          {review.body}{" "}
                          <EditModal
                            show={editModalShow}
                            onHide={() => setEditModalShow(false)}
                          ></EditModal>
                        </div>
                      </div>
                    );
                  }
                  else {
                <div id="review" key={review.id}>

                  <div id="username">{review.username}<span id="date"> {moment(review.posted).subtract(6, 'hours').calendar()}</span></div>
                  <div>{review.body}</div>
                </div>
                }})}
              </div>
              <form id="form" onSubmit={handleSubmit}>
                <textarea onChange={handleFormChange} name="body" type="text" placeholder="What's on your mind~!" />
                <button type="submit">Post</button>
              </form>
            </div>
          </div>
        </main>
      ) : (
        <>
          <div id="loading">not logged in</div>
        </>
      )}
    </>
  );
}
