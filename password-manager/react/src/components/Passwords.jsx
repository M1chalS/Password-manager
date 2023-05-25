import {useEffect, useState} from "react";
import passwd from "../api/passwd.js";
import {Container} from "react-bootstrap";
import PasswdTable from "./PasswdTable.jsx";

const Passwords = () => {
    const [passwords, setPasswords] = useState([]);

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
            render: (data) => data.name,
        },
        {
            label: "Added on",
            render: (data) => `${new Date(data.created_at).toLocaleTimeString()} on ${new Date(data.created_at).toLocaleDateString()}`,
        }
    ];

    const sharedTableConfig = [
        {
            label: "Password name",
            render: (data) => data.name,
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

    return <Container fluid className="w-50">
        <h1 className="text-center mt-1">Your Passwords</h1>
        {(passwords?.personal && passwords.personal.length > 0) ?
            <PasswdTable data={passwords.personal} config={passwordsTableConfig} keyFn={keyFnPasswords}/> :
            <h4 className="text-center my-2">You have no passwords</h4>}
        <h1 className="text-center mt-1">Passwords shared with you</h1>
        {passwords?.shared && passwords.shared.length > 0 ?
            <PasswdTable data={passwords.shared} config={sharedTableConfig} keyFn={keyFnShared}/> :
            <h4 className="text-center my-2">There are no passwords shared with you yet</h4>}
    </Container>
}

export default Passwords;
