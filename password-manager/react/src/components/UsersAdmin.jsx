import PasswdTable from "./PasswdTable.jsx";
import passwd from "../api/passwd.js";
import {useEffect, useState} from "react";
import {Container} from "react-bootstrap";

const UsersAdmin = () => {

    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        try {
            const response = await passwd.get("/users");
            setUsers(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    const handleDelete = async (id) => {
        try {
            await passwd.delete(`/users/${id}`);
            await getUsers();
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    const usersTableConfig = [
        {
            label: "ID",
            render: (data) => data.id,
        },
        {
            label: "First name",
            render: (data) => data.name,
        },
        {
            label: "Last name",
            render: (data) => data.last_name,
        },
        {
            label: "Email",
            render: (data) => data.email,
        },
        {
            label: "Admin",
            render: (data) => data.is_admin ? "Yes" : "No",
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
            <PasswdTable data={users} config={usersTableConfig} onDelete={handleDelete} keyFn={keyFn} />
    </Container>
	)
}

export default UsersAdmin;
