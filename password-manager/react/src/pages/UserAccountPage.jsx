import {Button, Container, Form} from "react-bootstrap";
import {useState} from "react";
import {useCurrentUserContext} from "../context/CurrentUserProvider.jsx";
import passwd from "../api/passwd.js";
import {useInfoToastContext} from "../context/InfoToastProvider.jsx";

const UserAccountPage = () => {

    const {user, setUser} = useCurrentUserContext();

    const [firstName, setFirstName] = useState(user.name);
    const [lastName, setLastName] = useState(user.last_name);
    const [email, setEmail] = useState(user.email);
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [errors, setErrors] = useState({});

    const { setInfo } = useInfoToastContext();

    const handleSubmitUserForm = async (e) => {
        e.preventDefault();

        try {
            const response = await passwd.put("/users/" + user.id, {
                name: firstName,
                last_name: lastName,
                email: email
            });

            setErrors({});
            setUser(response.data);
            setInfo("Your personal data has been changed successfully.");
        }
        catch (e) {
            setErrors(e.response.data.errors);
        }
    }

    const handleSubmitPasswordForm = async (e) => {
        e.preventDefault();

        try {
            await passwd.put("/users/password/" + user.id, {
                old_password: oldPassword,
                password,
                password_confirmation: passwordConfirmation,
            });

            setErrors({});
            setInfo("Your password has been changed successfully.");
        }
        catch (e) {
            setErrors(e.response.data.errors);
        }
    };

    return <Container fluid className="w-75">
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
                {errors?.name && <Form.Text className="text-danger">
                    {errors.name}
                </Form.Text>}
            </Form.Group>
            <Form.Group controlId="formBasicLastName" className="mb-4">
                <Form.Label>Last name</Form.Label>
                <Form.Control type="text" placeholder="Enter your last name"
                              value={lastName} onChange={(event) => setLastName(event.target.value)}/>
                {errors?.last_name && <Form.Text className="text-danger">
                    {errors.last_name}
                </Form.Text>}
            </Form.Group>
            <Form.Group controlId="formBasicEmail" className="mb-4">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email address"
                              value={email} onChange={(event) => setEmail(event.target.value)}/>
                {errors?.email && <Form.Text className="text-danger">
                    {errors.email}
                </Form.Text>}
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
                {errors?.old_password && <Form.Text className="text-danger">
                    {errors.old_password}
                </Form.Text>}
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="********"
                              value={password} onChange={(event) => setPassword(event.target.value)}/>
                {errors?.password && <Form.Text className="text-danger">
                    {errors.password}
                </Form.Text>}
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
