import {useEffect, useState} from "react";
import passwd from "../api/passwd.js";
import {Button, Col, Container, Row} from "react-bootstrap";
import PasswdTable from "./PasswdTable.jsx";
import PasswordModal from "./PasswordModal.jsx";
import CreatePasswordModal from "./CreatePasswordModal.jsx";
import {useWindowSizeContext} from "../context/WindowSizeProvider.jsx";
import {useInfoToastContext} from "../context/InfoToastProvider.jsx";

const Passwords = () => {
    const [passwords, setPasswords] = useState({});
    const [currentPassword, setCurrentPassword] = useState(null);
    const [showTime, setShowTime] = useState(true);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showCreatePasswordModal, setShowCreatePasswordModal] = useState(false);
    const [loading, setLoading] = useState(true);

    const {windowWidth} = useWindowSizeContext();
    const {setInfo} = useInfoToastContext();

    useEffect(() => {
        if (windowWidth < 768) {
            setShowTime(false);
        } else {
            setShowTime(true);
        }
    }, [windowWidth]);

    const getPasswords = async () => {
        try {
            setLoading(true);
            const response = await passwd.get("/passwords");
            setPasswords(response.data);
            setLoading(false);
        } catch (e) {
            setLoading(false);
            console.log(e);
        }
    }

    useEffect(() => {
        getPasswords();
    }, []);

    const handleDeletePassword = async (id) => {
        try {
            await passwd.delete(`/passwords/${id}`);

            setInfo("Password deleted successfully.");
            setPasswords({
                personal: passwords.personal.filter(password => password.id !== id),
                shared: passwords.shared,
            });
        } catch (e) {
            console.log(e);
        }
    }

    const handleEditPassword = async (e, data) => {
        try {
            await passwd.put(`/passwords/${data.id}`, {
                name: data.name,
            });

            setInfo("Password updated successfully.");
            setPasswords({ personal:
                passwords.personal.map(password => {
                    if (password.id === data.id) {
                        password.name = data.name;
                    }

                    return password;
                }),
                shared: passwords.shared,
            });
        } catch (e) {
            console.log(e);
        }

    }

    const handleDeleteShare = async (id) => {
        try {
            await passwd.delete(`/shares/password/${id}`);

            setInfo("Share deleted successfully.");
            setPasswords({
                personal: passwords.personal,
                shared: passwords.shared.filter(share => share.id !== id),
            });
        } catch (e) {
            console.log(e);
        }
    }

    const passwordsTableConfig = [
        {
            label: "Password name",
            render: (data) => <span className="cursor-pointer fw-semibold"
                                    onClick={() => openPasswordModal(data.id)}>{data.name}</span>,

            field: "name",
            type: "text",
        },
        {
            label: "Added on",
            render: (data) => `${new Date(data.created_at).toLocaleTimeString()} on ${new Date(data.created_at).toLocaleDateString()}`,
        }
    ];

    const openPasswordModal = id => {
        setCurrentPassword(id);
        setShowPasswordModal(true);
    };

    const sharedTableConfig = [];

    sharedTableConfig.push({
        label: "Password name",
        render: (data) => <span className="cursor-pointer fw-semibold"
                                onClick={() => openPasswordModal(data.id)}>{data.name}</span>,
    }, {
        label: "Shared to",
        render: (data) => data.user.name + " " + data.user.last_name,
    })

    if(showTime) {
        sharedTableConfig.push({
            label: "Shared at",
            render: (data) => `${new Date(data.created_at).toLocaleTimeString()} on ${new Date(data.created_at).toLocaleDateString()}`,
        });
    }

    const keyFnPasswords = (data) => data.id;
    const keyFnShared = (data) => data.id;

    const handleCreatePasswordModal = () => {
        setShowCreatePasswordModal(true);
    };

    return <Container fluid className="w-75">
        <Row>
            {loading ? <h1 className="text-center mt-1">Loading...</h1> :
            <><Col xs={12} md={6} className="mb-4">
                <h1 className="text-center mt-1">Your Passwords</h1>
                {(passwords?.personal && passwords.personal.length > 0) ?
                    <Container className="d-flex flex-column align-items-center">
                        <Button variant="primary" className="w-75 my-2" onClick={handleCreatePasswordModal}>Add new password</Button>
                        <PasswdTable data={passwords.personal} config={passwordsTableConfig} keyFn={keyFnPasswords}
                                     onDelete={handleDeletePassword} onEdit={handleEditPassword}/>
                    </Container> :
                    <Container className="d-flex text-center flex-column align-items-center">
                        <h4 className="my-2">You have no passwords</h4>
                        <Button variant="success" className="w-75 mt-2" onClick={handleCreatePasswordModal}>Create your first password</Button>
                    </Container>}
            </Col>
            <Col xs={12} md={6}>
                <h1 className="text-center mt-1">Passwords shared with you</h1>
                {passwords?.shared && passwords.shared.length > 0 ?
                    <PasswdTable data={passwords.shared} config={sharedTableConfig} keyFn={keyFnShared} editOn={false}
                                 onDelete={handleDeleteShare}/> :
                    <h4 className="text-center my-2">There are no passwords shared with you yet</h4>}
            </Col></>}
        </Row>
        {showPasswordModal && <PasswordModal show={showPasswordModal} onClose={() => setShowPasswordModal(false)} passwordId={currentPassword}/>}
        {showCreatePasswordModal && <CreatePasswordModal show={showCreatePasswordModal} onClose={() => setShowCreatePasswordModal(false)} getData={getPasswords} />}
    </Container>
}

export default Passwords;
