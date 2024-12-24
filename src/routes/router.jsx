import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import Dashboard from "../Pages/Dashboard";

const router = createBrowserRouter([
    {
        path: '/',
        element:<MainLayout></MainLayout>,
        children: [
            {
                path:'/',
                element: <Home></Home>
            },
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>
            },
        ]
    },
])

export default router;