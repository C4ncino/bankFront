import { createBrowserRouter } from "react-router-dom";
import Home from '@pages/Home';
import Admin from '@pages/Admin';
import Account from "@pages/Account";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    }, {
        path: "/admin",
        element: <Admin />
    }, {
        path: "/account/:id",
        element: <Account />
    }
]);