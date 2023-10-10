import { Routes,Route, Navigate } from "react-router-dom";
import LoginUser from "../pages/auth/login";
import LoginCoordinator from "../pages/auth/loginCoordinator";
import LoginPGAdmin from "../pages/auth/loginPGAdmin";






export default function AuthRoutes(){

    return(
        <>
            <Routes>
                <Route path="/user" element={<LoginUser/>}/>
                <Route path="/coordinator" element={<LoginCoordinator/>}/>
                <Route path="/pg-admin" element={<LoginPGAdmin/>}/>
                <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>
        </>
    )
}