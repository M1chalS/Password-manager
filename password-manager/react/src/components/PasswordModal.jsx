import {Button, Col, Container, Form, Modal, OverlayTrigger, Tooltip} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import passwd from "../api/passwd.js";
import {FaCopy} from "react-icons/fa";
import {useInfoToastContext} from "../context/InfoToastProvider.jsx";
import {MdModeEditOutline} from "react-icons/md";
import {ImCross, RxCross2} from "react-icons/all.js";

const PasswordModal = ({show, passwordId, onClose}) => {

    const [password, setPassword] = useState({});
    const [newPassword, setNewPassword] = useState("");
    const [showDecryptedPassword, setShowDecryptedPassword] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [showPassword, setShowPassword] = useState();
    const [errors, setErrors] = useState([]);
    const [passwordName, setPasswordName] = useState("");
    const [url, setUrl] = useState("");
    const [host, setHost] = useState("");
    const [username, setUsername] = useState("");
    const [port, setPort] = useState("");


    const {setInfo} = useInfoToastContext();

    const blackBox = useRef();

    const getPassword = async () => {
        try {
            const response = await passwd.get(`/passwords/${passwordId}`);
            setPassword(response.data);
            setNewPassword(response.data.decrypted_password);
        } catch (e) {
            setInfo(e.response.data.message);
        }
    }

    console.log(password);

    useEffect(() => {
        getPassword();
    }, []);

    useEffect(() => {
        setPasswordName(password.password?.name);
        setUrl(password.password?.type.data.url);
        setHost(password.password?.type.data.host);
        setUsername(password.password?.type.data.username);
        setPort(password.password?.type.data.port);
    }, [password]);

    const passType = password?.password && password.password.type.name;

    const handleSave = async () => {

        const data = {
            name: passwordName,
            password: newPassword,
            host: host,
            port: port,
            username: username,
            url: url
        }

        try {
            await passwd.put(`/passwords/${passwordId}`, data);
            setEditMode(false);
            setInfo("Password updated successfully.");
            getPassword();
        } catch (e) {
            setErrors(e.response.data.errors);
        }
    };

    return <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={onClose}
    >
        {password.password ? <><Modal.Header closeButton className="d-flex flex-row">
            <Modal.Title id="contained-modal-title-vcenter">
                <h2>Password:</h2> {editMode ? <Form.Control type="text" placeholder="Name" value={passwordName}
                                                    onChange={(event) => setPasswordName(event.target.value)}/>
                : password.password.name}
            </Modal.Title>
        </Modal.Header>
            <Modal.Body className="position-relative">
                <div className="position-absolute" style={{top: "0.5rem", right: "0.5rem"}}>
                    {editMode ? <RxCross2 className="cursor-pointer" style={{fontSize: "2rem"}}
                                          onClick={() => setEditMode(false)}/> :
                        <MdModeEditOutline className="cursor-pointer" style={{fontSize: "2rem"}}
                                           onClick={() => setEditMode(true)}/>}
                </div>
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
                        <Container ref={blackBox} className="w-75 mb-4 m-auto text-center pt-2 border-2 border-dark"
                                   style={{height: "2rem"}} title={!showDecryptedPassword && ""}>
                            <div onClick={() => setShowDecryptedPassword(true)}
                                 onMouseLeave={() => setShowDecryptedPassword(false)}>
                                {editMode ?
                                    <>
                                        <Container className="d-flex flex-row" fluid>
                                            <Col xs={8}>
                                                <Form.Control type={showPassword ? "text" : "password"}
                                                              placeholder="********"
                                                              value={newPassword} onChange={(event) => {
                                                    setNewPassword(event.target.value)
                                                }}/>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Check
                                                    className="text-left m-2"
                                                    onChange={() => setShowPassword(!showPassword)}
                                                    type="checkbox"
                                                    label="Show password"
                                                />
                                            </Col>
                                        </Container>
                                        {errors?.password && <Form.Text className="text-danger">
                                            {errors.password}
                                        </Form.Text>}
                                    </>
                                    : showDecryptedPassword ?
                                        <>
                                            <span>{password.decrypted_password}</span>
                                            <FaCopy className="cursor-pointer pl-1" onClick={() => {
                                                navigator.clipboard.writeText(password.decrypted_password)
                                            }}/>
                                        </> :
                                        <OverlayTrigger placement="bottom" overlay={
                                            <Tooltip id="tooltip-blackbox">
                                                Click to show password
                                            </Tooltip>}>
                                            <div style={{height: "2rem", backgroundColor: "black"}}/>
                                        </OverlayTrigger>}
                            </div>
                        </Container>
                    </Form.Group>
                    <Form.Group>
                        <h5>Password type:</h5>
                        <h6 className="pl-1">{passType === "application" ? "Application" : "SSH/FTP"}</h6>
                    </Form.Group>
                    {passType === "application" ?
                        <Form.Group className="mt-3">
                            <h5>URL:</h5>
                            {!editMode ? <h6 className="pl-1">{password.password.type.data.url}</h6> :
                                <Form.Control type="text" placeholder="url" value={url} className="w-75 m-auto"
                                                onChange={(event) => setUrl(event.target.value)}/>}
                        </Form.Group> :
                        <>
                            <Form.Group className="mt-3">
                                <h5>Host:</h5>
                                {!editMode ? <h6 className="pl-1">{password.password.type.data.host}</h6> :
                                    <Form.Control type="text" placeholder="host" value={host} className="w-75 m-auto"
                                                  onChange={(event) => setHost(event.target.value)}/>}
                            </Form.Group>
                            <Form.Group>
                                <h5>Port:</h5>
                                {!editMode ? <h6 className="pl-1">{password.password.type.data.port}</h6> :
                                    <Form.Control type="text" placeholder="port" value={port} className="w-75 m-auto"
                                                  onChange={(event) => setPort(event.target.value)}/>}
                            </Form.Group>
                            <Form.Group>
                                <h5>Username:</h5>
                                {!editMode ? <h6 className="pl-1">{password.password.type.data.username}</h6> :
                                    <Form.Control type="text" placeholder="username" value={username} className="w-75 m-auto"
                                                  onChange={(event) => setUsername(event.target.value)}/>}
                            </Form.Group>
                        </>}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {editMode && <Button variant="success" onClick={handleSave}>Save</Button>}
                <Button onClick={onClose}>Close</Button>
            </Modal.Footer></> : <Modal.Header closeButton>
            <Modal.Body id="contained-modal-title-vcenter">
                Ładowanie...
            </Modal.Body>
        </Modal.Header>}
    </Modal>
};

export default PasswordModal;
