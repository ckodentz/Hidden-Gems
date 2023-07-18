import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useAuth } from "../auth";
import { useNavigate } from "react-router-dom";

function NavbarComp() {
    const auth = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        auth.logout();
        navigate("/");
    };
    return (
        <Navbar bg="dark" expand="sm">
            <Container fluid>
                <Navbar.Brand href="/" className="text-white">
                    Hidden Gems
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link className="text-white" href="/">
                            HOME
                        </Nav.Link>
                        {auth.userName && (
                            <Nav.Link className="text-white" href="/dashboard">
                                DASHBOARD
                            </Nav.Link>
                        )}
                        <Nav.Link className="text-white" href="/about">
                            ABOUT
                        </Nav.Link>
                        <Nav.Link className="text-white" href="/contactus">
                            CONTACT US
                        </Nav.Link>
                        {auth.userName && (
                            <Button
                                onClick={handleLogout}
                                className="text-white"
                            >
                                Log Out
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default NavbarComp;
