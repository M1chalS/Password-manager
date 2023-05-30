import {Outlet} from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const MainLayout = () => {
    return <>
        <Header />
        <Outlet/>
        <Footer />
    </>;
}

export default MainLayout;
