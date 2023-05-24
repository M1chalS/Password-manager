import {Button, Form} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import passwd from "../api/passwd.js";
import {useCurrentUserContext} from "../context/CurrentUserProvider.jsx";

const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { setToken } = useCurrentUserContext();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await passwd.post('/login', {
                email,
                password
            });

            setToken(response.data.token, response.data.user);

            navigate('/');
        } catch (e) {
            console.log(e);
        }

    }

    return  <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
                <Form.Text>
                    <h1 className="text-center">Login to your account</h1>
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail" className="mb-4">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email address"
                              value={email} onChange={(event) => {setEmail(event.target.value)}}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="********"
                              value={password} onChange={(event) => {setPassword(event.target.value)}}/>
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
