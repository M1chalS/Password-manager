import {Outlet} from "react-router-dom";
import GuestHeader from "../components/GuestHeader.jsx";
import Footer from "../components/Footer.jsx";
import {Col, Container, Row} from "react-bootstrap";

const GuestLayout = () => {
    return <Container fluid>
        <Row className="justify-content-sm-center" style={{height: '15vh'}}>
            <Col xs={12} sm={10} md={8} lg={7} xl={4}>
                <GuestHeader/>
            </Col>
        </Row>
        <Row className="flex-fill justify-content-center align-content-center" style={{height: '80vh'}}>
            <Col xs="8" xl="6">
                <Outlet />
            </Col>
        </Row>
        <Row style={{height: '5vh'}}>
            <Col>
                <Footer/>
            </Col>
        </Row>
    </Container>;
}

export default GuestLayout;
