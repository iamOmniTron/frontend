import { Breadcrumb,Spin,Button,Typography, Tag } from "antd"
import { RxDashboard } from "react-icons/rx";
import DataTable from "../../components/table"
import { CheckOutlined } from "@ant-design/icons";
import { useDepartmentalApplication } from "../../hooks/application";

const {Title} = Typography;


const BREADCRUMB_ITEMS = [
    {
        key:"1",
        title:(
            <>
            <RxDashboard/>
            Dashboard
            </>
        )
    },
    {
        key:"2",
        title:(
            <>
                <CheckOutlined/>
                Clearance Status
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
        dataIndex:"User",
        render:({firstname,lastname})=>`${firstname} ${lastname}`
    },
    {
        title:"Matric Number",
        key:"matric",
        dataIndex:"User",
        render:(u)=>u.matricNumber
    },
    {
        title:"Application Submission Date",
        key:"date",
        dataIndex:"updatedAt",
        render:(d)=>new Date(d).toLocaleDateString("en-US",{day:"2-digit",month:"short",year:"numeric"})
    },
    {
        title:"Status",
        key:"status",
        dataIndex:"status",
        render:(s)=><Tag color={"blue"}>{s}</Tag>
    }
]

export default function StudentStatus(){

    const {loading,applications} = useDepartmentalApplication();
    console.log(applications)

    return(
        <>
            <div style={{height:"3em",backgroundColor:"white",padding:"1em",margin:"2em 0"}}>
                <Breadcrumb items={BREADCRUMB_ITEMS}/>
            </div>
            <div style={{padding:"0 1em",display:"flex",justifyContent:"space-between"}}>
                <Title level={3}>
                    CLEARANCE STATUS
                </Title>
            </div>

            <div>
                <Spin spinning={loading}>
                    <DataTable data={applications} cols={COLS}/>
                </Spin>
            </div>
        </>
    )
}