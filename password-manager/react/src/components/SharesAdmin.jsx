import {useEffect, useState} from "react";
import passwd from "../api/passwd.js";
import {Container} from "react-bootstrap";
import PasswdTable from "./PasswdTable.jsx";
import {useInfoToastContext} from "../context/InfoToastProvider.jsx";

const SharesAdmin = () => {
    const [shares, setShares] = useState([]);

    const {setInfo} = useInfoToastContext();

    const getShares = async () => {
        try {
            const response = await passwd.get("/shares-admin");
            setShares(response.data);
        } catch (e) {
            setInfo(e.response.data.message);
        }
    }

    const handleDelete = async (id) => {
        try {
            await passwd.delete(`/shares/${id}`);
            await getShares();
            setInfo("Share deleted successfully.");
        } catch (e) {
            setInfo(e.response.data.message);
        }
    }

    useEffect(() => {
        getShares();
    }, []);

    const sharesTableConfig = [
        {
            label: "ID",
            render: (data) => data.id,
        },
        {
            label: "Password ID",
            render: (data) => data.password.id,
        },
        {
            label: "Password name",
            render: (data) => data.password.name,
        },
        {
            label: "Password type",
            render: (data) => data.password.type.name === "application" ? "Application" : "SSH/FTP",
        },
        {
            label: "Receiver",
            render: (data) => data.user.email,
        },
        {
            label: "Shared by",
            render: (data) => data.shared_by.email,
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

    return (<Container className="mt-5 text-center">
            <PasswdTable data={shares} config={sharesTableConfig} keyFn={keyFn} onDelete={handleDelete} editOn={false}/>
        </Container>
    )
}

export default SharesAdmin;
