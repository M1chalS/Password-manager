import {Outlet} from "react-router-dom";
import GuestHeader from "../components/GuestHeader.jsx";
import Footer from "../components/Footer.jsx";
import {Col, Container, Row} from "react-bootstrap";

const GuestLayout = () => {
    return <Container fluid>
        <Row className="justify-content-sm-center mb-2">
            <Col xs={12} sm={9} md={7} lg={6} xl={3}>
                <GuestHeader/>
            </Col>
        </Row>
        <Row className="flex-fill justify-content-center align-content-center" style={{ minHeight: "68vh" }}>
            <Col xs="8" xl="6">
                <Outlet />
            </Col>
        </Row>
        <Row style={{height: '3vh'}}>
            <Col>
                <Footer/>
            </Col>
        </Row>
    </Container>;
}

export default GuestLayout;
