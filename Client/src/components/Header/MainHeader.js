import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";

import UserContext from "../user-context";

const MainHeader = () => {
  const UserCtx = useContext(UserContext);
  const isLogin = UserCtx.loginStatus;

  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        {isLogin && <Link to="/" className="navbar-brand">
          Home
        </Link>}
        <Nav className="me-auto">
          {isLogin && <Link to='/compose-mail' className="nav-link">Compose Mail</Link>}
          {!isLogin && <Link to="/signup" className="nav-link">Signup</Link>}
          {!isLogin && <Link to="/login" className="nav-link">Login</Link>}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MainHeader;
