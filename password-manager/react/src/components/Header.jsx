import {Col, Container, Image, Nav, Navbar, NavLink, Row} from "react-bootstrap";
import logo from "../assets/icon.png";
import {Link} from "react-router-dom";
import {useCurrentUserContext} from "../context/CurrentUserProvider.jsx";

const Header = () => {

    const { user } = useCurrentUserContext();

    return <header className="h-auto bg-light flex-fill rounded-bottom border-bottom border-white">
        <Row className="justify-content-sm-center p-2">
            <Col xl={1} md={2} sm={2} className="d-none d-sm-block">
                <Link to="/">
                    <Image src={logo} alt="PASSWD" fluid style={{minWidth: "10px", maxWidth: "90px"}}/>
                </Link>
            </Col>
            <Col xl={3}  md={4} sm={5} xs={8} className="d-flex justify-content-sm-end justify-content-md-center align-items-sm-start align-items-md-center">
                <Link to="/" className="text-decoration-none text-black text-opacity-75">
                    <h3 className="text-center text-lg"><strong>PASSWD</strong> <br/> Password Manager</h3>
                </Link>
            </Col>
            <Col md={4} sm={5} xs={4}>
                <Navbar collapseOnSelect expand="md" className="h-100 d-flex justify-content-end">
                    <Navbar.Toggle aria-controls="navbarScroll" data-bs-target="#navbarScroll"/>
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="w-100 justify-content-end">
                            {!user ?
                                <>
                                    <NavLink active eventKey="1" as={Link} to="/login"><h4>Login</h4></NavLink>
                                    <NavLink active eventKey="2" as={Link} to="/register"><h4>Register</h4></NavLink>
                                </>
                                :
                                <>
                                    <NavLink active eventKey="3" as={Link} to="/account"><h4>Account</h4></NavLink>
                                    <NavLink active eventKey="4" as={Link} to="/panel"><h4>Panel</h4></NavLink>
                                </>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Col>
        </Row>
    </header>
}

export default Header;
