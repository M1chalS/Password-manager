import {useEffect, useState} from "react";
import passwd from "../api/passwd.js";
import {Container} from "react-bootstrap";
import PasswdTable from "./PasswdTable.jsx";
import {useInfoToastContext} from "../context/InfoToastProvider.jsx";

const PasswordsAdmin = () => {
    const [passwords, setPasswords] = useState([]);

    const {setInfo} = useInfoToastContext();

    const getPasswords = async () => {
        try {
            const response = await passwd.get("/passwords-admin");
            setPasswords(response.data);
        } catch (e) {
            setInfo(e.response.data.message);
        }
    }

    const handleDelete = async (id) => {
        try {
            await passwd.delete(`/passwords/${id}`);
            await getPasswords();
            setInfo("Password deleted successfully.");
        } catch (e) {
            setInfo(e.response.data.message);
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
            field: "name",
            type: "text",
        },
        {
            label: "Password type",
            render: (data) => data.type.name === "application" ? "Application" : "SSH/FTP",
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

    const handleEdit = async (e, data) => {
        try {
            await passwd.put(`/passwords-admin/${data.id}`, {
                name: data.name,
            });
            await getPasswords();
            setInfo("Password updated successfully.");
        } catch (e) {
            setInfo(e.response.data.message);
        }

    }

    const keyFn = (data) => data.id;

    return (<Container className="mt-5 text-center">
            <PasswdTable data={passwords} config={passwordsTableConfig} onDelete={handleDelete} keyFn={keyFn} onEdit={handleEdit}/>
        </Container>
    )
}

export default PasswordsAdmin;
