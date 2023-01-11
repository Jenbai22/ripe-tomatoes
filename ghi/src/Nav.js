import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";

function LoginModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
    handleClose();
    e.preventDefault();
    document.getElementById("form").reset();

    const url = `${process.env.REACT_APP_RIPE_TOMATOES_API_HOST}/token`;
    const form = new FormData();
    form.append("username", formData.username);
    form.append("password", formData.password);
    console.log(formData.username);
    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      body: form,
    });
    if (response.ok) {
      const data = await response.json();
      window.location.reload();
      return;
    }
  };

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Login
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="form">
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput1"
              onChange={handleFormChange}
            >
              <Form.Label>Username</Form.Label>
              <Form.Control name="username" type="text" autoFocus />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
              onChange={handleFormChange}
            >
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" autoFocus />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="secondary" onClick={handleSubmit}>
            Sign In
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function Nav() {
  const [token, setToken] = useState("");
  const [loginModalShow, setLoginModalShow] = useState(false);

  useEffect(() => {
    async function getData() {
      const url = `${process.env.REACT_APP_RIPE_TOMATOES_API_HOST}/token`;
      const response = await fetch(url, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setToken(data);
      }
    }
    getData();
  }, []);

  const handleLogout = async () => {
    if (token) {
      const url = `${process.env.REACT_APP_RIPE_TOMATOES_API_HOST}/token`;
      await fetch(url, { method: "delete", credentials: "include" });
      setToken(null);
    }
  };

  return (
    <>
      {token ? (
        <Navbar bg="dark" variant="dark">
          <Button pull-right variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
          <div
            style={{
              fontSize: "20px",
              color: "white",
              marginLeft: "auto",
              marginRight: "20px",
            }}
          >
            hi {token.user.username}
          </div>
        </Navbar>
      ) : (
        <Navbar bg="dark">
          <LoginModal
            show={loginModalShow}
            onHide={() => setLoginModalShow(false)}
          ></LoginModal>
        </Navbar>
      )}
    </>
  );
}

export default Nav;
