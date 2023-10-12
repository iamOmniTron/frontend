import { MessageOutlined,EyeOutlined } from "@ant-design/icons"
import { Breadcrumb,Button,Typography,Spin,Space,Image } from "antd"
import { useState,} from "react";
import { RxDashboard } from "react-icons/rx";
import DataTable from "../../components/table";
import { useStudentsComments} from "../../hooks/comment";
import PopupModal from "../../components/modal";
import { userStore } from "../../store/userStore";
import { SERVER_URL,FALLBACK_IMAGE } from "../../utils/defaults";



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
        title:"Document Type",
        key:"type",
        dataIndex:"Document",
        render:(d)=>d.DocumentType.title
    },
    {
        title:"Comment Date",
        key:"comment",
        dataIndex:"createdAt",
        render:(d)=> new Date(d).toLocaleDateString("en-US",{month:"short",year:"numeric",day:"2-digit"})
    },
    {
        title:"Actions",
        key:"actions",
        render:(comment)=><CommentsAction comment={comment}/>
    }
];




function CommentsAction({comment}){
    const [isOpen,setIsOpen] = useState(false)


    return(
        <>
            <Space>
                <Button onClick={()=>setIsOpen(true)} size="large" icon={<EyeOutlined/>} style={{backgroundColor:"#2bf12b"}} type="primary"/>
            </Space>
            <PopupModal title={"preview document"} open={isOpen} closeHandler={()=>setIsOpen(false)}>
                <Image height={300}
                    width={400}
                    src={`${SERVER_URL.replace("/api","")}/${comment.Document.imageUrl}`}
                    fallback={FALLBACK_IMAGE}
                    preview={false}
                    />
            </PopupModal>
        </>
    )
}






export default function UserComments(){
    // const [isOpen,setIsOpen] = useState(false);
    
    const currentUser = userStore(state=>state.user);

    const {loading,comments} = useStudentsComments(currentUser.id);




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