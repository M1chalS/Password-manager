import logoBanner from '../assets/passwd-logo-banner.png';
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const GuestHeader = () => {
    return <header className="d-flex justify-content-center align-items-center">
            <Link className="text-center mt-sm-5" to={"/"}>
                <Image src={logoBanner} alt="logo" fluid className="mx-auto"/>
            </Link>
    </header>;
}

export default GuestHeader;
