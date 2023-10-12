import { Breadcrumb,Space,Typography,Button,Image, Tag} from "antd";
import { RxDashboard } from "react-icons/rx";
import {AiFillFolderOpen} from "react-icons/ai"
import DataTable from "../../components/table";
import {useLocation, useNavigate} from "react-router-dom";
import { useState } from "react";
import { EyeOutlined, MessageOutlined } from "@ant-design/icons";
import PopupModal from "../../components/modal";
import { SERVER_URL,FALLBACK_IMAGE } from "../../utils/defaults";


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
                <AiFillFolderOpen/>
                Student Folder
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
        title:"Document",
        key:"document",
        dataIndex:"DocumentType",
        render:(t)=>t.title
    },
    {
        title:"Uploaded on",
        key:"date",
        dataIndex:"createdAt",
        render:(d)=> new Date(d).toLocaleDateString("en-US",{month:"short",day:"2-digit",year:"2-digit"})
    },
    {
        title:"Actions",
        key:"actions",
        render:(_,doc)=><DocumentActions document={doc}/>
    }
];


function DocumentActions({document}){
    const [isViewOpen,setIsViewOpen] = useState(false);

    const navigate = useNavigate();

    const navigateToComment = ()=>navigate("/pg-admin/student/document/comment",{state:document})


    return(
        <>
            <Space>
                <Button onClick={()=>setIsViewOpen(true)} icon={<EyeOutlined/>} size="large" type="primary" style={{backgroundColor:"#2bf12b"}}/>
                <Button onClick={navigateToComment} icon={<MessageOutlined/>} size="large" type="primary" style={{backgroundColor:"orange"}}/>
            </Space>
            <PopupModal title={"preview document"} open={isViewOpen} closeHandler={()=>setIsViewOpen(false)}>
                <Image height={300}
                        width={400}
                        src={`${SERVER_URL.replace("/api","")}/${document.imageUrl}`}
                        fallback={FALLBACK_IMAGE}
                        />
            </PopupModal>
        </>
    )
}



export default function PgStudentFolder(){
        const {state:student} = useLocation();
        console.log(student)

    return(
        <>
            <div style={{height:"3em",backgroundColor:"white",padding:"1em",margin:"2em 0"}}>
                <Breadcrumb items={BREADCRUMB_ITEMS}/>
            </div>
            <div style={{padding:"0 1em",display:"flex",justifyContent:"space-between"}}>
                <Title level={3}>
                    {student.firstname} {student.middlename[0]}. {student.lastname}'s Folder
                </Title>
            </div>
            <div>
                    <DataTable data={student.Documents} cols={COLS}/>
            </div>
        </>
    )
}