import PasswdTable from "./PasswdTable.jsx";
import {Container} from "react-bootstrap";
import {useEffect, useState} from "react";
import passwd from "../api/passwd.js";
import PasswordModal from "./PasswordModal.jsx";

const Shares = () => {

    const [shares, setShares] = useState([]);
    const [show, setShow] = useState(false);
    const [currentPassword, setCurrentPassword] = useState(null);

    const getShares = async () => {
        try {
            const response = await passwd.get("/shares");
            setShares(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    const openPasswordModal = id => {
        setCurrentPassword(id);
        setShow(true);
    };

    useEffect(() => {
        getShares();
    }, []);

    const sharesTableConfig = [
        {
            label: "Password name",
            render: (data) => <span className="cursor-pointer fw-semibold" onClick={() => openPasswordModal(data.password.id)}>{data.password.name}</span>,
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

    return <Container fluid className="w-50">
        <h1 className="text-center mt-1">Your shares</h1>
        {(shares && shares.length > 0) ?
            <PasswdTable data={shares} config={sharesTableConfig} keyFn={keyFn}/> :
            <h4 className="text-center my-2">You have no shares</h4>}
        {show && <PasswordModal show={show} onClose={() => setShow(false)} passwordId={currentPassword}/>}
    </Container>
}

export default Shares;
