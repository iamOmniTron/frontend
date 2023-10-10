import { Breadcrumb,Button,Form,Input,Space,Spin,Typography,message } from "antd"
import { RxDashboard } from "react-icons/rx";
import DataTable from "../../components/table";
import { PlusOutlined,FolderAddFilled, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState,useRef,useContext } from "react";
import { extractValueFromInputRef } from "../../utils/helpers";
import RefreshContext from "../../context/refreshContext";
import PopupModal from "../../components/modal";
import { useCreateDocumentType, useDeleteDocumentType, useDocumentTypes, useUpdateDocumentType } from "../../hooks/types";

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
                <FolderAddFilled/>
                Document Type
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
        title:"Name",
        key:"name",
        dataIndex:"title"
    },
    {
        title:"Value",
        key:"value",
        dataIndex:"value"
    },
    {
        title:"Action",
        key:"action",
        render:(_,docType)=><DocumentTypeEdit documentType={docType}/>
    }
]


function DocumentTypeEdit({documentType}){
    
    const [isOpen,setIsOpen] = useState(false);

    const {flag,setFlag} = useContext(RefreshContext);
    
    const titleRef = useRef(null);
    const valueRef = useRef(null);

    const updateDocumentType = useUpdateDocumentType();
    const deleteDocumentType = useDeleteDocumentType();

    const handleDelete = async ()=>{
        await deleteDocumentType(documentType.id);
        message.success("document type deleted successfully");
    }


    const handleSubmit = async ()=>{
        const payload = {
            title:extractValueFromInputRef(titleRef),
            value:extractValueFromInputRef(valueRef)
        };

         await updateDocumentType(documentType.id,payload);
        message.success("configuration updated successfully");
        setFlag(!flag);
        setIsOpen(false); 
    }

    return(
        <>
            <Space>
                <Button onClick={()=>setIsOpen(true)} size="large" style={{backgroundColor:"#2bf12b"}} icon={<EditOutlined/>}/>
                <Button onClick={handleDelete} size="large" icon={<DeleteOutlined/>} danger/>
            </Space>
            <PopupModal title={"Edit Document Type"} open={isOpen} closeHandler={()=>setIsOpen(false)}>
            <Form initialValues={{...documentType}}>
                    <Form.Item name={"title"}>
                        <Input ref={titleRef} placeholder="Enter title"/>
                    </Form.Item>
                    <Form.Item name="value">
                        <Input ref={valueRef} placeholder="Enter value"/>
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


export default function DocumentTypes(){

    const [isOpen,setIsOpen] = useState(false);

    const {loading,documentTypes} = useDocumentTypes();

    const createDocumentType = useCreateDocumentType();


    const {flag,setFlag} = useContext(RefreshContext);

    const titleRef = useRef(null);
    const valueRef = useRef(null);


    
    const handleSubmit = async ()=>{
        const payload = {
            title:extractValueFromInputRef(titleRef),
            value:extractValueFromInputRef(valueRef)
        };

         await createDocumentType(payload);
        message.success("configuration created successfully");
        setIsOpen(false); 
        setFlag(!flag);
    }

    
    return(
        <>
             <div style={{height:"3em",backgroundColor:"white",padding:"1em",margin:"2em 0"}}>
                <Breadcrumb items={BREADCRUMB_ITEMS}/>
            </div>
            <div style={{padding:"0 1em",display:"flex",justifyContent:"space-between"}}>
                <Title level={3}>
                    DOCUMENT TYPE
                </Title>
                <div>
                    <Button onClick={()=>setIsOpen(true)} type="primary" icon={<PlusOutlined/>} style={{backgroundColor:"#2bf12b"}}>
                        ADD DOCUMENT TYPE
                    </Button>
                </div>
            </div>

            <div>
                <Spin spinning={loading}>
                    <DataTable data={documentTypes} cols={COLS}/>
                </Spin>
            </div>
            <PopupModal open={isOpen} title={"Create Document Typpe"} closeHandler={()=>setIsOpen(false)}>
                <Form>
                    <Form.Item>
                        <Input ref={titleRef} placeholder="Enter title"/>
                    </Form.Item>
                    <Form.Item>
                        <Input ref={valueRef} placeholder="Enter value"/>
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