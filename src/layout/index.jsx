import { Navbar, Container, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/auth/actions";

function Layout({ children }) {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOut());
  };
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#">
            <img src="./images/logo.png" width="100" alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Button
              variant="light"
              onClick={handleLogout}
            >
              Log Out
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="w-100 h-100">{children}</div>
    </>
  );
}

export default Layout;
