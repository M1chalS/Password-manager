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
            field: "name",
            type: "text",
        },
        {
            label: "Last name",
            render: (data) => data.last_name,
            field: "last_name",
            type: "text",
        },
        {
            label: "Email",
            render: (data) => data.email,
            field: "email",
            type: "text",
        },
        {
            label: "Admin",
            render: (data) => data.is_admin ? "Yes" : "No",
            field: "is_admin",
            type: "checkbox",
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
            await passwd.put(`/users/${data.id}`, {
                name: data.name,
                last_name: data.last_name,
                email: data.email,
                is_admin: data.is_admin,
            });
            await getUsers();
        } catch (e) {
            console.log(e);
        }

    }

    const keyFn = (data) => data.id;

	return (<Container className="my-5 text-center">
            <PasswdTable data={users} config={usersTableConfig} onDelete={handleDelete} keyFn={keyFn} onEdit={handleEdit}/>
    </Container>
	)
}

export default UsersAdmin;
