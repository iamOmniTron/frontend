import { UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Card, Col, Row,Spin,Typography } from "antd";
import CardItem from "../../components/cardItem";
import {TfiWrite} from "react-icons/tfi"
import { RxDashboard } from "react-icons/rx";
import {AiOutlineFileSync} from "react-icons/ai"
import { Link } from "react-router-dom";
import DataTable from "../../components/table";
import { useDepartmentalApplication } from "../../hooks/application";

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



const TABLE_COLS = [
    {
        title:"S/N",
        key:"s/n",
        render:(_,__,idx)=>idx+1
    },
    {
        title:"Name",
        key:"name",
        dataIndex:"User",
        render:({firstname,middlename,lastname})=>`${firstname} ${middlename[0]}. ${lastname}`
    },
    {
        title:"Matric Number",
        key:"matric",
        dataIndex:"User",
        render:({matricNumber})=>matricNumber
    },
    {
        title:"E-mail",
        key:"email",
        dataIndex:"User",
        render:({email})=>email
    },
]

const {Title} = Typography;


export default function CoordinatorDashboard(){

    const {loading,applications} = useDepartmentalApplication();
    console.log(applications)

    const filtered = applications.filter((apl)=>apl.status === "pending")

    return(
        <>
            <div style={{height:"3em",backgroundColor:"white",padding:"1em",margin:"2em 0"}}>
                <Breadcrumb items={BREADCRUMB_ITEMS}/>
            </div>
            <div style={{padding:"0 1em",height:"20vh"}}>
                <Row style={{height:"100%"}} gutter={16}>
                    <CardItem link={"/coordinator/students"} title={"Students"} icon={<UserOutlined style={{
                        fontSize:30
                    }}/>}/>
                    <CardItem link={"/coordinator/memorandum"} title={"Memo"} icon={<TfiWrite style={{
                        fontSize:30
                    }}/>}/>
                    <CardItem link={"/coordinator/list"} title={"Facility"} icon={<AiOutlineFileSync style={{
                        fontSize:30
                    }}/>}/>
                </Row>
            </div>
            <div style={{
                marginTop:"3em"
            }}>
                <Title level={3}>
                    PENDING STUDENTS
                </Title>
                <Spin spinning={loading}>
                    <DataTable data={filtered} cols={TABLE_COLS}/>
                </Spin>
            </div>
        </>
    )
}