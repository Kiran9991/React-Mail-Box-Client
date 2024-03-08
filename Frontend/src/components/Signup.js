import { useRef, useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';

const Signup = () => {
  const [isSending, setIsSending] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const submitFormHandler = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    const obj = {
      email,
      password,
      confirmPassword,
    };

    setIsSending(true);

    try {
      const res = await fetch("http://localhost:4000/signup", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        emailRef.current.value = "";
        passwordRef.current.value = "";
        confirmPasswordRef.current.value = "";
      }else {
        if(data.message.includes('Email')) {
          emailRef.current.value = "";
          throw new Error(data.message);
        }else {
          throw new Error(data.message);
        }
      }

      console.log(data);
    } catch (error) {
      console.log(error);
      alert(`Error: ${error.message}`)
    }
      passwordRef.current.value = "";
      confirmPasswordRef.current.value = "";

    setIsSending(false);
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
              <Form.Label className="h3">Signup</Form.Label>
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

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter confirm password"
                ref={confirmPasswordRef}
              />
            </Form.Group>

            <div className="d-grid gap-2">
              {!isSending && (
                <Button variant="primary" type="submit" className="mt-3">
                  Sign Up
                </Button>
              )}
              {isSending && <p style={{"text-align":"center"}}>Signing Up...</p>}
            </div>
            <p className="text-end mt-2">
              Already Registerd <Link className="ms-2" to="/login">Login</Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
