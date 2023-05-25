import {Button, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import passwd from "../api/passwd.js";
import {FaCopy} from "react-icons/fa";

const PasswordModal = ({show, passwordId, onClose}) => {

    const [password, setPassword] = useState({});
    const [showDecryptedPassword, setShowDecryptedPassword] = useState(false);

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
                Podgląd hasła: {password.password.name}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h4>Utworzone przez: {password.password.user.name} {password.password.user.last_name}</h4>
            <div className="m-auto text-center pt-2 border-2 border-dark" style={{ height: "2rem", width: "32rem" }} title={!showDecryptedPassword && "Kliknij aby odsłonić hasło"}>
                <div onClick={() => setShowDecryptedPassword(true)}
                     onMouseLeave={() => setShowDecryptedPassword(false)}>
                {showDecryptedPassword ?
                    <><span>{password.decrypted_password}</span> <FaCopy className="cursor-pointer"
                                                                         onClick={() => {navigator.clipboard.writeText(password.decrypted_password)}}
                                                                         title="Skopiuj hasło"/></> : //TODO lepsze tooltipy
                    <div style={{ width: "32rem", height: "2rem", backgroundColor: "black" }}/>}
                </div>
            </div>
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
