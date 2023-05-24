import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";
import {Col, Container, Row} from "react-bootstrap";

const MainLayout = () => {
    return <div>
        <Header />
        <Outlet/>
    </div>;
}

export default MainLayout;
