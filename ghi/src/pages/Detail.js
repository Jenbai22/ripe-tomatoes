import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../Auth";

export default function Detail() {
  const { token } = useAuthContext();

  // const parseJwt = (token) => {
  //   if (!token) {
  //     return;
  //   }
  //   const base64Url = token.split(".")[1];
  //   const base64 = base64Url.replace("-", "+").replace("_", "/");
  //   return JSON.parse(window.atob(base64));
  // };

  // const username = parseJwt(token).account.username;

  let { imdb } = useParams();
  const [formData, setFormData] = useState({
    imdb: imdb,
    body: "",
    // username: username,
  });

  useEffect(() => {
    async function getData() {}
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
      <div>detail page || imdb is "{imdb}"</div>
      <form onSubmit={handleSubmit} id="form">
        <input onChange={handleFormChange} name="body" type="text" />
        <button type="submit">Post</button>
      </form>
    </>
  );
}
