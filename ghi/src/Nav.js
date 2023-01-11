import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Navbar from "react-bootstrap/Navbar";
import { useState, useEffect } from "react";

function LoginModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Login</h4>
        <p>Login</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
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
    const response = await fetch("http://localhost:8000/token", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      console.log(response);
      setToken("");
    }
  };

  return (
    <>
      {token ? (
        <Navbar bg="dark">
          <button variant="primary" onClick={handleLogout}>
            Logout
          </button>
          <div>Hello {token.user.username}</div>
        </Navbar>
      ) : (
        <Navbar bg="dark">
          <Button variant="primary" onClick={() => setLoginModalShow(true)}>
            Login
          </Button>
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
