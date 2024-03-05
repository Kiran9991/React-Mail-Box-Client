import { Navbar, Container, Nav, Tabs, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

const MainHeader = () => {

  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Link to="/signup" className="navbar-brand">
          Home
        </Link>
        <Nav className="me-auto">
          <Link to="/signup" className="nav-link">Signup</Link>
          <Link to="/login" className="nav-link">Login</Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MainHeader;
