import {Button, Form, Modal, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import passwd from "../api/passwd.js";

const CreateShareModal = ({show, onClose, getData}) => {

    const [passwords, setPasswords] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedPasswordId, setSelectedPasswordId] = useState(null);

    useEffect(() => {
        getPasswords();
    }, []);

    const getPasswords = async () => {
        try {
            setLoading(true);
            const response = await passwd.get("/passwords");
            setPasswords(response.data.personal);
            setLoading(false);
        } catch (e) {
            setLoading(false);
            console.log(e);
        }
    }

    const getUsers = async (query) => {
        try {
            const response = await passwd.get("/users?query=" + query);
            setUsers(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    const handleSave = async () => {
        try {
            await passwd.post("/passwords", {
                user_id: selectedUserId,
                password_id: selectedPasswordId
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
        {!loading ? <><Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Share password with others
            </Modal.Title>
        </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicPasswordName" className="mb-4">
                        <Form.Label>Search person you want to share your password to</Form.Label>
                        <Form.Control type="text" placeholder="Enter name or email"
                                      onChange={(event) => {
                                          getUsers(event.target.value)
                                      }}/>
                        <Form.Text>
                            {users.length > 0 ? users.map((user) => <Row key={user.id}>
                                {user.name} {user.last_name}
                            </Row>) : <Row>No passwords</Row>}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword" className="mb-4">
                        <Form.Label>Select password you want to share</Form.Label>
                        <Form.Text>
                            {passwords.length > 0 ? passwords.map((password) => <Row key={password.id}>
                                {password.name}
                            </Row>) : <Row>No passwords</Row>}
                        </Form.Text>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSave}>Save</Button>
                <Button variant="danger" onClick={onClose}>Cancel</Button>
            </Modal.Footer></> : <Modal.Header closeButton>Ładowanie...</Modal.Header>}
    </Modal>
};

export default CreateShareModal;
