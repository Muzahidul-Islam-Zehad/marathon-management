import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import Dashboard from "../Pages/Dashboard";
import Login from "../Pages/Login";
import Resgister from "../Pages/Resgister";
import Marathons from "../Pages/Marathons";

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
            {
                path: '/login',
                element:<Login></Login>
            },
            {
                path:'/register',
                element: <Resgister></Resgister>
            },
            {
                path:'/marathons',
                element: <Marathons></Marathons>
            }
        ]
    },
])

export default router;