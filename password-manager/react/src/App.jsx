import {RouterProvider} from "react-router-dom";
import router from "./router.jsx";
import {CurrentUserProvider} from "./context/CurrentUserProvider.jsx";
import {WindowSizeProvider} from "./context/WindowSizeProvider.jsx";

function App() {
    return <CurrentUserProvider>
        <WindowSizeProvider>
            <RouterProvider router={router} />
        </WindowSizeProvider>
    </CurrentUserProvider>
}

export default App;
