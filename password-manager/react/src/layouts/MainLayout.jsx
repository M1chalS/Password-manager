import {Outlet} from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import {Container} from "react-bootstrap";

const MainLayout = () => {
    return <>
        <Header />
        <Container fluid className="main">
            <Outlet />
        </Container>
        <Footer />
    </>;
}

export default MainLayout;
