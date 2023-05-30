import {useCurrentUserContext} from "../context/CurrentUserProvider.jsx";
import {Navigate} from "react-router-dom";

const ProtectedRoute = ({children, type}) => {
    const {token, user} = useCurrentUserContext();

    if (type === "auth" && !token) {
        return <Navigate to="/login" replace />;
    }

    if (type === "admin") {
        if (!user) {
            return <Navigate to="/login" replace />;
        }

        if(user.is_admin !== 1) {
            return <Navigate to="/" replace />;
        }
    }

    return children;
}

export default ProtectedRoute;
