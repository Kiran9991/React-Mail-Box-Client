import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useContext } from "react";

import UserContext from "../store/user-context";

const MainHeader = () => {
  const UserCtx = useContext(UserContext);
  const isLogin = UserCtx.loginStatus;
  const history = useHistory();

  const logoutHandler = () => {
    UserCtx.setLogin(false);
    history.replace("/login");
  };

  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Nav className="me-auto">
          {isLogin && (
            <Link to="/" className="nav-link">
              Home
            </Link>
          )}
          {isLogin && (
            <Link to="/mails" className="nav-link">
              InBox
            </Link>
          )}
          {!isLogin && (
            <Link to="/signup" className="nav-link">
              Signup
            </Link>
          )}
          {!isLogin && (
            <Link to="/login" className="nav-link">
              Login
            </Link>
          )}
        </Nav>
        {isLogin && (
          <Button variant="secondary" onClick={logoutHandler}>
            Log out
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default MainHeader;
