import {createBrowserRouter} from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import GuestLayout from "./layouts/GuestLayout.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import UserAccountPage from "./pages/UserAccountPage.jsx";
import PanelPage from "./pages/PanelPage.jsx";
import Passwords from "./components/Passwords.jsx";
import Actions from "./components/Actions.jsx";
import Shares from "./components/Shares.jsx";
import AdminPanelPage from "./pages/AdminPanelPage.jsx";
import UsersAdmin from "./components/UsersAdmin.jsx";
import PasswordsAdmin from "./components/PasswordsAdmin.jsx";
import SharesAdmin from "./components/SharesAdmin.jsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <LandingPage />
            },
            {
                path: "/account",
                element: <UserAccountPage />
            },
            {
                path: "/panel",
                element: <PanelPage />,
                children: [
                    {
                        path: "/panel",
                        element: <Actions />
                    },
                    {
                        path: "/panel/passwords",
                        element: <Passwords />
                    },
                    {
                        path: "/panel/shares",
                        element: <Shares />
                    }
                ]
            },
            {
                path: "/admin-panel",
                element: <AdminPanelPage />,
                children: [
                    {
                        path: "/admin-panel",
                        element: <UsersAdmin />
                    },
                    {
                        path: "/admin-panel/passwords",
                        element: <PasswordsAdmin />
                    },
                    {
                        path: "/admin-panel/shares",
                        element: <SharesAdmin />
                    }
                ]
            }
        ]
    },
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path: '/login',
                element: <LoginPage/>
            },
            {
                path: '/register',
                element: <RegisterPage/>
            }
        ]
    },
]);

export default router;
