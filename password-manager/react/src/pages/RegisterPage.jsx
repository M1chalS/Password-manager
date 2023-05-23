import {Button, Form} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import passwd from "../api/passwd.js";

const RegisterPage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Form submitted");

        if(password !== passwordConfirmation) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await passwd.post("/users", {
                "name": firstName,
                "last_name": lastName,
                email,
                password
            });

            console.log(response);
            navigate('/login');
        }
        catch (error) {
            console.log(error);
        }
    }

    return  <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
                <Form.Text>
                    <h1 className="text-center">Register your account</h1>
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicFirstName" className="mb-4">
                <Form.Label>Your first name</Form.Label>
                <Form.Control type="text" placeholder="Enter your first name"
                              value={firstName} onChange={(event) => {setFirstName(event.target.value)}}/>
            </Form.Group>
            <Form.Group controlId="formBasicLastName" className="mb-4">
                <Form.Label>Your last name</Form.Label>
                <Form.Control type="text" placeholder="Enter your last name"
                              value={lastName} onChange={(event) => {setLastName(event.target.value)}}/>
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
            <Form.Group controlId="formBasicPasswordConfirmation" className="mb-4">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control type="password" placeholder="********"
                              value={passwordConfirmation} onChange={(event) => {setPasswordConfirmation(event.target.value)}}/>
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
