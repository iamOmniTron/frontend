import { Breadcrumb,Button,Space,Spin,Tag,Typography,Image, Descriptions, Divider } from "antd"
import { RxDashboard } from "react-icons/rx";
import { BsMortarboard } from "react-icons/bs";
import DataTable from "../../components/table";
import { useUsers } from "../../hooks/user";
import PopupModal from "../../components/modal";
import { SERVER_URL,FALLBACK_IMAGE } from "../../utils/defaults";
import { EyeOutlined, FolderOpenOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
                <BsMortarboard/>
                Students
            </>
        )
    }
];



const STUDENTS_COLS = [
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
        title:"E-mail",
        key:"email",
        dataIndex:"email"
    },
    {
        title:"Phone",
        key:"phone",
        dataIndex:"phone"
    },
    {
        title:"Gender",
        key:"gender",
        dataIndex:"gender",
        render:(g)=><Tag color="blue">{g[0].toUpperCase()}</Tag>
    },
    {
        title:"Application Status",
        dataIndex:"Application",
        key:"status",
        render:(Application)=> Application?.status === "pending"? <Tag color="orange">Pending</Tag> : Application?.status === "successful"?<Tag color="green">Successful</Tag> :<Tag color="gray">Unknown</Tag>
    },
    {
        title:"Actions",
        key:"action",
        render:(_,user)=><PreviewUser user={user}/>
    }
]



function PreviewUser({user}){
    const [isOpen,setIsOpen] = useState(false)
    const navigate = useNavigate();

    const navigateToFolder = ()=>navigate("/pg-admin/student/folder",{state:user});

    return(
        <>
            <Space>
                <Button onClick={()=>setIsOpen(true)} type="primary" size="large" style={{backgroundColor:"#2bf12b"}} icon={<EyeOutlined/>}/>
                <Button onClick={navigateToFolder} type="primary" size="large" icon={<FolderOpenOutlined/>}/>
            </Space>
            <PopupModal title={"preview user"} open={isOpen} closeHandler={()=>setIsOpen(false)}>
                <div style={{
                    height:"75vh",
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    flexDirection:"column"
                }}>
                    <div>
                        <Image height={200} width={300} src={`${SERVER_URL.replace("/api","")}/${user.imageUrl}`}/>
                    </div>
                    <Divider/>
                    <div style={{marginBlock:"1em",width:"70%"}}>
                        <Descriptions column={1} >
                            <Descriptions.Item label={"Name"}>
                                {user.firstname} {user.middlename[0]}. {user.lastname}
                            </Descriptions.Item>
                            <Descriptions.Item label={"Matric Number"}>
                            {user.matricNumber}
                            </Descriptions.Item>
                            <Descriptions.Item label={"Department"}>
                                {user.Department?.title}
                            </Descriptions.Item>
                            <Descriptions.Item label={"E-mail"}>
                                {user.firstname}
                            </Descriptions.Item>
                            <Descriptions.Item label={"Phone"}>
                                {user.phone}
                            </Descriptions.Item>
                        </Descriptions>
                    </div>
                </div>
            </PopupModal>
        </>
    )
}


export default function Students(){

    const {users,loading} = useUsers();
    
    return(
        <>
             <div style={{height:"3em",backgroundColor:"white",padding:"1em",margin:"2em 0"}}>
                <Breadcrumb items={BREADCRUMB_ITEMS}/>
            </div>
            <div style={{padding:"0 1em",display:"flex",justifyContent:"space-between"}}>
                <Title level={3}>
                    STUDENTS
                </Title>
                <div>
                </div>
            </div>

            <div>
                <Spin spinning={loading}>
                    <DataTable data={users} cols={STUDENTS_COLS}/>
                </Spin>
            </div>
        </>
    )
}