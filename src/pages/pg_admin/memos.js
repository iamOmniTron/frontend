import { Breadcrumb,Button,Card,Descriptions,Space,Spin,Typography } from "antd"
import DataTable from "../../components/table";
import {PiScrollBold} from "react-icons/pi"
import { RxDashboard } from "react-icons/rx";
import { useState } from "react";
import { useMemos } from "../../hooks/memo";
import { EyeOutlined } from "@ant-design/icons";
import PopupModal from "../../components/modal";


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
                <PiScrollBold/>
                    Memos
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
        title:"Department",
        key:"department",
        dataIndex:"Department",
        render:(d)=>d.title
    },
    {
        title:"Action",
        key:"action",
        render:(_,m)=><PreviewMemo memo={m}/>
    }
]


function PreviewMemo({memo}){
    const [isOpen,setIsOpen] = useState(false);

    return(
        <>
            <Space>
                <Button onClick={()=>setIsOpen(true)} style={{backgroundColor:"#2bf12b"}} size="large" icon={<EyeOutlined/>} type="primary"/>
            </Space>

            <PopupModal open={isOpen} title={"preview memo"} closeHandler={()=>setIsOpen(false)}>
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




export default function Memos(){
    const [isOpen,setIsOpen] = useState(false);

    const {loading,memos} = useMemos();

    return(
        <>
            <div style={{height:"3em",backgroundColor:"white",padding:"1em",margin:"2em 0"}}>
                <Breadcrumb items={BREADCRUMB_ITEMS}/>
            </div>
            <div style={{padding:"0 1em",display:"flex",justifyContent:"space-between"}}>
                <Title level={3}>
                    MEMOS
                </Title>
                <div>
                </div>
            </div>
            <div>
                <Spin spinning={loading}>
                    <DataTable data={memos} cols={COLS}/>
                </Spin>
            </div>
        </>
    )
}