
import { UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Card, Col, Row,Spin,Tag,Typography } from "antd";
import CardItem from "../../components/cardItem";
import {TfiWrite} from "react-icons/tfi"
import { RxDashboard } from "react-icons/rx";
import {AiOutlineFileSync} from "react-icons/ai"
import { Link } from "react-router-dom";
import DataTable from "../../components/table";
import { BsMortarboard } from "react-icons/bs";
import { FaCog } from "react-icons/fa";
import { useCoordinators } from "../../hooks/coordinator";

const BREADCRUMB_ITEMS = [
    {
        key:"1",
        title:(
            <>
            <RxDashboard/>
            Dashboard
            </>
        )
    }
];


const COLS = [
    {
        title:"S/N",
        key:"s/n",
        render:(_,__,idx)=>idx+1
    },
    {
        title:"Name",
        key:"name",
        render:(_,{firstname,middlename,lastname})=>`${firstname} ${middlename} ${lastname}`
    },
    {
        title:"E-mail",
        key:"email",
        dataIndex:"email"
    },
    {
        title:"User ID",
        key:"userId",
        dataIndex:"userId",
        render:(u)=><Tag color="green">{u}</Tag>
    },
    {
        title:"Department",
        key:"department",
        dataIndex:"Department",
        render:(d)=>d.title
    },
]

const {Title} = Typography;




export default function SPGSAdminDashboard(){
    
    const {loading,coordinators} = useCoordinators();
    return(
        <>
            <div style={{height:"3em",backgroundColor:"white",padding:"1em",margin:"2em 0"}}>
                <Breadcrumb items={BREADCRUMB_ITEMS}/>
            </div>
            <div style={{padding:"0 1em",height:"20vh"}}>
                <Row style={{height:"100%"}} gutter={16}>
                    <CardItem link={"/pg-admin/students"}  title={"Students"} icon={<BsMortarboard style={{
                        fontSize:30
                    }}/>}/>
                    <CardItem  title={"Memo"} icon={<UserOutlined style={{
                        fontSize:30
                    }}/>}/>
                    <CardItem  title={"Settings"} icon={<FaCog style={{
                        fontSize:30
                    }}/>}/>
                </Row>
            </div>
            <div style={{
                marginTop:"3em"
            }}>
                <Title level={3}>
                    COORDINATORS
                </Title>
                <Spin spinning={loading}>
                    <DataTable data={coordinators?.splice(0,5)??[]} cols={COLS}/>
                </Spin>
            </div>
        </>
    )
}