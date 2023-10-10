import { Layout,Menu,Tooltip,Button,Avatar,message, Typography } from "antd";
import { RxDashboard } from "react-icons/rx";
import {RiUserSettingsLine} from "react-icons/ri";
import {BsFillSendPlusFill,BsFillMortarboardFill, BsFile} from "react-icons/bs";
import {FaSyncAlt,FaUserCircle} from "react-icons/fa"
import {AiFillFolderOpen,AiOutlineUnorderedList} from "react-icons/ai";
import {BiSolidUserAccount} from "react-icons/bi"
import {PiFilesLight,PiScrollBold} from "react-icons/pi";
import { Link, Outlet,useNavigate } from "react-router-dom";
import { userStore } from "../../../store/userStore";
import { AUTH_TOKEN_NAME } from "../../../utils/defaults";
import Logo from "../../../assets/nsuk-logo-2.jpg"
import { CheckOutlined, FileOutlined, UserOutlined } from "@ant-design/icons";



const {Header,Sider,Content} = Layout;

const {Title} = Typography;


const SIDEBAR_MENU_ITEMS = [
    {
        key:"overview",
        label:<Link to="/coordinator"><b>Overview</b></Link>,
        icon:<RxDashboard/>
    },
    {
        key:"users",
        label:<b>Students</b>,
        icon:<BsFillMortarboardFill/>,
        children:[
            {
                key:"manage-users",
                label:<Link to="/coordinator/students"><b>Manage Students</b></Link>,
                icon:<RiUserSettingsLine/>
            },
            {
                key:"user-sessions",
                label:<Link to="/coordinator/folders"><b>Folders</b></Link>,
                icon:<AiFillFolderOpen/>
            },
            {
                key:"documents",
                label:<Link to="/coordinator/students/documents"><b>Students Document</b></Link>,
                icon:<FileOutlined/>
            }
        ]
    },
    {
        key:"business",
        label:<b>Facility</b>,
        icon:<FaSyncAlt/>,
        children:[
            {
                key:"manage-business",
                label:<Link to="/coordinator/list"><b>Submit Lists</b></Link>,
                icon:<AiOutlineUnorderedList/>
            },
            {
                key:"bus-category",
                label:<Link to="/coordinator/status"><b>Check Statuses</b></Link>,
                icon:<CheckOutlined/>
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
                label:<Link to="/coordinator/memorandum"><b>Manage Memo</b></Link>,
                icon:<BsFillSendPlusFill/>
            }
        ]
    },
    {
        key:"payments",
        label:<Link to="/coordinator/profile"><b>Profile</b></Link>,
        icon:<UserOutlined/>
    },
]





export default function CoordinatorDashboardLayout(){
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
                            width:"30vw"
                        }}>
                        <img src={Logo} style={{width:"10%",height:"80%",backgroundSize:"cover"}} alt="portal-logo"/>
                            <Title level={3}>
                                DEPARTMENTAL COORDINATOR
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