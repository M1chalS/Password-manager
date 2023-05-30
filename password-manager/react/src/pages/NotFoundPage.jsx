import {Container} from "react-bootstrap";
import {Link} from "react-router-dom";

const NotFoundPage = () => {
    return <Container fluid className="text-center mt-5">
        <h1>404</h1>
        <h2>Page not found...</h2>
        <Link to="/">Go back to home page</Link>
    </Container>
}

export default NotFoundPage;
