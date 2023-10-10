import { Breadcrumb,Button,Form,Input,Spin,Typography,Select,message, Space } from "antd"
import { RxDashboard } from "react-icons/rx";
import { IoBookSharp } from "react-icons/io5";
import DataTable from "../../components/table";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useState,useRef,useContext } from "react";
import PopupModal from "../../components/modal";
import { useCreateDepartment, useDeleteDepartment, useDepartments } from "../../hooks/department";
import RefreshContext from "../../context/refreshContext";
import { extractValueFromInputRef } from "../../utils/helpers";
import { useFaculties, useUpdateFaculty } from "../../hooks/faculty";

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
                <IoBookSharp/>
                Department
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
        title:"Faculty",
        key:"faculty",
        dataIndex:"Faculty",
        render:(f)=>f.value
    },
    {
        title:"Action",
        key:"action",
        render:(_,dep)=><DepartmentEdit department={dep}/>
    }
];


function DepartmentEdit({department}){
    const [isOpen,setIsOpen] = useState(false);
    const [fac,setFac] = useState(department.FacultyId);

    
    const {flag,setFlag} = useContext(RefreshContext);

    const titleRef = useRef(null);
    const valueRef = useRef(null);

    const updateDepartment = useDeleteDepartment();
    const deleteDepartment = useDeleteDepartment();
    const {faculties} = useFaculties();


    const handleDelete = async()=>{
        await deleteDepartment(department.id);
        message.success("Department deleted successfully");
        setFlag(!flag);
    }

    const handleSubmit = async ()=>{
        const payload = {
            title:extractValueFromInputRef(titleRef),
            value:extractValueFromInputRef(valueRef),
            facultyId:fac.toString()
        };

        await updateDepartment(department.id,payload);
        message.success("department updated successfully");
        setIsOpen(false); 
        setFlag(!flag);
    }

    return(
        <>
            <Space>
                <Button size="large" onClick={()=>setIsOpen(true)} icon={<EditOutlined/>} style={{backgroundColor:"#2bf12b"}}/>
                <Button size="large" icon={<DeleteOutlined/>} danger onClick={handleDelete}/>
            </Space>
            <PopupModal title={"Edit Department"} open={isOpen}  closeHandler={()=>setIsOpen(false)}>
            <Form initialValues={{...department}}>
                    <Form.Item name={"title"}>
                        <Input ref={titleRef} placeholder="Enter title"/>
                    </Form.Item>
                    <Form.Item name={"value"}>
                        <Input ref={valueRef} placeholder="Enter value"/>
                    </Form.Item>
                    <Form.Item name="Faculty">
                        <Select placeholder="Select faculty" onChange={(e)=>setFac(e)}>
                            {
                                faculties.map((f,idx)=>(
                                    <Option value={f.id} key={idx}>{f.title}</Option>
                                ))
                            }
                        </Select>
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


export default function Departments(){
    const [fac,setFac] = useState("");
    const [isOpen,setIsOpen] = useState(false);

    const {flag,setFlag} = useContext(RefreshContext);

    const titleRef = useRef(null);
    const valueRef = useRef(null);

    const createDepartment = useCreateDepartment();
    const {loading,departments} = useDepartments(flag);
    const {faculties} = useFaculties();



    const handleSubmit = async ()=>{
        const payload = {
            title:extractValueFromInputRef(titleRef),
            value:extractValueFromInputRef(valueRef),
            facultyId:fac.toString()
        };

        await createDepartment(payload);
        message.success("department created successfully");
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
                    DEPARTMENT
                </Title>
                <div>
                    <Button onClick={()=>setIsOpen(true)} type="primary" icon={<PlusOutlined/>} style={{backgroundColor:"#2bf12b"}}>
                        ADD DEPARTMENT
                    </Button>
                </div>
            </div>

            <div>
                <Spin spinning={loading}>
                    <DataTable data={departments} cols={COLS}/>
                </Spin>
            </div>
            <PopupModal open={isOpen} title={"Create Department"} closeHandler={()=>setIsOpen(false)}>
                <Form>
                    <Form.Item>
                        <Input ref={titleRef} placeholder="Enter title"/>
                    </Form.Item>
                    <Form.Item>
                        <Input ref={valueRef} placeholder="Enter value"/>
                    </Form.Item>
                    <Form.Item>
                        <Select placeholder="Select faculty" onChange={(e)=>setFac(e)}>
                            {
                                faculties.map((f,idx)=>(
                                    <Option value={f.id} key={idx}>{f.title}</Option>
                                ))
                            }
                        </Select>
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