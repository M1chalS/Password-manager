import PasswdTable from "./PasswdTable.jsx";
import {Container} from "react-bootstrap";
import {useEffect, useState} from "react";
import passwd from "../api/passwd.js";

const Shares = () => {

    const [shares, setShares] = useState([]);

    const getShares = async () => {
        try {
            const response = await passwd.get("/shares");
            setShares(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getShares();
    }, []);

    const sharesTableConfig = [
        {
            label: "Password name",
            render: (data) => data.password.name,
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
    </Container>
}

export default Shares;
