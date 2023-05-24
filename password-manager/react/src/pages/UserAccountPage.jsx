import {Button, Container, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useState} from "react";
import {useCurrentUserContext} from "../context/CurrentUserProvider.jsx";
import passwd from "../api/passwd.js";

const UserAccountPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {user} = useCurrentUserContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    return <Container fluid className="w-75">
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
                <Form.Text>
                    <h1 className="text-center text-black mt-2">Welcome {user.name} {user.last_name}👋</h1>
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicFirstName" className="mb-4">
                <Form.Label>First name</Form.Label>
                <Form.Control type="text" placeholder="Enter your first name"
                              value={email} onChange={(event) => {
                    setEmail(event.target.value)
                }}/>
            </Form.Group>
            <Form.Group controlId="formBasicLastName" className="mb-4">
                <Form.Label>Last name</Form.Label>
                <Form.Control type="text" placeholder="Enter your last name"
                              value={email} onChange={(event) => {
                    setEmail(event.target.value)
                }}/>
            </Form.Group>
            <Form.Group controlId="formBasicEmail" className="mb-4">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email address"
                              value={email} onChange={(event) => {
                    setEmail(event.target.value)
                }}/>
            </Form.Group>
        </Form>
        <hr/>
        <Form>
            <Form.Group controlId="formBasicPassword" className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="********"
                              value={password} onChange={(event) => {
                    setPassword(event.target.value)
                }}/>
            </Form.Group>
            <Form.Group controlId="formBasicPasswordConfirmation" className="mb-4">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control type="password" placeholder="********"
                              value={password} onChange={(event) => {
                    setPassword(event.target.value)
                }}/>
            </Form.Group>
            <div className="mb-4 text-center">
                <Button type="submit" size="lg">Log In</Button>
            </div>
            <div className="mb-4 text-center">
                <Link to="/register">Don't have an account? Register here!</Link>
            </div>
        </Form>
    </Container>;
}

export default UserAccountPage;
