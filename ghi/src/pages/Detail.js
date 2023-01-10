import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../Auth";

export default function Detail() {
  const { token } = useAuthContext();
  let { imdb } = useParams();
  const [formData, setFormData] = useState({
    imdb: imdb,
    body: "",
    username: "",
  });

  useEffect(() => {
    async function getData() {
      console.log(imdb);
      console.log(token);
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
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch("http://localhost:8000/reviews");
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
      </form>
    </>
  );
}
