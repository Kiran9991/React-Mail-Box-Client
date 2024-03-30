import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from "../store/userSlice";

const MainHeader = () => {
  const dispatch = useDispatch()
  const isLogin = useSelector(state => state.user.loginStatus);
  const history = useHistory();
  const userName = localStorage.getItem('userName');

  const logoutHandler = () => {
    dispatch(userActions.setLoginStatus(false))
    localStorage.removeItem('userName');
    localStorage.removeItem('token');
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
            <Link to="/mail" className="nav-link">
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
        {isLogin && <div
          style={{
            "marginRight": "10px",
            background: "#d4d4f9",
            padding: "5px",
            "borderRadius": "20px",
            "paddingLeft": "30px",
            "paddingRight": "30px",
            "fontStyle": "italic",
          }}
        >
          <div>{userName}</div>
        </div>}
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
