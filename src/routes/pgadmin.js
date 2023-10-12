import {Routes,Route} from "react-router-dom";
import PGAdminDashboardLayout from "../pages/pg_admin/components/layout";
import SPGSAdminDashboard from "../pages/pg_admin";
import { Navigate } from "react-router-dom";
import Students from "../pages/pg_admin/students";
import Documents from "../pages/pg_admin/documents";
import Coordinators from "../pages/pg_admin/coordinator";
import Memos from "../pages/pg_admin/memos";
import Faculties from "../pages/pg_admin/faculty";
import Departments from "../pages/pg_admin/department";
import DocumentTypes from "../pages/pg_admin/docmentType";
import AllRequests from "../pages/pg_admin/requests";
import RejectedRequests from "../pages/pg_admin/rejected";
import { userStore } from "../store/userStore";
import PgStudentFolder from "../pages/pg_admin/studentFolder";
import Comments from "../pages/pg_admin/comments";




export default function PGAdminRoutes(){
    const user = userStore(state=>state.user);

    return user?.role < 1 ? <Navigate to="/login/pg-admin"/>:
        <>
            <Routes>
                <Route path="/" element={<PGAdminDashboardLayout/>}>
                    <Route path="" index element={<SPGSAdminDashboard/>}/>
                    <Route path="students" element={<Students/>}/>
                    <Route path="documents" element={<Documents/>}/>
                    <Route path="coordinators" element={<Coordinators/>}/>
                    <Route path="memo" element={<Memos/>}/>
                    <Route path="faculty" element={<Faculties/>}/>
                    <Route path="department" element={<Departments/>}/>
                    <Route path="document-type" element={<DocumentTypes/>}/>
                    <Route path="requests" element={<AllRequests/>}/>
                    <Route path="requests/rejected" element={<RejectedRequests/>}/>
                    <Route path="student/folder" element={<PgStudentFolder/>}/>
                    <Route path="*" element={<Navigate to="/login/pg-admin"/>}/>
                    <Route path="student/document/comment" element={<Comments/>}/>
                </Route>
                    <Route path="*" element={<Navigate to="/login/pg-admin"/>}/>
            </Routes>
        </>
}