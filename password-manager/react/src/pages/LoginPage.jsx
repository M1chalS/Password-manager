import {Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";

const LoginPage = () => {
    return  <Form>
            <Form.Group className="mb-4">
                <Form.Text>
                    <h1 className="text-center">Login to your account</h1>
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail" className="mb-4">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email address"/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control type="email" placeholder="********"/>
            </Form.Group>
            <div className="mb-4 text-center">
                <Button type="submit" size="lg">Log In</Button>
            </div>
            <div className="mb-4 text-center">
                <Link to="/register">Don't have an account? Register here!</Link>
            </div>
        </Form>;
}

export default LoginPage;
