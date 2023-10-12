import { Breadcrumb,Button,Form,Input,Spin,Tag,Typography } from "antd"
import { RxDashboard } from "react-icons/rx";
// import {  } from "react-icons/bs";
import DataTable from "../../components/table";
import { CheckOutlined, FileSearchOutlined } from "@ant-design/icons";
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
                Rejected Requests
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
        render:({firstname,middlename,lastname})=>`${firstname} ${middlename[0]} ${lastname}`
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
        render:(u)=><Tag color="green">{u.gender[0].toUpperCase()}</Tag>
    },
    {
        title:"Date",
        key:"date",
        dataIndex:"updatedAt",
        render:(d)=>new Date(d).toLocaleDateString("en-US",{year:"2-digit",month:"short",day:"2-digit"})
    },
    {
        title:"Action",
        key:"action",
        render:(_,a)=><Actions application={a}/>
    }
]



function Actions({application}){


    return(
        <>
            <Button size="large" type="primary" icon={<CheckOutlined/>} style={{backgroundColor:"#2bf12b"}}/>
        </>
    )
}


export default function RejectedRequests(){

    const [isOpen,setIsOpen] = useState(false);

    const {loading,applications} = useApplications();
    // console.log(applications)

    const filtered = applications?.filter((a)=>a.status === "rejected")??[]
    
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