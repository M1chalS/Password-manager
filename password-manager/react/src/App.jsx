import {RouterProvider} from "react-router-dom";
import router from "./router.jsx";
import {CurrentUserProvider} from "./context/CurrentUserProvider.jsx";
import {WindowSizeProvider} from "./context/WindowSizeProvider.jsx";
import {InfoToastProvider} from "./context/InfoToastProvider.jsx";

function App() {
    return <CurrentUserProvider>
        <WindowSizeProvider>
            <InfoToastProvider>
                <RouterProvider router={router} />
            </InfoToastProvider>
        </WindowSizeProvider>
    </CurrentUserProvider>
}

export default App;
