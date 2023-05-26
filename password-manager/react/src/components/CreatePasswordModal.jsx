import {Button, Form, Modal} from "react-bootstrap";
import {useState} from "react";
import passwd from "../api/passwd.js";

const CreatePasswordModal = ({show, onClose, getData}) => {

    const [passwordName, setPasswordName] = useState("");
    const [password, setPassword] = useState("");

    const handleSave = async () => {

        try {
            const response = await passwd.post("/passwords", {
                name: passwordName,
                password: password
            });

            onClose();
            getData();
        } catch (e) {
            console.log(e);
        }
    };

    return <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={onClose}
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Add new password to your account
            </Modal.Title>
        </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicPasswordName" className="mb-4">
                    <Form.Label>Name of password</Form.Label>
                    <Form.Control type="text" placeholder="Enter name of your password"
                                  value={passwordName} onChange={(event) => {setPasswordName(event.target.value)}}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword" className="mb-4">
                    <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="********"
                                      value={password} onChange={(event) => {setPassword(event.target.value)}}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSave}>Save</Button>
                <Button variant="danger" onClick={onClose}>Cancel</Button>
            </Modal.Footer>
    </Modal>
};

export default CreatePasswordModal;
