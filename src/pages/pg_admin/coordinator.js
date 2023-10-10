import { Breadcrumb,Button,Form,Input,Select,Space,Spin,Typography,message } from "antd"
import DataTable from "../../components/table";
import { UserOutlined,PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { RxDashboard } from "react-icons/rx";
import { useRef, useState,useContext } from "react";
import { useCoordinators, useCreateCoordinator, useDeleteCoordinator, useUpdateCoordinator } from "../../hooks/coordinator";
import RefreshContext from "../../context/refreshContext";
import PopupModal from "../../components/modal";
import { useDepartments } from "../../hooks/department";
import { extractValueFromInputRef } from "../../utils/helpers";


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
                <UserOutlined/>
                    Coordinator
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
        render:(_,{firstname,middlename,lastname})=>`${firstname} ${(middlename[0])}. ${lastname}`
    },
    {
        title:"E-mail",
        key:"email",
        dataIndex:"email"
    },
    {
        title:"User ID",
        key:"userId",
        dataIndex:"userId"
    },
    {
        title:"Department",
        key:"department",
        dataIndex:"Department",
        render:(d)=>d?.title
    },
    {
        title:"Action",
        key:"action",
        render:(_,c)=><CoordinatorEdit coordinator={c}/>
    }
];


function CoordinatorEdit({coordinator}){
    const [isOpen,setIsOpen] = useState(false);
    const [dep,setDep] = useState(coordinator.DepartmentId);
    const [gender,setGender] = useState(coordinator.gender);

    const {flag,setFlag} = useContext(RefreshContext);

    const {Option} = Select;


    const fnameRef = useRef(null)
    const mnameRef = useRef(null)
    const lnameRef = useRef(null)
    const emailRef = useRef(null)
    const userIdRef = useRef(null)
    const phoneRef = useRef(null)

    const updateCoordinator = useUpdateCoordinator();
    const deleteCoordinator = useDeleteCoordinator();


    const handleDelete = async ()=>{
        await deleteCoordinator(coordinator.id);
        message.success("coordinator removed successfully");
        setFlag(!flag)
    }

        
    const {departments} = useDepartments();



    const handleSubmit = async ()=>{
        const payload = {
            firstname:extractValueFromInputRef(fnameRef),
            middlename:extractValueFromInputRef(mnameRef),
            lastname:extractValueFromInputRef(lnameRef),
            email:extractValueFromInputRef(emailRef),
            phone:extractValueFromInputRef(phoneRef),
            userId:extractValueFromInputRef(userIdRef),
            gender,
            departmentId:dep.toString()
        }
        await updateCoordinator(coordinator.id,payload);
        message.success("coordinator created successfully");
        setFlag(!flag)
        setIsOpen(false)
    }
    return(
        <>
            <Space>
                <Button size="large" onClick={()=>setIsOpen(true)} style={{backgroundColor:"#2bf12b"}} icon={<EditOutlined/>}/>
                <Button size="large" icon={<DeleteOutlined/>} onClick={handleDelete} danger/>
            </Space>
            <PopupModal title={"Update Coordinator"} open={isOpen} closeHandler={()=>setIsOpen(false)}>
                <Form initialValues={{...coordinator}}>
                    <Form.Item name={"firstname"}>
                        <Input ref={fnameRef} placeholder="enter firstname"/>
                    </Form.Item>
                    <Form.Item name={"middlename"}>
                        <Input ref={mnameRef} placeholder="enter middlename"/>
                    </Form.Item>
                    <Form.Item name="lastname">
                        <Input ref={lnameRef} placeholder="enter lastname"/>
                    </Form.Item>
                    <Form.Item name="email">
                        <Input ref={emailRef} placeholder="enter email"/>
                    </Form.Item>
                    <Form.Item name="userId">
                        <Input ref={userIdRef} placeholder="enter user ID"/>
                    </Form.Item>
                    <Form.Item name={"phone"}>
                        <Input ref={phoneRef} placeholder="enter phone"/>
                    </Form.Item>
                    <Form.Item name="gender">
                        <Select onChange={(e)=>setGender(e)} placeholder="select coordinator gender">
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name={"Department"}>
                    <Select onChange={(e)=>setDep(e)} placeholder="select department">
                        {
                            departments.map((d,idx)=>(
                                <Option value={d.id} key={idx}>{d.value}</Option>
                            ))
                        }
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={handleSubmit} type="primary" block style={{backgroundColor:"#2bf12b"}}>
                            SUBMIT
                        </Button>
                    </Form.Item>
                </Form>
            </PopupModal>
        </>
    )
}




export default function Coordinators(){
    const [isOpen,setIsOpen] = useState(false);
    const [dep,setDep] = useState("");
    const [gender,setGender] = useState("");
    const createCoordinator = useCreateCoordinator();
    
    const {flag,setFlag} = useContext(RefreshContext);
    
    const {departments} = useDepartments();

    const {loading,coordinators}= useCoordinators(flag);
    const {Option} = Select;


    const fnameRef = useRef(null)
    const mnameRef = useRef(null)
    const lnameRef = useRef(null)
    const emailRef = useRef(null)
    const userIdRef = useRef(null)
    const phoneRef = useRef(null)



    const handleSubmit = async ()=>{
        const payload = {
            firstname:extractValueFromInputRef(fnameRef),
            middlename:extractValueFromInputRef(mnameRef),
            lastname:extractValueFromInputRef(lnameRef),
            email:extractValueFromInputRef(emailRef),
            phone:extractValueFromInputRef(phoneRef),
            userId:extractValueFromInputRef(userIdRef),
            gender,
            departmentId:dep.toString()
        }
        await createCoordinator(payload);
        message.success("coordinator created successfully");
        setFlag(!flag)
        setIsOpen(false)
    }


    return(
        <>
            <div style={{height:"3em",backgroundColor:"white",padding:"1em",margin:"2em 0"}}>
                <Breadcrumb items={BREADCRUMB_ITEMS}/>
            </div>
            <div style={{padding:"0 1em",display:"flex",justifyContent:"space-between"}}>
                <Title level={3}>
                    COORDINATORS
                </Title>
                <div>
                    <Button type="primary" style={{
                        backgroundColor:"#2bf12b"
                    }} icon={<PlusOutlined/>} onClick={()=>setIsOpen(true)}>
                        ADD COORDINATOR
                    </Button>
                </div>
            </div>
            <div>
                <Spin spinning={loading}>
                    <DataTable data={coordinators} cols={COLS}/>
                </Spin>
            </div>
            <PopupModal title={"Create Coordinator"} open={isOpen} closeHandler={()=>setIsOpen(false)}>
                <Form>
                    <Form.Item>
                        <Input ref={fnameRef} placeholder="enter firstname"/>
                    </Form.Item>
                    <Form.Item>
                        <Input ref={mnameRef} placeholder="enter middlename"/>
                    </Form.Item>
                    <Form.Item>
                        <Input ref={lnameRef} placeholder="enter lastname"/>
                    </Form.Item>
                    <Form.Item>
                        <Input ref={emailRef} placeholder="enter email"/>
                    </Form.Item>
                    <Form.Item>
                        <Input ref={userIdRef} placeholder="enter user ID"/>
                    </Form.Item>
                    <Form.Item>
                        <Input ref={phoneRef} placeholder="enter phone"/>
                    </Form.Item>
                    <Form.Item>
                        <Select onChange={(e)=>setGender(e)} placeholder="select coordinator gender">
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                    <Select onChange={(e)=>setDep(e)} placeholder="select department">
                        {
                            departments.map((d,idx)=>(
                                <Option value={d.id} key={idx}>{d.value}</Option>
                            ))
                        }
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={handleSubmit} type="primary" block style={{backgroundColor:"#2bf12b"}}>
                            SUBMIT
                        </Button>
                    </Form.Item>
                </Form>
            </PopupModal>
        </>
    )
}