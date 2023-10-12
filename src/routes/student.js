import {Routes,Route} from "react-router-dom";
import UserLayout from "../pages/user/components/layout";
import UserDashboard from "../pages/user";
import { Navigate } from "react-router-dom";
import UserMemo from "../pages/user/userMemos";
import UserProfile from "../pages/user/profile";
import UserComments from "../pages/user/comments";





export default function UserRoutes(){

    // here, basic check for user should be made    

    return(
        <>
            <Routes>
                <Route path="/" element={<UserLayout/>}>
                    <Route path="" index element={<UserDashboard/>}/>
                    <Route path="memos" element={<UserMemo/>}/>
                    <Route path="comments" element={<UserComments/>}/>
                    <Route path="profile" element={<UserProfile/>}/>
                    <Route path="*" element={<Navigate to="/login/user"/>}/>
                </Route>
                <Route path="*" element={<Navigate to="/login/user"/>}/>
            </Routes>
        </>
    )
}