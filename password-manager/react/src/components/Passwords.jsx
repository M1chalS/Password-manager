import {useEffect, useState} from "react";
import passwd from "../api/passwd.js";
import {Col, Container, Row} from "react-bootstrap";
import PasswdTable from "./PasswdTable.jsx";
import PasswordModal from "./PasswordModal.jsx";

const Passwords = () => {
    const [passwords, setPasswords] = useState([]);
    const [currentPassword, setCurrentPassword] = useState(null);
    const [show, setShow] = useState(false);

    const getPasswords = async () => {
        try {
            const response = await passwd.get("/passwords");
            setPasswords(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getPasswords();
    }, []);

    const passwordsTableConfig = [
        {
            label: "Password name",
            render: (data) => <span className="cursor-pointer fw-semibold" onClick={() => openPasswordModal(data.id)}>{data.name}</span>,
        },
        {
            label: "Added on",
            render: (data) => `${new Date(data.created_at).toLocaleTimeString()} on ${new Date(data.created_at).toLocaleDateString()}`,
        }
    ];

    const openPasswordModal = id => {
        setCurrentPassword(id);
        setShow(true);
    };

    const sharedTableConfig = [
        {
            label: "Password name",
            render: (data) => <span className="cursor-pointer fw-semibold" onClick={() => openPasswordModal(data.id)}>{data.name}</span>,
        },
        {
            label: "Shared at",
            render: (data) => `${new Date(data.created_at).toLocaleTimeString()} on ${new Date(data.created_at).toLocaleDateString()}`,
        },
        {
            label: "Shared by",
            render: (data) => data.user.name + " " + data.user.last_name,
        }
    ];

    const keyFnPasswords = (data) => data.id;
    const keyFnShared = (data) => data.id;

    return <Container fluid className="w-75">
        <Row>
            <Col>
                <h1 className="text-center mt-1">Your Passwords</h1>
                {(passwords?.personal && passwords.personal.length > 0) ?
                    <PasswdTable data={passwords.personal} config={passwordsTableConfig} keyFn={keyFnPasswords}/> :
                    <h4 className="text-center my-2">You have no passwords</h4>}
            </Col>
            <Col>
                <h1 className="text-center mt-1">Passwords shared with you</h1>
                {passwords?.shared && passwords.shared.length > 0 ?
                    <PasswdTable data={passwords.shared} config={sharedTableConfig} keyFn={keyFnShared}/> :
                    <h4 className="text-center my-2">There are no passwords shared with you yet</h4>}
            </Col>
        </Row>
        {show && <PasswordModal show={show} onClose={() => setShow(false)} passwordId={currentPassword}/>}
    </Container>
}

export default Passwords;
