import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import mainHeaderStyles from './MainHeader.module.css'
import { userActions } from "../store/user-slice";

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
        {isLogin && <div className={mainHeaderStyles.mainHeaderContainer}>
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
