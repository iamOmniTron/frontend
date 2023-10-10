import { Breadcrumb,Button,Form,Input,Space,Spin,Typography, message } from "antd"
import { RxDashboard } from "react-icons/rx";
import { BsFillBuildingsFill } from "react-icons/bs";
import DataTable from "../../components/table";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useContext, useRef, useState } from "react";
import PopupModal from "../../components/modal";
import { useCreateFaculty, useDeleteFaculty, useFaculties, useUpdateFaculty } from "../../hooks/faculty";
import { extractValueFromInputRef } from "../../utils/helpers";
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
                <BsFillBuildingsFill/>
                Faculty
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
        render:(_,f)=><FacultyEdit faculty={f}/>
    }
]



function FacultyEdit({faculty}){
    const [isOpen,setIsOpen] = useState(false);
    const deleteFaculty = useDeleteFaculty();
    const updateFaculty = useUpdateFaculty();

    const {flag,setFlag} = useContext(RefreshContext);

    const titleRef = useRef(null);
    const valueRef = useRef(null);

    const handleDelete = async ()=>{
        await deleteFaculty(faculty.id);
        message.success("Faculty deleted successfully");
        setFlag(!flag);
    }


    const handleSubmit = async ()=>{
        const payload = {
            title:extractValueFromInputRef(titleRef),
            value:extractValueFromInputRef(valueRef)
        };

        const response = await updateFaculty(faculty.id,payload);
        message.success(response??"faculty update successfully");
        setIsOpen(false); 
        setFlag(!flag);
    }

    return(
        <>
            <Space>
                <Button size="large" onClick={()=>setIsOpen(true)} style={{backgroundColor:"#2bf12b"}} icon={<EditOutlined/>}/>
                <Button size="large" icon={<DeleteOutlined/>} onClick={handleDelete} danger/>
            </Space>
            <PopupModal title={"Update Faculty"} open={isOpen} closeHandler={()=>setIsOpen(false)}>
                <Form initialValues={{...faculty}}>
                    <Form.Item name={"title"}>
                        <Input ref={titleRef} placeholder="Enter title"/>
                    </Form.Item>
                    <Form.Item name={"value"}>
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


export default function Faculties(){

    const [isOpen,setIsOpen] = useState(false);

    const {flag,setFlag} = useContext(RefreshContext);

    const {loading,faculties} = useFaculties(flag);
    const createFaculty = useCreateFaculty();

    const titleRef = useRef(null);
    const valueRef = useRef(null);


    const handleSubmit = async ()=>{
        const payload = {
            title:extractValueFromInputRef(titleRef),
            value:extractValueFromInputRef(valueRef)
        };

        const response = await createFaculty(payload);
        message.success(response??"faculty created successfully");
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
                    FACULTY
                </Title>
                <div>
                    <Button onClick={()=>setIsOpen(true)} type="primary" icon={<PlusOutlined/>} style={{backgroundColor:"#2bf12b"}}>
                        ADD FACULTY
                    </Button>
                </div>
            </div>

            <div>
                <Spin spinning={loading}>
                    <DataTable data={faculties} cols={COLS}/>
                </Spin>
            </div>
            <PopupModal open={isOpen} title={"Create Faculty"} closeHandler={()=>setIsOpen(false)}>
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