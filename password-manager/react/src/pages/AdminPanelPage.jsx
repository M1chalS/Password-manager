import {Link, Outlet} from "react-router-dom";
import {Container, Nav} from "react-bootstrap";

const AdminPanelPage = () => {
    return <Container fluid>
        <h1 className="text-center my-2">Welcome to <strong>PASSWD</strong> control panel!</h1>
        <Nav fill variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
                <Nav.Link as={Link} to="/admin-panel">Users</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/admin-panel/passwords">Passwords</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/admin-panel/shares">Shares</Nav.Link>
            </Nav.Item>
        </Nav>
        <Outlet />
    </Container>
}

export default AdminPanelPage;
