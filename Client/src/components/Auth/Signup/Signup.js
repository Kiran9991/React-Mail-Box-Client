import { useRef, useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import Loading from "../Loader/Loading";

const Signup = () => {
  const [isSending, setIsSending] = useState(false);
  const history = useHistory();

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const submitFormHandler = async (e) => {
    e.preventDefault();

    const obj = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
    };

    setIsSending(true);

    try {
      const res = await fetch("http://localhost:4000/user/signup", {
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
        history.replace("./login");
      } else {
        if (data.message.includes("Email")) {
          emailRef.current.value = "";
          throw new Error(data.message);
        } else {
          throw new Error(data.message);
        }
      }

      console.log(data);
    } catch (error) {
      console.log(error);
      alert(`Error: ${error.message}`);
    }
    passwordRef.current.value = "";
    confirmPasswordRef.current.value = "";

    setIsSending(false);
  };

  const formOjb = [
    {
      label: "Email Id",
      type: "email",
      placeholder: "Enter email id",
      ref: emailRef,
    },
    {
      label: "Password",
      type: "password",
      placeholder: "Enter password",
      ref: passwordRef,
    },
    {
      label: "Confirm Password",
      type: "password",
      placeholder: "Enter confirm password",
      ref: confirmPasswordRef,
    },
  ];

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

            {formOjb.map((form) => <Form.Group className="mb-3" key={Math.random()}>
              <Form.Label>{form.label}</Form.Label>
              <Form.Control
                type={form.type}
                placeholder={form.placeholder}
                ref={form.ref}
              />
            </Form.Group>)}


            <Loading
              isSending={isSending}
              buttonText={"Sign Up"}
              loadingText={"Signing up..."}
            />

            <p className="text-end mt-2 mb-0">
              Already Registerd{" "}
              <Link className="ms-2" to="/login">
                Login
              </Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
