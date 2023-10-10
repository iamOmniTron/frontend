import { Breadcrumb,Button,Spin,Typography,Space,Descriptions,Card } from "antd"
import {EyeOutlined} from "@ant-design/icons"
import {LuScrollText} from "react-icons/lu"
import {RxDashboard} from "react-icons/rx";
import DataTable from "../../components/table";
import { useStudentMemos } from "../../hooks/memo";
import PopupModal from "../../components/modal";
import { useState } from "react";


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


    return (
        <>
            <Space>
                <Button onClick={()=>setIsOpen(true)} style={{backgroundColor:"#2bf12b"}} size="large" type="primary" icon={<EyeOutlined/>}/>
            </Space>
            <PopupModal title={"preview memo"} open={isOpen} closeHandler={()=>setIsOpen(false)}>
            <Descriptions column={2}>
                    <Descriptions.Item label={"Memo Title"}>
                        {memo.title}
                    </Descriptions.Item>
                    <Descriptions.Item label={"Memo Subject"}>
                        {memo.subject}
                    </Descriptions.Item>
                </Descriptions>
                <span style={{fontWeight:"bold"}}>Memo Content</span>
                <Card>
                    <i>{memo.text}</i>
                </Card>
            </PopupModal>
        </>
    )
}





export default function UserMemo(){

    const {loading,memos} = useStudentMemos();

    return(
        <>
            <div style={{height:"3em",backgroundColor:"white",padding:"1em",margin:"2em 0"}}>
                <Breadcrumb items={BREADCRUMB_ITEMS}/>
            </div>
            <div style={{padding:"0 1em",display:"flex",justifyContent:"space-between"}}>
                <Title level={3}>
                    DEPARTMENTAL MEMOS
                </Title>
            </div>

            <div>
                <Spin spinning={loading}>
                    <DataTable data={memos} cols={MEMO_COLS}/>
                </Spin>
            </div>
        </>
    )
}