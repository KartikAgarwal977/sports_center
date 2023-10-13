import React from "react"
import Signup from "../pages/signup"
import { createBrowserRouter, Navigate } from "react-router-dom"
import Signin from "../pages/signin"
import FrameLayout from "../layout/frame"
import Logout from "../pages/logout"
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
        element: <Navigate to= "/dashboard" replace />
    },
    {
        path: "dashboard",
        element: (
            <FrameLayout/>
        ),
    },

    {
        path: "/logout",
        element:<Logout/>
    }
    
])

export default router;