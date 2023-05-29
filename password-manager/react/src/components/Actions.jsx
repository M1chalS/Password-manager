import {Button, Container} from "react-bootstrap";
import CreateShareModal from "./CreateShareModal.jsx";
import {useState} from "react";
import CreatePasswordModal from "./CreatePasswordModal.jsx";

const Actions = () => {
    const [showCreateShareModal, setShowCreateShareModal] = useState(false);
    const [showCreatePasswordModal, setShowCreatePasswordModal] = useState(false);

    return <Container fluid className="d-flex flex-column align-items-center mb-5">
        <h1 className="text-center mt-1 mb-2">Actions</h1>
        <Button variant="primary" className="md:w-50 w-75 m-3" onClick={() => setShowCreatePasswordModal(true)}>Add new password</Button>
        <Button variant="success" className="md:w-50 w-75 m-3" onClick={() => setShowCreateShareModal(true)}>Share your password</Button>

        <Container className="pt-2" style={{ textAlign: "justify" }}>
            <h3 className="text-center py-2">Info</h3>
            Welcome to <strong>PASSWD</strong> control panel! This is your secure workspace.
            Here you can create and share your passwords 100% safely thanks to our encryption mechanism.
            <ul className="py-2">
                <li>In Passwords tab you can create new passwords and browse your own and those that are shared with you.</li>
                <li>Go to Shares tab to share your passwords with other users and browse what passwords you shared with others.</li>
                <li>Organizations WIP...</li>
            </ul>
            Also you can use <strong>Actions</strong> tab to quickly create new password or share your password with other user.
            <h3 className="text-center py-2">How it works?</h3>
            When you submit your password, it gets encrypted by using
            <strong><a href="https://www.openssl.org/" className="text-black text-decoration-none" target="_blank"> OpenSLL's </a></strong>
            encryption algorithm enhanced by us.
            Then it gets stored in our database. When you want to share your password with other user password gets linked with him and he can see it and decrypt it in his Passwords tab.
        </Container>
        {showCreatePasswordModal && <CreatePasswordModal show={showCreatePasswordModal} onClose={() => setShowCreatePasswordModal(false)}/>}
        {showCreateShareModal && <CreateShareModal show={showCreateShareModal} onClose={() => setShowCreateShareModal(false)}/>}
    </Container>
}

export default Actions;
