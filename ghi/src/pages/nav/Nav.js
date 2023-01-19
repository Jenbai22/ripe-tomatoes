import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./nav.css";

function LoginModal() {
  const [show, setShow] = useState(false);
  const [alertShow, setAlertShow] = useState(false);
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
    e.preventDefault();
    document.getElementById("form").reset();

    const url = `${process.env.REACT_APP_RIPE_TOMATOES_API_HOST}/token`;
    const form = new FormData();
    form.append("username", formData.username);
    form.append("password", formData.password);
    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      body: form,
    });
    if (response.ok) {
      handleClose();
      window.location.reload();
      return;
    } else {
      setAlertShow(true);
      setTimeout(() => {
        setAlertShow(false);
      }, "5000");
    }
  };
  return (
    <>
      <div onClick={handleShow}>sign in</div>

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
            {alertShow && (
              <Alert variant={"danger"}>Invalid username or password</Alert>
            )}
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

function SignupModal() {
  const [signupFail, setSignupFail] = useState(false);
  const [characterFail, setCharacterFail] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
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
    if (Object.values(formData).includes("")) {
      setCharacterFail(true);
      setTimeout(() => {
        setCharacterFail(false);
      }, "5000");
    } else {
      try {
        let url = `${process.env.REACT_APP_RIPE_TOMATOES_API_HOST}/users`;
        let response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          setShow(false);
          let url = `${process.env.REACT_APP_RIPE_TOMATOES_API_HOST}/token`;
          let form = new FormData();
          form.append("username", formData.username);
          form.append("password", formData.password);
          let response = await fetch(url, {
            method: "POST",
            credentials: "include",
            body: form,
          });
          if (response.ok) {
            window.location.reload();
            document.getElementById("form").reset();
            handleClose();
            return;
          }
        }
      } catch {
        setSignupFail(true);
        setTimeout(() => {
          setSignupFail(false);
        }, "5000");
      }
    }
  };

  return (
    <>
      <div onClick={handleShow}>sign up</div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="form">
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput1"
              onChange={handleFormChange}
            >
              <Form.Label>Firstname</Form.Label>
              <Form.Control name="firstname" type="text" autoFocus />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput2"
              onChange={handleFormChange}
            >
              <Form.Label>Lastname</Form.Label>
              <Form.Control name="lastname" type="text" autoFocus />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput3"
              onChange={handleFormChange}
            >
              <Form.Label>Email</Form.Label>
              <Form.Control name="email" type="text" autoFocus />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput4"
              onChange={handleFormChange}
            >
              <Form.Label>Username</Form.Label>
              <Form.Control name="username" type="text" autoFocus />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput5"
              onChange={handleFormChange}
            >
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" autoFocus />
            </Form.Group>
            {signupFail && (
              <Alert variant={"danger"}>Username or email already exists</Alert>
            )}
            {characterFail && <Alert variant={"danger"}>No empty fields</Alert>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="secondary" onClick={handleSubmit}>
            Sign Up
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function Nav() {
  const [token, setToken] = useState("");
  const [loginModalShow, setLoginModalShow] = useState(false);
  const [signupModalShow, setSignupModalShow] = useState(false);

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
      window.location.reload();
    }
  };

  return (
    <>
      {token ? (
        <header>
          <nav>
            <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
              <h1>RIPE TOMATOES</h1>
            </Link>
            <div className="menu">
              <Link to={"/favorites"} style={{ textDecoration: "none", color: "white" }}>
                <div>your favorites</div>
              </Link>
              <div>logged in as [ {token.user.username} ]</div>
              <div onClick={handleLogout}>logout</div>
            </div>
          </nav>
        </header>
      ) : (
        <>
          <header>
            <nav>
              <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
                <h1>RIPE TOMATOES</h1>
              </Link>
              <div className="menu">
                <LoginModal
                  show={loginModalShow}
                  onHide={() => setLoginModalShow(false)}
                ></LoginModal>
                <SignupModal
                  show={signupModalShow}
                  onHide={() => setSignupModalShow(false)}
                ></SignupModal>
              </div>
            </nav>
          </header>
        </>
      )}
    </>
  );
}

export default Nav;
