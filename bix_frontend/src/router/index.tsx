import {BrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom';
import {GuardedRoute, GuardProvider, GuardFunction} from "react-router-guards";
import Main from "../pages/main";
import Login from "../pages/login";
export default function CustomRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='login' element={<Login />} />
                <Route path='/' element={<Main />}></Route>
            </Routes>
        </BrowserRouter>
    )
}