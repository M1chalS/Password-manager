import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";
import {Col, Container, Row} from "react-bootstrap";
import Footer from "../components/Footer.jsx";

const MainLayout = () => {
    return <div className="overflow-hidden">
        <Header />
        <Outlet/>
        <Footer />
    </div>;
}

export default MainLayout;
