import { useContext, useRef, useState } from "react";
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../store/user-context";

const Login = () => {
  const [isSending, setIsSending] = useState(false);
  const history = useHistory();
  const userCtx = useContext(UserContext);

  const emailRef = useRef();
  const passwordRef = useRef();

  const submitFormHandler = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const obj = {
      email,
      password,
    };

    setIsSending(true);

    try {
      const res = await fetch("http://localhost:4000/user/login", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        localStorage.setItem('userName', data.email);
        emailRef.current.value = "";
        passwordRef.current.value = "";
        history.replace('/');
        userCtx.setLogin(true);
      }else {
        if(data.message.includes('Email')) {
          emailRef.current.value = "";
          throw new Error(data.message);
        }else {
          throw new Error(data.message);
        }
      }

      localStorage.setItem('token', data.idToken);
      
    } catch (error) {
      console.log(error);
      alert(`Error: ${error.message}`)
    }

    setIsSending(false);

    passwordRef.current.value = "";
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ height: "90vh" }}
    >
      <Row>
        <Col md={80}>
          <Form
            className="p-4 rounded"
            style={{ backgroundColor: "#e1f5fe", width: "25rem" }}
            onSubmit={submitFormHandler}
          >
            <Form.Group className="mb-3 text-center" controlId="formTitle">
              <Form.Label className="h3">Login</Form.Label>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email Id</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email id"
                ref={emailRef}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                ref={passwordRef}
              />
            </Form.Group>

            <div className="d-grid gap-2">
              {!isSending && (
                <Button variant="primary" type="submit" className="mt-3">
                  Login
                </Button>
              )}
              {isSending && <p style={{"text-align":"center"}}>Login up...</p>}
            </div>

            <p className="text-end mt-2 mb-0">
              Forgot <Link to="/forgotpassword">Password?</Link><Link className="ms-2" to="/signup">Sign up</Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
