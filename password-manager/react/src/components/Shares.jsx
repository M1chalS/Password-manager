import PasswdTable from "./PasswdTable.jsx";
import {Button, Container} from "react-bootstrap";
import {useEffect, useState} from "react";
import passwd from "../api/passwd.js";
import PasswordModal from "./PasswordModal.jsx";
import CreateShareModal from "./CreateShareModal.jsx";

const Shares = () => {

    const [shares, setShares] = useState([]);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showCreateShareModal, setShowCreateShareModal] = useState(false);
    const [currentPassword, setCurrentPassword] = useState(null);
    const [loading, setLoading] = useState(true);

    const getShares = async () => {
        try {
            setLoading(true);
            const response = await passwd.get("/shares");
            setShares(response.data);
            setLoading(false);
        } catch (e) {
            setLoading(false);
            console.log(e);
        }
    }

    const openPasswordModal = id => {
        setCurrentPassword(id);
        setShowPasswordModal(true);
    };

    useEffect(() => {
        getShares();
    }, []);

    const sharesTableConfig = [
        {
            label: "Password name",
            render: (data) => <span className="cursor-pointer fw-semibold"
                                    onClick={() => openPasswordModal(data.password.id)}>{data.password.name}</span>,
        },
        {
            label: "Shared at",
            render: (data) => `${new Date(data.created_at).toLocaleTimeString()} on ${new Date(data.created_at).toLocaleDateString()}`,
        },
        {
            label: "Shared to",
            render: (data) => data.user.name + " " + data.user.last_name,
        }
    ];

    const keyFn = (data) => data.id;

    return <Container fluid className="w-50 d-flex flex-column align-items-center">
            {loading ? <h1 className="text-center mt-1">Loading...</h1> :
            <>
                <h1 className="text-center mt-1">Your shares</h1>
                <Button variant="success" className="w-50 my-2" onClick={() => setShowCreateShareModal(true)}>Share your password</Button>
                {(shares && shares.length > 0) ?
                    <PasswdTable data={shares} config={sharesTableConfig} keyFn={keyFn} editOn={false}/> :
                    <h4 className="text-center my-2">You have no shares</h4>}
                {showPasswordModal && <PasswordModal show={showPasswordModal} onClose={() => setShowPasswordModal(false)} passwordId={currentPassword}/>}
                {showCreateShareModal && <CreateShareModal show={showCreateShareModal} onClose={() => setShowCreateShareModal(false)} getData={getShares}/>}
            </>}
    </Container>
}

export default Shares;
