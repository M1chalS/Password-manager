import {Button, Container, Modal, OverlayTrigger, Tooltip} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import passwd from "../api/passwd.js";
import {FaCopy} from "react-icons/fa";

const PasswordModal = ({show, passwordId, onClose}) => {

    const [password, setPassword] = useState({});
    const [showDecryptedPassword, setShowDecryptedPassword] = useState(false);

    const blackBox = useRef();

    const getPassword = async () => {
        try {
            const response = await passwd.get(`/passwords/${passwordId}`);
            setPassword(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getPassword();
    }, []);


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
            <h4>Created by: {password.password.user.name} {password.password.user.last_name}</h4>

            <Container ref={blackBox} className="w-75 m-auto text-center pt-2 border-2 border-dark" style={{ height: "2rem"}} title={!showDecryptedPassword && ""}>
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
