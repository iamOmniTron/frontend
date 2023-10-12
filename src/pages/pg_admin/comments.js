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
    {
        title:"Actions",
        key:"actions",
        render:(comment)=><CommentEdit comment={comment}/>
    }
];


function CommentEdit({comment}){
    const [isOpen,setIsOpen] = useState(false);
    
    const {flag,setFlag} = useContext(RefreshContext)
    const contentRef = useRef(null);


    const updateComment = useUpdateComment();
    const deleteComment = useDeleteComment();

    const handleDelete = async ()=>{
        await deleteComment(comment.id);
        message.success("comment deleted successfully");
        setFlag(!flag)
    }

    const handleSubmit = async ()=>{
        const payload = {
            text:contentRef.current.resizableTextArea.textArea.value,
            documentId:comment.DocumentId.toString()
        }
        await updateComment(comment.id,payload);
        message.success("comment updated successfully");
        setFlag(!flag)
        setIsOpen(false);
    }

    return (
        <>
            <Space>
                <Button onClick={()=>setIsOpen(true)} icon={<EditOutlined/>} size="large" style={{backgroundColor:"#2bf12b"}}/>
                <Button onClick={handleDelete} icon={<DeleteOutlined/>} size="large" danger/>
            </Space>
            <PopupModal title={"Comment on document"} open={isOpen} closeHandler={()=>setIsOpen(false)}>
                <Form initialValues={{...comment}}>
                    <Form.Item name="text">
                        <Input.TextArea ref={contentRef} rows={4} placeholder="Enter comment..."/>
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={handleSubmit} block type="primary" style={{backgroundColor:"#2bf12b"}}>
                            SUBMIT
                        </Button>
                    </Form.Item>
                </Form>
            </PopupModal>
        </>
    )
}






export default function Comments(){
    const [isOpen,setIsOpen] = useState(false);
    const {state:document} = useLocation();

    const {flag,setFlag} = useContext(RefreshContext)
    
    const {loading,comments} = useDocumentComments(document.id,flag)
    const createComment = useCreateComment();


    const contentRef = useRef(null);

    const handleSubmit = async ()=>{
        const payload = {
            text:contentRef.current.resizableTextArea.textArea.value,
            documentId:document.id.toString()
        }
        await createComment(payload);
        message.success("comment submitted successfully");
        setFlag(!flag)
        setIsOpen(false);
    }


    return(
        <>
            <div style={{height:"3em",backgroundColor:"white",padding:"1em",margin:"2em 0"}}>
                <Breadcrumb items={BREADCRUMB_ITEMS}/>
            </div>
            <div style={{padding:"0 1em",display:"flex",justifyContent:"space-between"}}>
                <Title level={3}>
                    COMMENT ON {(document.DocumentType.title).toUpperCase()} DOCUMENT
                </Title>
                <div>
                    <Button type="primary" style={{
                        backgroundColor:"#2bf12b"
                    }} icon={<PlusOutlined/>} onClick={()=>setIsOpen(true)}>
                        Comment
                    </Button>
                </div>
            </div>
            <div>
                <Spin spinning={loading}>
                    <DataTable data={comments} cols={COMMENT_COLS}/>
                </Spin>
            </div>
            <PopupModal title={"Comment on document"} open={isOpen} closeHandler={()=>setIsOpen(false)}>
                <Form>
                    <Form.Item>
                        <Input.TextArea ref={contentRef} rows={4} placeholder="Enter comment..."/>
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={handleSubmit} block type="primary" style={{backgroundColor:"#2bf12b"}}>
                            SUBMIT
                        </Button>
                    </Form.Item>
                </Form>
            </PopupModal>
        </>
    )
}