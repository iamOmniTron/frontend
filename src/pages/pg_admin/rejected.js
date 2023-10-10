import { Breadcrumb,Button,Form,Input,Spin,Typography } from "antd"
import { RxDashboard } from "react-icons/rx";
// import {  } from "react-icons/bs";
import DataTable from "../../components/table";
import { FileSearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import PopupModal from "../../components/modal";
import { useApplications } from "../../hooks/application";

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
        render:(_,{firstname,lastname})=>`${firstname} ${lastname}`
    },
    {
        title:"Matric Number",
        key:"matric",
        dataIndex:"matricNumber"
    },
    {
        title:"Gender",
        key:"gender",
        dataIndex:"gender"
    },
    {
        title:"Date",
        key:"date",
        dataIndex:"updatedAt"
    },
    {
        title:"Action",
        key:"action"
    }
]


export default function RejectedRequests(){

    const [isOpen,setIsOpen] = useState(false);

    const {loading,application} = useApplications();

    const filtered = application?.filter((a)=>a.statuse === "rejected")??[]
    
    return(
        <>
             <div style={{height:"3em",backgroundColor:"white",padding:"1em",margin:"2em 0"}}>
                <Breadcrumb items={BREADCRUMB_ITEMS}/>
            </div>
            <div style={{padding:"0 1em",display:"flex",justifyContent:"space-between"}}>
                <Title level={3}>
                    REJECTED REQUESTS
                </Title>
                <div>
                </div>
            </div>

            <div>
                <Spin spinning={loading}>
                    <DataTable data={filtered} cols={COLS}/>
                </Spin>
            </div>
        </>
    )
}