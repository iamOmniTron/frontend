import { Breadcrumb,Button,Spin,Typography,Space, Form, Input,message, Descriptions, Card } from "antd"
import {EyeOutlined, PlusOutlined} from "@ant-design/icons"
import {LuScrollText} from "react-icons/lu"
import {RxDashboard} from "react-icons/rx";
import DataTable from "../../components/table";
import PopupModal from "../../components/modal";
import { useContext, useRef, useState } from "react";
import { useCreateMemo, useMemos, useUpdateMemo } from "../../hooks/memo";
import { extractValueFromInputRef } from "../../utils/helpers";
import RefreshContext from "../../context/refreshContext";
import { useUpdateComment } from "../../hooks/comment";


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
                <LuScrollText/>
                Memos
            </>
        )
    }
];

const MEMO_COLS = [
    {
        title:"S/N",
        key:"s/n",
        render:(_,__,idx)=>idx+1
    },
    {
        title:"Title",
        key:"title",
        dataIndex:"title"
    },
    {
        title:"Subject",
        key:"subject",
        dataIndex:"subject"
    },
    {
        title:"Published Date",
        key:"date",
        dataIndex:"createdAt",
        render:(d)=> new Date(d).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})
    },
    {
        title:"Actions",
        key:"actions",
        render:(_,memo)=><MemoEdit memo={memo}/>
    }
];




function MemoEdit({memo}){
    const [isOpen,setIsOpen] = useState(false);

    const {flag,setFlag} = useContext(RefreshContext)
    const updateMemo = useUpdateMemo()

    const titleRef = useRef(null);
    const subjectRef = useRef(null);
    const contentRef = useRef(null);

    const handleSubmit = async ()=>{
        const payload = {
            title:extractValueFromInputRef(titleRef),
            subject:extractValueFromInputRef(subjectRef),
            text:contentRef.current.resizableTextArea.textArea.value
        };
        await updateMemo(memo.id,payload);
        message.success("Memo updated successfully");
        setFlag(!flag);
        setIsOpen(false);
    }



    return (
        <>
            <Space>
                <Button type="primary" size="large" onClick={()=>setIsOpen(true)} style={{backgroundColor:"#2bf12b"}} icon={<EyeOutlined/>}/>
            </Space>
            <PopupModal width={700} title={"Preview Memo"} open={isOpen} closeHandler={()=>setIsOpen(false)}>
            <Form initialValues={{...memo}}>
                <Form.Item name="title">
                    <Input ref={titleRef} placeholder="Title"/>
                </Form.Item>
                <Form.Item name={"subject"}>
                    <Input ref={subjectRef} placeholder="Subject"/>
                </Form.Item>
                <Form.Item name="text">
                    <Input.TextArea ref={contentRef} rows={10} placeholder="enter memo content"/>
                </Form.Item>
                <Form.Item>
                    <Button onClick={handleSubmit} block style={{
                        backgroundColor:"#2bf12b",
                    }} type={"primary"}>
                        SUBMIT
                    </Button>
                </Form.Item>
            </Form>
            </PopupModal>
        </>
    )
}





export default function Memo(){
    const [isOpen,setIsOpen] = useState(false);

    const {loading,memos} = useMemos();
    const createMemo = useCreateMemo();

    const {flag,setFlag} = useContext(RefreshContext)

    const titleRef = useRef(null);
    const subjectRef = useRef(null);
    const contentRef = useRef(null);

    const handleSubmit = async ()=>{
        const payload = {
            title:extractValueFromInputRef(titleRef),
            subject:extractValueFromInputRef(subjectRef),
            text:contentRef.current.resizableTextArea.textArea.value
        };
        await createMemo(payload);
        message.success("Memo created successfully");
        setFlag(!flag);
        setIsOpen(false);
    }

    return (
        <>
                    <div style={{height:"3em",backgroundColor:"white",padding:"1em",margin:"2em 0"}}>
            <Breadcrumb items={BREADCRUMB_ITEMS}/>
        </div>
        <div style={{padding:"0 1em",display:"flex",justifyContent:"space-between"}}>
            <Title level={3}>
                INTERNAL MEMOS
            </Title>
            <div>
                <Button onClick={()=>setIsOpen(true)} type="primary" style={{backgroundColor:"#2bf12b"}} icon={<PlusOutlined/>}>
                    New Memo
                </Button>
            </div>
        </div>

        <div>
            <Spin spinning={loading}>
                <DataTable data={memos} cols={MEMO_COLS}/>
            </Spin>
        </div>
        <PopupModal title={"New Memo"} open={isOpen} closeHandler={()=>setIsOpen(false)} width={700}>
            <Form>
                <Form.Item>
                    <Input ref={titleRef} placeholder="Title"/>
                </Form.Item>
                <Form.Item>
                    <Input ref={subjectRef} placeholder="Subject"/>
                </Form.Item>
                <Form.Item>
                    <Input.TextArea ref={contentRef} rows={10} placeholder="enter memo content"/>
                </Form.Item>
                <Form.Item>
                    <Button onClick={handleSubmit} block style={{
                        backgroundColor:"#2bf12b",
                    }} type={"primary"}>
                        SUBMIT
                    </Button>
                </Form.Item>
            </Form>
        </PopupModal>
        </>
    )
}