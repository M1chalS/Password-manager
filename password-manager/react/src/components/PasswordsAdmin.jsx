import {useEffect, useState} from "react";
import passwd from "../api/passwd.js";
import {Container} from "react-bootstrap";
import PasswdTable from "./PasswdTable.jsx";

const PasswordsAdmin = () => {
    const [passwords, setPasswords] = useState([]);

    const getPasswords = async () => {
        try {
            const response = await passwd.get("/passwords-admin");
            setPasswords(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    const handleDelete = async (id) => {
        try {
            await passwd.delete(`/passwords/${id}`);
            await getPasswords();
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getPasswords();
    }, []);

    const passwordsTableConfig = [
        {
            label: "ID",
            render: (data) => data.id,
        },
        {
            label: "Name",
            render: (data) => data.name,
        },
        {
            label: "Created by",
            render: (data) => data.user.email,
        },
        {
            label: "Created at",
            render: (data) => `${new Date(data.created_at).toLocaleTimeString()} on ${new Date(data.created_at).toLocaleDateString()}`,
        },
        {
            label: "Updated at",
            render: (data) => `${new Date(data.updated_at).toLocaleTimeString()} on ${new Date(data.created_at).toLocaleDateString()}`,
        }
    ];

    const keyFn = (data) => data.id;

    return (<Container className="my-5 text-center">
            <PasswdTable data={passwords} config={passwordsTableConfig} onDelete={handleDelete} keyFn={keyFn} />
        </Container>
    )
}

export default PasswordsAdmin;
