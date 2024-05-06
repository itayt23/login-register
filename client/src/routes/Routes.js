import {createBrowserRouter} from "react-router-dom";
import LoginPage from "./login/LoginPage";
import HomePage from "./home/HomePage";
import ErrorPage from "./home/ErrorPage";
import DashboardPage from "./home/DashBoardPage";
import ForgotPasswordPage from "./login/ForgotPasswordPage";
import RegisterPage from "./register/RegisterPage";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>
    },
    {
        path: "/login",
        children: [
            {
                path: "",
                element: <LoginPage/>
            },
            {
                path: "forgot-password",
                element: <ForgotPasswordPage/>

            }
        ]
    },
    {
        path: "/register",
        element: <RegisterPage/>
    },
    {
        path: "/dashboard",
        element: <DashboardPage/>
    },
    {
        path: "*",
        element: <ErrorPage/>
    },
]);

export default routes;