import {Button, Container, Form, Modal, OverlayTrigger, Tooltip} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import passwd from "../api/passwd.js";
import {FaCopy} from "react-icons/fa";
import {useInfoToastContext} from "../context/InfoToastProvider.jsx";

const PasswordModal = ({show, passwordId, onClose}) => {

    const [password, setPassword] = useState({});
    const [showDecryptedPassword, setShowDecryptedPassword] = useState(false);

    const {setInfo} = useInfoToastContext();

    const blackBox = useRef();

    const getPassword = async () => {
        try {
            const response = await passwd.get(`/passwords/${passwordId}`);
            setPassword(response.data);
        } catch (e) {
            setInfo(e.response.data.message);
        }
    }

    useEffect(() => {
        getPassword();
    }, []);

    const passType = password?.password && password.password.type.name;

    return <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={onClose}
    >
        {password.password ? <><Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Password: {password.password.name}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group>
                    <h5>Created by:</h5>
                    <h6 className="pl-1">{password.password.user.name} {password.password.user.last_name}</h6>
                </Form.Group>
                <Form.Group>
                    <h5>Created at:</h5>
                    <h6 className="pl-1">{new Date(password.password.created_at).toLocaleTimeString()} on {new Date(password.password.created_at).toLocaleDateString()}</h6>
                </Form.Group>
                <Form.Group>
                    <h4>Password:</h4>
                    <Container ref={blackBox} className="w-75 mb-4 m-auto text-center pt-2 border-2 border-dark" style={{ height: "2rem"}} title={!showDecryptedPassword && ""}>
                        <div onClick={() => setShowDecryptedPassword(true)}
                             onMouseLeave={() => setShowDecryptedPassword(false)}>
                            {showDecryptedPassword ?
                                <>
                                    <span>{password.decrypted_password}</span>
                                    <FaCopy className="cursor-pointer pl-1" onClick={() => {navigator.clipboard.writeText(password.decrypted_password)}}/>
                                </> :
                                <OverlayTrigger placement="bottom" overlay={
                                    <Tooltip id="tooltip-blackbox">
                                        Click to show password
                                    </Tooltip>}>
                                    <div style={{ height: "2rem", backgroundColor: "black" }}/>
                                </OverlayTrigger>}
                        </div>
                    </Container>
                </Form.Group>
                <Form.Group>
                    <h5>Password type:</h5>
                    <h6 className="pl-1">{passType === "application" ? "Application" : "SSH/FTP"}</h6>
                </Form.Group>
                {passType === "application" ? <Form.Group>
                    <h5>URL:</h5>
                    <h6 className="pl-1">{password.password.type.data.url}</h6>
                </Form.Group> : <>
                    <Form.Group>
                        <h5>Host:</h5>
                        <h6 className="pl-1">{password.password.type.data.host}</h6>
                    </Form.Group>
                    <Form.Group>
                        <h5>Port:</h5>
                        <h6 className="pl-1">{password.password.type.data.port}</h6>
                    </Form.Group>
                    <Form.Group>
                        <h5>Username:</h5>
                        <h6 className="pl-1">{password.password.type.data.username}</h6>
                    </Form.Group>
                </>}
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={onClose}>Close</Button>
        </Modal.Footer></> : <Modal.Header closeButton>
            <Modal.Body id="contained-modal-title-vcenter">
                Ładowanie...
            </Modal.Body>
        </Modal.Header>}
    </Modal>
};

export default PasswordModal;
