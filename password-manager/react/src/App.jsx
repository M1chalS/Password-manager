import {RouterProvider} from "react-router-dom";
import router from "./router.jsx";
import {CurrentUserProvider} from "./context/CurrentUserProvider.jsx";

function App() {
    return <CurrentUserProvider>
        <RouterProvider router={router} />
    </CurrentUserProvider>
}

export default App;
