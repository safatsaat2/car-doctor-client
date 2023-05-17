import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import LogIn from "../Pages/LogIn/LogIn";
import SignUp from "../Pages/SignUp/SignUp";
import Checkout from "../Pages/Checkout/Checkout";
import BookService from "../Pages/BookService/BookService";
import PrivateRoute from "./PrivateRoute";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'login',
                element: <LogIn></LogIn>
            },
            {
                path:'signup',
                element: <SignUp></SignUp>
            },
            {
                path:'checkout/:id',
                element: <PrivateRoute><Checkout></Checkout></PrivateRoute>,
                loader: ({params}) => fetch(`https://car-doctor-server-three-ochre.vercel.app/services/${params.id}`)
            },
            {
                path: 'bookings',
                element:<PrivateRoute><BookService></BookService></PrivateRoute>
            }

        ]
    },
]);

export default router