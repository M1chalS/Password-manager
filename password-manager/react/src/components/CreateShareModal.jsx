import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import passwd from "../api/passwd.js";
import {useInfoToastContext} from "../context/InfoToastProvider.jsx";

const CreateShareModal = ({show, onClose, getData}) => {

    const [passwords, setPasswords] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedPasswordId, setSelectedPasswordId] = useState(null);
    const [errors, setErrors] = useState({});

    const { setInfo } = useInfoToastContext();

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
            setInfo(e.response.data.message);
        }
    }

    const getUsers = async (query) => {
        try {
            if (query.length < 2) return setUsers([]);
            const response = await passwd.get("/users?search=" + query);
            setUsers(response.data);
        } catch (e) {
            setInfo(e.response.data.message);
        }
    }

    const handleSave = async () => {
        try {
            await passwd.post("/shares", {
                user_id: selectedUserId,
                password_id: selectedPasswordId
            });

            setErrors({});
            setInfo("Password shared successfully.");
            onClose();
            getData();
        } catch (e) {
            if(e.response.data.errors)
                setErrors(e.response.data.errors);
            else
                setErrors(e.response.data);
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
                            <Row className="text-left overflow-auto" style={{height: "20vh"}}>
                                {users.length > 0 ? users.map((user) => <Col xs={12} key={user.id}>
                                    <Button variant={selectedUserId === user.id ? "info" : "outline-dark"}
                                            style={{textAlign: "left"}}
                                            onClick={() => setSelectedUserId(user.id)}>{user.name} {user.last_name} ({user.email})</Button>
                                </Col>) : <Col>No users found</Col>}
                            </Row>
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword" className="mb-2">
                        <Form.Label>Select password you want to share</Form.Label>
                        <Form.Text>
                            <Row className="text-center overflow-auto" style={{height: "20vh"}}>
                                {passwords.length > 0 ? passwords.map((password) => <Col xs={6} key={password.id}>
                                    <Button variant={selectedPasswordId === password.id ? "info" : "outline-dark"} className="border-1 border-black w-100"
                                            onClick={() => setSelectedPasswordId(password.id)}>{password.name}</Button>
                                </Col>) : <Col>No passwords</Col>}
                            </Row>
                        </Form.Text>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Container fluid className="d-flex flex-row justify-content-between">
                    <div>
                        {errors.user_id && <p className="text-danger">{errors.user_id}</p>}
                        {errors.password_id && <p className="text-danger">{errors.password_id}</p>}
                        {errors.message && <p className="text-danger">{errors.message}</p>}
                    </div>
                    <div className="text-right">
                        <Button onClick={handleSave} className="mx-1">Save</Button>
                        <Button variant="danger" onClick={onClose} className="mx-1">Cancel</Button>
                    </div>
                </Container>
            </Modal.Footer></> : <Modal.Header closeButton>Ładowanie...</Modal.Header>}
    </Modal>
};

export default CreateShareModal;
