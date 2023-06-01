import {Button, Form, Modal} from "react-bootstrap";
import {useState} from "react";
import passwd from "../api/passwd.js";
import {useInfoToastContext} from "../context/InfoToastProvider.jsx";

const CreatePasswordModal = ({show, onClose, getData}) => {

    const [passwordName, setPasswordName] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [selected, setSelected] = useState("app");
    const [url, setUrl] = useState("");
    const [host, setHost] = useState("");
    const [port, setPort] = useState("");
    const [username, setUsername] = useState("");

    const {setInfo} = useInfoToastContext();

    const handleSave = async () => {

        const data = {
            name: passwordName,
            password: password
        }

        if (selected === "app") {
            data.type = "application";
            data.url = url;
        } else {
            data.type = "sshftp";
            data.host = host;
            data.port = port;
            data.username = username;
        }

        try {
            await passwd.post("/passwords", data);

            setErrors({});
            setInfo("Password created successfully.");
            onClose();
            getData();
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
                                  value={passwordName} onChange={(event) => {
                        setPasswordName(event.target.value)
                    }}/>
                    {errors?.name && <Form.Text className="text-danger">
                        {errors.name}
                    </Form.Text>}
                </Form.Group>
                <Form.Group controlId="formBasicPassword" className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="********"
                                  value={password} onChange={(event) => {
                        setPassword(event.target.value)
                    }}/>
                    {errors?.password && <Form.Text className="text-danger">
                        {errors.password}
                    </Form.Text>}
                </Form.Group>
                <Form.Label>Password type</Form.Label>
                <Form.Group controlId="formBasicType" className="mb-4">
                    <Form.Select aria-label="Default select example" onChange={(e) => setSelected(e.target.value)}>
                        <option value="app">Application</option>
                        <option value="sshftp">SSH/FTP</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId="formBasicTypeFields" className="mb-4">
                    {selected === "app" ? <>
                        <Form.Label>Url</Form.Label>
                        <Form.Control type="text" placeholder="Enter applications url"
                                      value={url} onChange={(event) => {
                            setUrl(event.target.value)
                        }}/>
                        {errors?.url && <Form.Text className="text-danger">
                            {errors.url}
                        </Form.Text>}
                    </> : <>
                    <Form.Label>Host</Form.Label>
                    <Form.Control type="text" placeholder="Enter hostname or ip"
                                  value={host} onChange={(event) => {
                        setHost(event.target.value)
                    }}/>
                    {errors?.host && <Form.Text className="text-danger">
                        {errors.host}
                    </Form.Text>}<br />
                    <Form.Label className="mt-2">Port</Form.Label>
                    <Form.Control type="text" placeholder="Enter servers port"
                                  value={port} onChange={(event) => {
                        setPort(event.target.value)
                    }}/>
                    {errors?.port && <Form.Text className="text-danger">
                        {errors.port}
                    </Form.Text>}<br />
                    <Form.Label className="mt-2">Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter servers username"
                                  value={username} onChange={(event) => {
                        setUsername(event.target.value)
                    }}/>
                    {errors?.username && <Form.Text className="text-danger">
                        {errors.username}
                    </Form.Text>} </>
                    }
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
