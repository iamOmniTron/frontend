import {Routes,Route} from "react-router-dom";
import CoordinatorDashboardLayout from "../pages/coordinator/components/layout";
import CoordinatorDashboard from "../pages/coordinator";
import Students from "../pages/coordinator/students";
import { Navigate } from "react-router-dom";
import Folders from "../pages/coordinator/folders";
import ListToSubmit from "../pages/coordinator/list";
import StudentStatus from "../pages/coordinator/status";
import Memo from "../pages/coordinator/memo";
import UserProfile from "../pages/coordinator/profile";
import UserDocuments from "../pages/coordinator/documents";
import StudentFolder from "../pages/coordinator/studentFolder";




export default function CoodinatorRoutes(){


    return(
        <>
            <Routes>
                <Route path="/" element={<CoordinatorDashboardLayout/>}>
                    <Route path="" index element={<CoordinatorDashboard/>}/>
                    <Route path="students" element={<Students/>}/>
                    <Route path="folders" element={<Folders/>}/>
                    <Route path="list" element={<ListToSubmit/>}/>
                    <Route path="status" element={<StudentStatus/>}/>
                    <Route path="memorandum" element={<Memo/>}/>
                    <Route path="profile" element={<UserProfile/>}/>
                    <Route path="*" element={<Navigate to="/login/coordinator"/>}/>
                    <Route path="students/documents" element={<UserDocuments/>}/>
                    <Route path="student-folder/preview" element={<StudentFolder/>}/>
                </Route>
                    <Route path="*" element={<Navigate to="/login/coordinator"/>}/>
            </Routes>
        </>
    )
}