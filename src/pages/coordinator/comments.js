import { PlusOutlined,MessageOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { Breadcrumb,Button,Typography,Spin,Form, Input,message, Space } from "antd"
import { useState,useRef, useContext } from "react";
import { RxDashboard } from "react-icons/rx";
import DataTable from "../../components/table";
import { Navigate, useLocation } from "react-router-dom";
import { useCreateComment, useDeleteComment, useDocumentComments, useUpdateComment } from "../../hooks/comment";
import PopupModal from "../../components/modal";
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
                <MessageOutlined/>
                    Comments
            </>
        )
    }
];


const COMMENT_COLS = [
    {
        title:"S/N",
        key:"s/n",
        render:(_,__,idx)=>idx+1
    },
    {
        title:"Summary",
        key:"summary",
        dataIndex:"text",
    },
    {
        title:"Comment Date",
        key:"comment",
        dataIndex:"createdAt",
        render:(d)=> new Date(d).toLocaleDateString("en-US",{month:"short",year:"numeric",day:"2-digit"})
    },
];






export default function CoordinatorComments(){
    const [isOpen,setIsOpen] = useState(false);
    const {state:document} = useLocation();

    const {loading,comments} = useDocumentComments(document.id)


    return(
        <>
            <div style={{height:"3em",backgroundColor:"white",padding:"1em",margin:"2em 0"}}>
                <Breadcrumb items={BREADCRUMB_ITEMS}/>
            </div>
            <div style={{padding:"0 1em",display:"flex",justifyContent:"space-between"}}>
                <Title level={3}>
                    COMMENTS
                </Title>
                <div>
                </div>
            </div>
            <div>
                <Spin spinning={loading}>
                    <DataTable data={comments} cols={COMMENT_COLS}/>
                </Spin>
            </div>
        </>
    )
}