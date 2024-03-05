import { useRef, useState } from "react";

import { Container, Button, Row, Col, Form } from "react-bootstrap";

const Login = () => {
  const [isSending, setIsSending] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const submitFormHandler = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const obj = {
      email,
      password,
    };
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
              {isSending && <p>Loginning...</p>}
            </div>
            <div style={{ "text-align":"right"}}>
            <p><a href="/signup">Forgot Password</a></p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
