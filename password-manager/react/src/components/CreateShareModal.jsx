import {Button, Col, Form, Modal, Row} from "react-bootstrap";
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
            if(query.length < 3) return setUsers([]);

            const response = await passwd.get("/users?search=" + query);
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
                        <Form.Control type="text" className="mb-2" placeholder="Enter name or email"
                                      onChange={(event) => {
                                          getUsers(event.target.value)
                                      }}/>
                        <Form.Text>
                            <Row>
                                {users.length > 0 ? users.map((user) => <Col xs={6} key={user.id}>
                                    {user.name} {user.last_name} ({user.email})
                                </Col>) : <Col>No users found</Col>}
                            </Row>
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword" className="mb-2">
                        <Form.Label>Select password you want to share</Form.Label>
                        <Form.Text>
                            <Row>
                                {passwords.length > 0 ? passwords.map((password) => <Col xs={4} key={password.id}>
                                    {password.name}
                                </Col>) : <Col>No passwords</Col>}
                            </Row>
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
