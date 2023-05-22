import {Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";

const RegisterPage = () => {
    return  <Form>
            <Form.Group className="mb-4">
                <Form.Text>
                    <h1 className="text-center">Register your account</h1>
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail" className="mb-4">
                <Form.Label>Your first name</Form.Label>
                <Form.Control type="text" placeholder="Enter your first name"/>
            </Form.Group>
            <Form.Group controlId="formBasicEmail" className="mb-4">
                <Form.Label>Your last name</Form.Label>
                <Form.Control type="text" placeholder="Enter your last name"/>
            </Form.Group>
            <Form.Group controlId="formBasicEmail" className="mb-4">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email address"/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control type="email" placeholder="********"/>
            </Form.Group>
            <Form.Group controlId="formBasicPasswordConfirmation" className="mb-4">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control type="email" placeholder="********"/>
            </Form.Group>
            <div className="mb-4 text-center">
                <Button type="submit" size="lg">Sign Up</Button>
            </div>
            <div className="mb-4 text-center">
                <Link to="/login">
                    Already have an account? Sign In
                </Link>
            </div>
        </Form>;
}

export default RegisterPage;
