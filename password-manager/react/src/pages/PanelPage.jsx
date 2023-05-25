import {Container, Nav} from "react-bootstrap";
import {Link, Outlet} from "react-router-dom";

const PanelPage = () => {
    return <Container fluid>
        <h1 className="text-center my-2">Welcome to <strong>PASSWD</strong> control panel!</h1>
        <Nav fill variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
                <Nav.Link as={Link} to="/panel">Actions</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/panel/passwords">Passwords</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/panel/shares">Shares</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link disabled>
                    Organizations
                </Nav.Link>
            </Nav.Item>
        </Nav>
        <Outlet />
    </Container>
}

export default PanelPage;
