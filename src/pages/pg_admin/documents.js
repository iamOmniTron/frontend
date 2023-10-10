import {Spin,Typography,Button,Breadcrumb, Input, Select, Space,Image} from "antd";
import DataTable from "../../components/table";
import { RxDashboard } from "react-icons/rx";
import {AiFillFolderOpen} from "react-icons/ai";
import { useDocuments } from "../../hooks/document";
import { useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
import PopupModal from "../../components/modal";
import { SERVER_URL,FALLBACK_IMAGE } from "../../utils/defaults";


const {Title} = Typography; 



const COLS = [
    {
        title:"S/N",
        key:"s/n",
        render:(_,__,idx)=>idx+1
    },
    {
        title:"Student",
        key:"owner",
        dataIndex:"User",
        render:(u)=>`${u.firstname} ${u.middlename[0]}. ${u.lastname}`
    },
    {
        title:"Document Type",
        key:"type",
        dataIndex:"DocumentType",
        render:(t)=>t.title
    },
    {
        title:"Submitted on",
        key:"submitted",
        dataIndex:"createdAt",
        render:(d)=>new Date(d).toLocaleDateString("en-US",{day:"2-digit",month:"short",year:"numeric"})
    },
    {
        title:'Actions',
        key:"actions",
        render:(_,doc)=><ViewDocument document={doc}/>
    }
]


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
                Documents
            </>
        )
    }
]; 


function ViewDocument({document}){
    const [isOpen,setIsOpen] = useState(false);

    return (
        <>
            <Space>
                <Button onClick={()=>setIsOpen(true)} type="primary" style={{backgroundColor:"#2bf12b"}} size="large" icon={<EyeOutlined/>}/>
                {/* <Button type="primary" style={{backgroundColor:"#2bf12b"}} size="large" icon={<EyeOutlined/>}/> */}
            </Space>
            <PopupModal title={"preview document"} open={isOpen} closeHandler={()=>setIsOpen(false)}>
                <Image height={300}
                    width={400}
                    src={`${SERVER_URL.replace("/api","")}/${document.imageUrl}`}
                    fallback={FALLBACK_IMAGE}
                    />
            </PopupModal>
        </>
    )
}





export default function Documents(){

    const {loading,documents} = useDocuments();
    return (
        <>
              <div style={{height:"3em",backgroundColor:"white",padding:"1em",margin:"2em 0"}}>
                <Breadcrumb items={BREADCRUMB_ITEMS}/>
            </div>
            <div style={{padding:"0 1em",display:"flex",justifyContent:"space-between"}}>
                <Title level={3}>
                    STUDENTS DOCUMENT
                </Title>
                <div>
                </div>
            </div>
            {/* <div style={{height:"5em",backgroundColor:"white",padding:"1em",margin:"2em 0",display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <Select  placeholder="Select a filter"
                    optionFilterProp="children"
                   filterOption={(input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                    options={[
                    {
                        value: 'jack',
                        label: 'Jack',
                    },
                    ]}/>
            </div> */}

            <div>
                <Spin spinning={loading}>
                    <DataTable data={documents} cols={COLS}/>
                </Spin>
            </div>
        </>
    )
}