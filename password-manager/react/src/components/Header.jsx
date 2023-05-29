import {Col, Image, Nav, Navbar, NavLink, Row} from "react-bootstrap";
import logo from "../assets/icon.png";
import {Link, useNavigate} from "react-router-dom";
import {useCurrentUserContext} from "../context/CurrentUserProvider.jsx";
import passwd from "../api/passwd.js";

const Header = () => {

    const { user, setToken } = useCurrentUserContext();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await passwd.delete('/logout');

            navigate('/');
            setToken(null, null);
        } catch (e) {
            console.log(e);
        }
    };

    return <header className="h-auto flex-fill border-bottom border-black">
        <Row className="justify-content-sm-center p-2">
            <Col xl={1} md={2} sm={2} xs={9}>
                <Link to="/">
                    <Image src={logo} alt="PASSWD" fluid style={{minWidth: "10px", maxWidth: "90px"}}/>
                </Link>
            </Col>
            <Col xl={4}  md={4} sm={5} className="d-none d-sm-flex justify-content-sm-end justify-content-md-start align-items-sm-start align-items-md-center">
                <Link to="/" className="text-decoration-none text-black text-opacity-75">
                    <h3 className="text-center text-lg"><strong>PASSWD</strong> <br/> Password Manager</h3>
                </Link>
            </Col>
            <Col md={4} sm={5} xs={3}>
                <Navbar collapseOnSelect expand="md" className="h-100 d-flex justify-content-end">
                    <Navbar.Toggle aria-controls="navbarScroll" data-bs-target="#navbarScroll"/>
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="w-100 justify-content-end text-right pr-2">
                            {!user ?
                                <>
                                    <NavLink active eventKey="1" as={Link} to="/login"><h4>Login</h4></NavLink>
                                    <NavLink active eventKey="2" as={Link} to="/register"><h4>Register</h4></NavLink>
                                </>
                                :
                                <>
                                    <NavLink active eventKey="3" as={Link} to="/panel"><h4>Panel</h4></NavLink>
                                    {user.is_admin === 1 && <NavLink active eventKey="6" as={Link} to="/admin-panel"><h4>Admin panel</h4></NavLink>}
                                    <NavLink active eventKey="4" as={Link} to="/account"><h4>Account</h4></NavLink>
                                    <NavLink active eventKey="5" onClick={handleLogout}><h4>Logout</h4></NavLink>
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
