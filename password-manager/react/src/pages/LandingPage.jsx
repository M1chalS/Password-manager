import {Button, Container, Image} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useCurrentUserContext} from "../context/CurrentUserProvider.jsx";
import instagram from "../assets/instagram.svg";
import twitter from "../assets/twitter.svg";

const LandingPage = () => {

    const {user} = useCurrentUserContext();

    return <Container fluid className="text-center d-flex justify-content-center align-items-center flex-column h-100"
                      style={{paddingTop: "5%", paddingBottom: "5%"}}>
        <h1 className="my-4">Welcome to <strong>PASSWD</strong>👋</h1>
        <h4 className="font-weight-light my-4">The <strong>secure</strong> password sharing system <br/> for all size
            organizations</h4>
        <p className="my-4" style={{maxWidth: "36%"}}>Safely store and share your passwords thanks to our advanced two
            way encryption
            algorithm🔒. PASSWD guaranties safety and ease of use.</p>
        {!user ? <Button to="/register" as={Link} type="button" variant="primary" className="my-4" value="" size="lg">
                {`>Get started today<`}
            </Button> :
            <Button to="/panel" as={Link} type="button" variant="success" className="my-4" value="" size="lg">
                {`>Enter your panel<`}
            </Button>
        }
        <p className="w-50 justify-self-end mt-2">
            Follow us on: <br className="d-sm-none d-block"/>
            <Link to="https://www.instagram.com/" target="_blank">
                <Image className="mx-2"
                       src={instagram}
                       width="30px"/>
            </Link>
            <Link to="https://www.twitter.com" target="_blank">
                <Image className="mx-2"
                       src={twitter}
                       width="30px"/>
            </Link>
        </p>
    </Container>;
}

export default LandingPage;
