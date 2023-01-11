import { useState } from "react";
import { useToken } from "../Auth";

export default function Login() {
  const [token, login] = useToken();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    document.getElementById("form").reset();
    login(formData.username, formData.password);
  };

  return (
    <>
      <div>login</div>
      <form onSubmit={handleSubmit} id="form">
        <input
          onChange={handleFormChange}
          placeholder="user"
          required
          type="text"
          name="username"
        />
        <input
          onChange={handleFormChange}
          placeholder="pass"
          required
          type="text"
          name="password"
        />
        <button type="submit">Log In</button>
      </form>
    </>
  );
}
