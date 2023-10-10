import { Breadcrumb,Button,Form,Input,Space,Spin,Tag,Typography,message } from "antd"
import { RxCrossCircled, RxDashboard } from "react-icons/rx";
import DataTable from "../../components/table";
import { CheckOutlined, FileSearchOutlined, } from "@ant-design/icons";
import { useContext, useState } from "react";
import PopupModal from "../../components/modal";

import { useApplications, useApproveApplication, useRejectApplication } from "../../hooks/application";
import RefreshContext from "../../context/refreshContext";

const {Title} = Typography


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
                <FileSearchOutlined/>
                All Requests
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
        render:({firstname,middlename,lastname})=>`${firstname} ${middlename[0]}. ${lastname}`
    },
    {
        title:"Matric Number",
        key:"matric",
        dataIndex:"User",
        render:(u)=>u.matricNumber
    },
    {
        title:"Gender",
        key:"gender",
        dataIndex:"User",
        render:(u)=>u.gender
    },
    {
        title:"Department",
        key:"department",
        dataIndex:"User",
        render:(u)=>u.Department.title
    },
    {
        title:"Status",
        key:"status",
        dataIndex:"status",
        render:(s)=><Tag color="blue">{s}</Tag>
    },
    {
        title:"Action",
        key:"action",
        render:(_,app)=><Actions application={app}/>
    }
]

// TODO: approval, comment and rejection

function Actions({application}){

    const {flag,setFlag} = useContext(RefreshContext)

    const approveApplication = useApproveApplication();
    const rejectApplication = useRejectApplication();

    const handleApproval = async()=>{
        await approveApplication(application.id);
        message.success("Approved!");
        setFlag(!flag)
    }
    const handleRejection = async()=>{
        await rejectApplication(application.id);
        message.success("Rejected!");
        setFlag(!flag)
    }

    return(
        <>
            <Space>
                {
                    application.status !== "successful" && <>
                    <Button onClick={handleApproval} style={{backgroundColor:"#2bf12b"}} type="primary" icon={<CheckOutlined/>} size="large"/>
                    {
                        application.status !== "rejected" && <>
                    <Button onClick={handleRejection} icon={<RxCrossCircled/>} type="primary" size="large" danger/>
                        </>
                    }
                    </>
                }
            </Space>
        </>
    )
}


export default function AllRequests(){

    const {flag} = useContext(RefreshContext)
    const [isOpen,setIsOpen] = useState(false);
    const {loading,applications} = useApplications(flag);
    
    
    return(
        <>
             <div style={{height:"3em",backgroundColor:"white",padding:"1em",margin:"2em 0"}}>
                <Breadcrumb items={BREADCRUMB_ITEMS}/>
            </div>
            <div style={{padding:"0 1em",display:"flex",justifyContent:"space-between"}}>
                <Title level={3}>
                    ALL APPLICATIONS
                </Title>
                <div>
                </div>
            </div>

            <div>
                <Spin spinning={loading}>
                    <DataTable data={applications} cols={COLS}/>
                </Spin>
            </div>
        </>
    )
}