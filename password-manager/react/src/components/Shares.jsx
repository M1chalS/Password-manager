import PasswdTable from "./PasswdTable.jsx";
import {Button, Container} from "react-bootstrap";
import {useEffect, useState} from "react";
import passwd from "../api/passwd.js";
import PasswordModal from "./PasswordModal.jsx";
import CreateShareModal from "./CreateShareModal.jsx";
import {useWindowSizeContext} from "../context/WindowSizeProvider.jsx";

const Shares = () => {

    const [shares, setShares] = useState([]);
    const [showTime, setShowTime] = useState(true);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showCreateShareModal, setShowCreateShareModal] = useState(false);
    const [currentPassword, setCurrentPassword] = useState(null);
    const [loading, setLoading] = useState(true);

    const {windowWidth} = useWindowSizeContext();

    useEffect(() => {
        if (windowWidth < 768) {
            setShowTime(false);
        } else {
            setShowTime(true);
        }
    }, [windowWidth]);

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

    const sharesTableConfig = [];

    sharesTableConfig.push({
        label: "Password name",
        render: (data) => <span className="cursor-pointer fw-semibold"
                                onClick={() => openPasswordModal(data.password.id)}>{data.password.name}</span>,
    }, {
        label: "Shared to",
        render: (data) => data.user.name + " " + data.user.last_name,
    })

    if(showTime) {
        sharesTableConfig.push({
            label: "Shared at",
            render: (data) => `${new Date(data.created_at).toLocaleTimeString()} on ${new Date(data.created_at).toLocaleDateString()}`,
        });
    }

    const keyFn = (data) => data.id;

    return <Container fluid className="w-75 mb-5">
        {loading ? <h1 className="text-center mt-1">Loading...</h1> :
            <>
                <h1 className="text-center mt-1">Your shares</h1>
                <Container className="d-flex flex-column align-items-center">
                    <Button variant="success" className="w-100 md:w-50 my-2"
                            onClick={() => setShowCreateShareModal(true)}>Share your password</Button>
                    {(shares && shares.length > 0) ?
                        <PasswdTable data={shares} config={sharesTableConfig} keyFn={keyFn} editOn={false}/> :
                        <h4 className="text-center my-2">You have no shares</h4>}
                </Container>
                {showPasswordModal &&
                    <PasswordModal show={showPasswordModal} onClose={() => setShowPasswordModal(false)}
                                   passwordId={currentPassword}/>}
                {showCreateShareModal &&
                    <CreateShareModal show={showCreateShareModal} onClose={() => setShowCreateShareModal(false)}
                                      getData={getShares}/>}
            </>}
    </Container>
}

export default Shares;
