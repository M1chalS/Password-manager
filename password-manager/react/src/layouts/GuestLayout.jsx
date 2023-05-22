import {Outlet} from "react-router-dom";

const GuestLayout = () => {
    return <div>
        <h1>GuestLayout</h1>
        <Outlet />
    </div>;
}

export default GuestLayout;
