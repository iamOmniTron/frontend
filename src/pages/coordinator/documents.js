import { Breadcrumb,Typography,Button,Spin, Form, Select, Upload,message, Space,Image } from "antd";
import { RxDashboard } from "react-icons/rx";
import {AiFillFolderOpen} from "react-icons/ai"
import { useContext, useState } from "react";
import DataTable from "../../components/table";
import { useDeleteDocument, useDepartmentDocuments, useUploadDocument } from "../../hooks/document";
import {DeleteOutlined, EyeOutlined, PlusOutlined, UploadOutlined} from "@ant-design/icons";
import PopupModal from "../../components/modal";
import { useDepartmentalUsers } from "../../hooks/user";
import { useDocumentTypes } from "../../hooks/types";
import RefreshContext from "../../context/refreshContext";
import { FALLBACK_IMAGE, SERVER_URL } from "../../utils/defaults";


const {Title} = Typography;
const {Option} = Select;


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
                Folders
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
        title:"Student",
        key:"student",
        dataIndex:"User",
        render:({firstname,lastname})=>`${firstname} ${lastname}`
    },
    {
        title:"Document Name",
        key:"document",
        dataIndex:"DocumentType",
        render:(t)=>t?.value
    },
    {
        title:"Actions",
        key:"action",
        render:(_,d)=><DocumentActions document={d}/>
    }
]


function DocumentActions({document}){
    const [isOpen,setIsOpen] = useState(false);

    const {flag,setFlag} = useContext(RefreshContext);

    const deleteDocument = useDeleteDocument();


    const handleDelete = async()=>{
        await deleteDocument(document.id);
        message.success("document deleted successfully");
        setFlag(!flag)
    }

    return(
        <>
            <Space>
                <Button onClick={()=>setIsOpen(true)} size="large" icon={<EyeOutlined/>} type="primary" style={{backgroundColor:"#2bf12b"}}/>
                <Button onClick={handleDelete} size="large" icon={<DeleteOutlined/>} danger/>
            </Space>
            <PopupModal title={"preview document"} open={isOpen} closeHandler={()=>setIsOpen(false)}>
                <Image height={300}
                    width={400}
                    src={`${SERVER_URL.replace("/api","")}/${document.imageUrl}`}
                    fallback={FALLBACK_IMAGE}
                    preview={false}
                    />
            </PopupModal>
        </>
    )
}




export default function UserDocuments(){
    const [isOpen,setIsOpen] = useState(false);
    const [student,setStudent] = useState("");
    const [type,setType] = useState("");
    const [file,setFile] = useState(null);


    const {flag,setFlag} = useContext(RefreshContext);

    const {loading,documents} = useDepartmentDocuments(flag);
    const uploadDocument = useUploadDocument();
    const {users} = useDepartmentalUsers();
    const {documentTypes} = useDocumentTypes();

    const handleSubmit = async ()=>{
        if(!file.type.includes("image/")){
            message.error("Document should be image for security reasons");
            return;
        }
        const formData = new FormData();
        formData.append("file",file);
        formData.append("typeId",type);
        formData.append("userId",student);

        const response = await uploadDocument(formData);
        console.log(response);
        setFlag(!flag)
        setIsOpen(false);
        message.success("Document uploaded successfully");
    }

    return(
        <>
            <div style={{height:"3em",backgroundColor:"white",padding:"1em",margin:"2em 0"}}>
                <Breadcrumb items={BREADCRUMB_ITEMS}/>
            </div>
            <div style={{padding:"0 1em",display:"flex",justifyContent:"space-between"}}>
                <Title level={3}>
                    STUDENTS DOCUMENT
                </Title>
                <div>
                    <Button onClick={()=>setIsOpen(true)} icon={<PlusOutlined/>} style={{backgroundColor:"#2bf12b"}}>
                        Upload Document
                    </Button>
                </div>
            </div>
            <div>
                <Spin spinning={loading}>
                    <DataTable data={documents} cols={COLS}/>
                </Spin>
            </div>
            <PopupModal title={"Upload User Document"} open={isOpen} closeHandler={()=>setIsOpen(false)}>
                <Form>
                    <Form.Item>
                        <Select onChange={(e)=>setStudent(e)} placeholder="select student">
                            {
                                users.map((u,idx)=>(
                                    <Option value={u.id} key={idx}>{u.firstname} {u.middlename[0]} {u.lastname} - {u.matricNumber}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Select onChange={(e)=>setType(e)} placeholder="select document type">
                        {
                            documentTypes.map((t,idx)=>(
                                <Option value={t.id} key={idx}>{t.title}</Option>
                            ))
                        }
                        </Select>
                    </Form.Item>
                </Form>
                <Form.Item>
                    <Upload onChange={({file:f})=>setFile(f.originFileObj)}>
                        <Button icon={<UploadOutlined/>} block type="primary" style={{backgroundColor:"#2bf12b"}}>
                            Select document
                        </Button>
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Button onClick={handleSubmit} block type={"primary"} style={{backgroundColor:"#2bf12b"}}>
                        SUBMIT
                    </Button>
                </Form.Item>
            </PopupModal>
        </>
    )
}