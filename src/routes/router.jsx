import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import Dashboard from "../Pages/Dashboard";
import Login from "../Pages/Login";
import Resgister from "../Pages/Resgister";
import Marathons from "../Pages/Marathons";
import AddMarathon from "../Pages/AddMarathon";
import PrivateRoute from "../Privateroute/PrivateRoute";
import MyMarathons from "../Pages/MyMarathons";
import MyApplyList from "../Pages/MyApplyList";
import MarathonDetails from "../Pages/MarathonDetailsPage";
import ErrorPage from "../Pages/ErrorPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>,
                children: [
                    {
                        path: '/dashboard',
                        element: <PrivateRoute><AddMarathon></AddMarathon></PrivateRoute>
                    },
                    {
                        path: '/dashboard/my-marathon-list',
                        element: <PrivateRoute><MyMarathons></MyMarathons></PrivateRoute>
                    },
                    {
                        path:'/dashboard/my-apply-list',
                        element: <PrivateRoute><MyApplyList></MyApplyList></PrivateRoute>
                    }


                ]

            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Resgister></Resgister>
            },
            {
                path: '/marathons',
                element: <PrivateRoute><Marathons></Marathons></PrivateRoute>
            },
            {
                path: '/marathon-details/:id',
                element: <PrivateRoute><MarathonDetails></MarathonDetails></PrivateRoute>
            },
        ],
        
    },
    {
        path:'*',
        element: <ErrorPage></ErrorPage>
    }
])

export default router;