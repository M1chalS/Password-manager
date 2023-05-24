import {Button, Container, Form} from "react-bootstrap";
import {useState} from "react";
import {useCurrentUserContext} from "../context/CurrentUserProvider.jsx";

const UserAccountPage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const {user} = useCurrentUserContext();

    const handleSubmitUserForm = async (e) => {
        e.preventDefault();
    }

    const handleSubmitPasswordForm = async (e) => {
        e.preventDefault();
    };

    return <Container fluid className="w-75 mb-4">
                <h1 className="text-center text-black mt-2 mb-4">Welcome {user.name} {user.last_name}👋</h1>
        <Form onSubmit={handleSubmitUserForm}>
            <Form.Group className="my-4">
                <Form.Text>
                    <h2 className="text-center text-black">Change your personal data</h2>
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicFirstName" className="mb-4">
                <Form.Label>First name</Form.Label>
                <Form.Control type="text" placeholder="Enter your first name"
                              value={firstName} onChange={(event) => setFirstName(event.target.value)}/>
            </Form.Group>
            <Form.Group controlId="formBasicLastName" className="mb-4">
                <Form.Label>Last name</Form.Label>
                <Form.Control type="text" placeholder="Enter your last name"
                              value={lastName} onChange={(event) => setLastName(event.target.value)}/>
            </Form.Group>
            <Form.Group controlId="formBasicEmail" className="mb-4">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email address"
                              value={email} onChange={(event) => {
                    setEmail(event.target.value)
                }}/>
            </Form.Group>
            <div className="mb-4 text-center">
                <Button type="submit" size="lg">Change my personal data</Button>
            </div>
        </Form>
        <hr/>
        <Form onSubmit={handleSubmitPasswordForm}>
            <Form.Group className="my-4">
                <Form.Text>
                    <h2 className="text-center text-black">Change your password</h2>
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicOldPassword" className="mb-4">
                <Form.Label>Old Password</Form.Label>
                <Form.Control type="password" placeholder="********"
                              value={oldPassword} onChange={(event) => setOldPassword(event.target.value)}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="********"
                              value={password} onChange={(event) => setPassword(event.target.value)}/>
            </Form.Group>
            <Form.Group controlId="formBasicPasswordConfirmation" className="mb-4">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control type="password" placeholder="********"
                              value={passwordConfirmation} onChange={(event) => setPasswordConfirmation(event.target.value)}/>
            </Form.Group>
            <div className="mb-4 text-center">
                <Button type="submit" variant="danger" size="lg">Change my password</Button>
            </div>
        </Form>
        <hr style={{ marginBottom: "10vh" }}/>
    </Container>;
}

export default UserAccountPage;
