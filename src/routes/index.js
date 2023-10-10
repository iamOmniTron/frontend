import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import LandingPage from "../pages/common/landing";
import AuthRoutes from "./auth";
import UserRoutes from "./student";
import CoodinatorRoutes from "./coordinator";
import PGAdminRoutes from "./pgadmin";






export default function RenderRoutes(){



    return(
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/login/*" element={<AuthRoutes/>}/>
                <Route path="/user/*" element={<UserRoutes/>}/>
                <Route path="/coordinator/*" element={<CoodinatorRoutes/>}/>
                <Route path="/pg-admin/*" element={<PGAdminRoutes/>}/>
            </Routes>
        </Router>
    )
}