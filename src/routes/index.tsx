import Signup from "../pages/signup";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Signin from "../pages/signin";
import FrameLayout from "../layout/frame";
import Logout from "../pages/logout";
import Articles from "../pages/Articles";
import Matches from "../pages/matches";
import ArticleDetails from "../pages/Articles/ArticleDetails";
const router = createBrowserRouter([
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/signin",
      element: <Signin />,
    },
    { path: "/", element: <Navigate to="/dashboard" replace /> },
    {
        path: "dashboard",
        element: <>
        <FrameLayout />
        <Matches />
        <Articles />
        </>,
      children: [
        {
          path: "articles/:id",
          element: <ArticleDetails />,
        },
      ],
    },
    {
      path: "/logout",
      element: <Logout />,
    },
  ]);
  
  export default router;
  