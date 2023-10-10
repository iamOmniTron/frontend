import { Layout,Menu,Tooltip,Button,Avatar,message, Typography } from "antd";
import { RxDashboard } from "react-icons/rx";
import {RiUserSettingsLine} from "react-icons/ri";
import {BsFillSendPlusFill,BsFillMortarboardFill, BsPeople,BsFillBuildingsFill} from "react-icons/bs";
import {FaCog, FaPeopleArrows, FaSyncAlt,FaUserCircle} from "react-icons/fa"
import {AiFillFolderOpen} from "react-icons/ai";
import {MdCancel} from "react-icons/md"
import {IoBookSharp} from "react-icons/io5"
import {PiScrollBold} from "react-icons/pi";
import { Link, Outlet,useNavigate } from "react-router-dom";
import { userStore } from "../../../store/userStore";
import { AUTH_TOKEN_NAME } from "../../../utils/defaults";
import Logo from "../../../assets/nsuk-logo-2.jpg"
import { FileSearchOutlined, FolderAddFilled, SendOutlined, UserOutlined } from "@ant-design/icons";



const {Header,Sider,Content} = Layout;

const {Title} = Typography;


const SIDEBAR_MENU_ITEMS = [
    {
        key:"overview",
        label:<Link to="/pg-admin"><b>Overview</b></Link>,
        icon:<RxDashboard/>
    },
    {
        key:"users",
        label:<b>Students</b>,
        icon:<BsFillMortarboardFill/>,
        children:[
            {
                key:"manage-users",
                label:<Link to="/pg-admin/students"><b>Manage Students</b></Link>,
                icon:<RiUserSettingsLine/>
            },
            {
                key:"user-sessions",
                label:<Link to="/pg-admin/documents"><b>Documents</b></Link>,
                icon:<AiFillFolderOpen/>
            },
        ]
    },
    {
        key:"business",
        label:<b>Coordinators</b>,
        icon:<FaPeopleArrows/>,
        children:[
            {
                key:"manage-business",
                label:<Link to={"/pg-admin/coordinators"}><b>Manage Coordinators</b></Link>,
                icon:<BsPeople/>
            },
        ]
    },
    {
        key:"invoices",
        label:<b>Memo</b>,
        icon:<PiScrollBold/>,
        children:[
            {
                key:"manage-memo",
                label:<Link to="/pg-admin/memo"><b>Memos</b></Link>,
                icon:<BsFillSendPlusFill/>
            }
        ]
    },
    {
        key:"payments",
        label:<b>Application</b>,
        icon:<UserOutlined/>,
        children:[
            {
                key:"all",
                label:<Link to="/pg-admin/requests"><b>All</b></Link>,
                icon:<FileSearchOutlined/>
            },
            // {
            //     key:"req",
            //     label:<Link><b>New Request</b></Link>,
            //     icon:<SendOutlined/>
            // },
            {
                key:"rejected",
                label:<Link to="/pg-admin/requests/rejected"><b>Rejected</b></Link>,
                icon:<MdCancel/>
            }
        ]
    },
    {
        key:"config",
        label:<b>Configuration</b>,
        icon:<FaCog/>,
        children:[
            {
                key:"dep",
                label:<Link to="/pg-admin/department"><b>Departments</b></Link>,
                icon:<IoBookSharp/>
            },
            {
                key:"fac",
                label:<Link to={"/pg-admin/faculty"}><b>Faculty</b></Link>,
                icon:<BsFillBuildingsFill/>
            },
            {
                key:"docu",
                label:<Link to="/pg-admin/document-type"><b>Document Type</b></Link>,
                icon:<FolderAddFilled/>
            }
        ]
    }
]





export default function PGAdminDashboardLayout(){
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
            <Layout>
                <Header
                        style={{
                        height:"5em",
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor:"white",
                        borderBottom:"1px solid white",
                        justifyContent:"space-between"
                        }}
                    >
                        <div style={{
                            display:"flex",
                            alignItems: 'center',
                            justifyContent:"space-between",
                            width:"25vw"
                        }}>
                        <img src={Logo} style={{width:"10%",height:"80%",backgroundSize:"cover"}} alt="portal-logo"/>
                            <Title level={3}>
                                SPGS ADMINISTRATOR
                            </Title>
                        </div>
                        <Tooltip title="logout">
                        <Button style={{background:"rgba(0,0,0,0.3)"}} type="text" onClick={handleLogout}>
                            <Avatar size={24} src={<FaUserCircle/>}/>
                        </Button>
                    </Tooltip>
                </Header>
                <Layout>
        <Sider
          width={350}
          style={{
            backgroundColor:"#2bf12b",
          }}
        >
          <Menu
            mode="inline"
            style={{
              height: '92vh',
              overflowY:"scroll",
              borderRight: 0,
              backgroundColor:"#2bf12b",
              color:"white"
            }}
            items={SIDEBAR_MENU_ITEMS}
          />
        </Sider>
        <Layout
          style={{
            padding: '0 0 0 12px',
          }}
        >
             <Content
            style={{
              padding: 24,
              margin: 0,
              height: "calc(100vh - 5em)",
              background: "rgba(0,0,0,0.02)",
              overflowY:"scroll"
            }}
          >
            <Outlet/>
          </Content>
        </Layout>
        </Layout>
        </Layout>
        </>
    )
}