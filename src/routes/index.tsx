import Signup from "../pages/signup"
import { createBrowserRouter, Navigate } from "react-router-dom"
import Signin from "../pages/signin"
import FrameLayout from "../layout/frame"
import Logout from "../pages/logout"
import Articles from "../pages/Articles"
import Matches from "../pages/matches"
const router = createBrowserRouter([
    {
        path: "/signup",
        element: <Signup/>
    },
    {
        path: "/signin",
        element: <Signin/>
    },
    {
        path: "/",
        element: (
            <FrameLayout/>
        ),
        children: [
            {index: true, element: <Navigate to="/dashboard" replace />},
            {
                path: "dashboard",
                element: (
                    <><Matches /><Articles /></>)
            },
            
        ]
    },

    {
        path: "/logout",
        element:<Logout/>
    }
    
])

export default router;