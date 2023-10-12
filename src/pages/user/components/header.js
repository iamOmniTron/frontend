import { Avatar,message, Layout,Menu,Tooltip,Button } from "antd";
import Logo from "../../../assets/nsuk-logo.jpg"
import { Link,useNavigate } from "react-router-dom";
import { userStore } from "../../../store/userStore";
import { AUTH_TOKEN_NAME } from "../../../utils/defaults";
import {FaUserCircle} from "react-icons/fa"



const {Header} =  Layout;



const MENU_ITEMS = [
    {
        key:"dashboard",
        label:<Link to={"/user"}><b>Dashboard</b></Link>,
        icon:null
    },
    {
        key:"memos",
        label:<Link to="/user/memos"><b>Memos</b></Link>,
        icon:null
    },
    {
        key:"profile",
        label:<Link to={"/user/profile"}><b>Profile</b></Link>,
        icon:null
    },
    {
        key:"comments",
        label:<Link to={"/user/comments"}><b>Comments</b></Link>,
        icon:null
    },
]






export default function HeaderComponent(){

    const navigate = useNavigate();

    const logout = userStore(state=>state.logout);

    const handleLogout = ()=>{
        sessionStorage.removeItem(AUTH_TOKEN_NAME);
        logout();
        message.success("User Logged out successfully");
        navigate("/");
    }

    return(
        <>
            <Header
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent:"space-between",
                backgroundColor:"#2bf12b"
              }}>

                <Avatar shape="square" src={Logo} size={50}/>
                <div style={{display:"flex",alignItems:"center"}}>
                    <Menu
                        mode="horizontal"
                        items={MENU_ITEMS}
                        style={{minWidth:"40vw",backgroundColor:"#2bf12b",color:"white"}}
                        />
                        <Tooltip title="logout">
                        <Button type="text" onClick={handleLogout}>
                            <Avatar size={24} src={<FaUserCircle/>}/>
                        </Button>
                    </Tooltip>
                </div>
                </Header>
        </>
    )
}