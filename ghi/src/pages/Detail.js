import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Detail() {
  let [token, setToken] = useState("");
  let [loggedIn, setLoggedIn] = useState(false);
  let { imdb } = useParams();
  const [formData, setFormData] = useState({
    imdb: imdb,
    body: "",
    username: "",
  });

  useEffect(() => {
    async function getData() {
      const url = `${process.env.REACT_APP_RIPE_TOMATOES_API_HOST}/token`;
      const response = await fetch(url, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setLoggedIn(true);
        setToken(data.access_token);
        formData.username = data.user.username;
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
      document.getElementById("form").reset();
    } else {
      console.log("Failed to post review");
    }
  };

  return (
    <>
      {loggedIn ? (
        <body>
          <div>detail page || imdb is "{imdb}"</div>
          <form onSubmit={handleSubmit} id="form">
            <input onChange={handleFormChange} name="body" type="text" />
            <button type="submit">Post</button>
          </form>
        </body>
      ) : (
        <body>
          <div id="loading">not logged in</div>
        </body>
      )}
    </>
  );
}
