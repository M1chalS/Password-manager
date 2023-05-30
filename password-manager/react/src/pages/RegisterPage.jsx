import {Button, Form} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import passwd from "../api/passwd.js";
import {useInfoToastContext} from "../context/InfoToastProvider.jsx";

const RegisterPage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    const { setInfo } = useInfoToastContext();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== passwordConfirmation) {
            setErrors({
                password: "Passwords do not match",
            });
            return;
        }

        try {
            await passwd.post("/users", {
                "name": firstName,
                "last_name": lastName,
                email,
                password
            });

            setErrors({});
            setInfo("Your account has been created successfully. Now you can log in.");
            navigate('/login');
        }
        catch (error) {
            setErrors(error.response.data.errors);
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
                {errors?.name && <Form.Text className="text-danger">
                    {errors.name}
                </Form.Text>}
            </Form.Group>
            <Form.Group controlId="formBasicLastName" className="mb-4">
                <Form.Label>Your last name</Form.Label>
                <Form.Control type="text" placeholder="Enter your last name"
                              value={lastName} onChange={(event) => {setLastName(event.target.value)}}/>
                {errors?.last_name && <Form.Text className="text-danger">
                    {errors.last_name}
                </Form.Text>}
            </Form.Group>
            <Form.Group controlId="formBasicEmail" className="mb-4">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email address"
                              value={email} onChange={(event) => {setEmail(event.target.value)}}/>
                {errors?.email && <Form.Text className="text-danger">
                    {errors.email}
                </Form.Text>}
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="********"
                              value={password} onChange={(event) => {setPassword(event.target.value)}}/>
                {errors?.password && <Form.Text className="text-danger">
                    {errors.password}
                </Form.Text>}
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
