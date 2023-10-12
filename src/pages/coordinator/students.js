import { Breadcrumb,Typography,Spin, Button, Modal, Form, Input, Select, message, Space, Avatar } from "antd"
import { BsMortarboard } from "react-icons/bs";
import { RxDashboard } from "react-icons/rx"
import DataTable from "../../components/table";
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import PopupModal from "../../components/modal";
import {useContext, useRef, useState} from "react"
import { useCreateUser, useDeleteUser, useDepartmentalUsers, useUpdateUser, useUsers } from "../../hooks/user";
import RefreshContext from "../../context/refreshContext";
import { SERVER_URL } from "../../utils/defaults";
import { extractValueFromInputRef } from "../../utils/helpers";




const {Title} = Typography
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
                <BsMortarboard/>
                Students
            </>
        )
    }
];


const STUDENTS_COLS = [
    {
        title:"S/N",
        key:"s/n",
        render:(_,__,idx)=>idx+1
    },
    {
        title:"Thumbnail",
        key:"thumbnail",
        dataIndex:"imageUrl",
        render:(i)=><Avatar src={`${SERVER_URL.replace("/api","")}/${i}`}/>
    },
    {
        title:"Name",
        key:"name",
        render:(_,{firstname,middlename,lastname})=>`${firstname} ${middlename[0]}. ${lastname}`
    },
    {
        title:"Matric Number",
        key:"matric",
        dataIndex:"matricNumber"
    },
    {
        title:"E-mail",
        key:"email",
        dataIndex:"email"
    },
    {
        title:"Phone",
        key:"phone",
        dataIndex:"phone"
    },
    {
        title:"Gender",
        key:"gender",
        dataIndex:"gender"
    },
    {
        title:"Action",
        key:"action",
        render:(_,s)=><StudentEdit student={s}/>
    }
]


function StudentEdit({student}){
    const [isOpen,setIsOpen] = useState(false);
    const [gender,setGender] = useState(student.gender);
    const {flag,setFlag} = useContext(RefreshContext);

    const deleteUser = useDeleteUser();
    const updateUser = useUpdateUser();

    const fnameRef = useRef(null);
    const lnameRef = useRef(null);
    const mnameRef = useRef(null);
    const emailRef = useRef(null);
    const phoneRef = useRef(null);
    const matRef = useRef(null);

    const handleDelete = async ()=>{
        await deleteUser(student.id);
        message.success("user deleted successfully");
        setFlag(!flag);
    }


    const handleSubmit = async ()=>{
        const payload = {
            firstname:extractValueFromInputRef(fnameRef),
            middlename:extractValueFromInputRef(mnameRef),
            lastname:extractValueFromInputRef(lnameRef),
            phone:extractValueFromInputRef(phoneRef),
            email:extractValueFromInputRef(emailRef),
            matricNumber:extractValueFromInputRef(matRef),
            gender
        };

        await updateUser(payload.id,payload);
        message.success("user updated successfully");
        setFlag(!flag);
        setIsOpen(false);
    }


    return(
        <>
            <Space>
                <Button onClick={()=>setIsOpen(true)} size="large" icon={<EditOutlined/>} style={{backgroundColor:"#2bf12b"}}/>
                <Button onClick={handleDelete} danger size="large" icon={<DeleteOutlined/>}/>
                {/* <Button size="large" icon={<EyeOutlined/>} style={{backgroundColor:"#2bf12b"}}/> */}
            </Space>
            <PopupModal open={isOpen} closeHandler={()=>setIsOpen(false)} title={"Edit user"}>
                <Form initialValues={{...student}}>
                        <Form.Item name="firstname">
                            <Input ref={fnameRef} placeholder="enter firstname"/>
                        </Form.Item>
                        <Form.Item name="middlename">
                            <Input ref={mnameRef} placeholder="enter middlename"/>
                        </Form.Item>
                        <Form.Item name="lastname">
                            <Input ref={lnameRef} placeholder="enter lastname"/>
                        </Form.Item>
                        <Form.Item name="gender">
                            <Select onChange={(e)=>setGender(e)} placeholder="select gender">
                                <Option value="male">Male</Option>
                                <Option value="female">Female</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="email">
                            <Input ref={emailRef} placeholder="enter email address"/>
                        </Form.Item>
                        <Form.Item name="phone">
                            <Input ref={phoneRef} placeholder="enter phone number"/>
                        </Form.Item>
                        <Form.Item name="matricNumber">
                            <Input ref={matRef} placeholder="enter matric/registration number"/>
                        </Form.Item>
                        <Form.Item>
                            <Button onClick={handleSubmit} type="primary" block style={{
                                backgroundColor:"#2bf12b"
                            }}>
                                SUBMIT
                            </Button>
                        </Form.Item>
                    </Form>
            </PopupModal>
        </>
    )
}


export default function Students(){
    const [isOpen,setIsOpen] = useState(false);
    const [gender,setGender] = useState("");
    const {flag,setFlag} = useContext(RefreshContext);


    const {loading,users} = useDepartmentalUsers(flag);
    const createUser = useCreateUser();

    const fnameRef = useRef(null);
    const lnameRef = useRef(null);
    const mnameRef = useRef(null);
    const emailRef = useRef(null);
    const phoneRef = useRef(null);
    const matRef = useRef(null);


    const handleSubmit = async ()=>{
        const payload = {
            firstname:extractValueFromInputRef(fnameRef),
            middlename:extractValueFromInputRef(mnameRef),
            lastname:extractValueFromInputRef(lnameRef),
            phone:extractValueFromInputRef(phoneRef),
            email:extractValueFromInputRef(emailRef),
            matricNumber:extractValueFromInputRef(matRef),
            gender
        };

        await createUser(payload);
        message.success("user created successfully");
        setFlag(!flag);
        setIsOpen(false);
    }

    return(
        <>
            <div style={{height:"3em",backgroundColor:"white",padding:"1em",margin:"2em 0"}}>
                <Breadcrumb items={BREADCRUMB_ITEMS}/>
            </div>
            <div style={{padding:"0 1em",display:"flex",justifyContent:"space-between"}}>
                <Title level={3}>
                    STUDENTS
                </Title>
                <div>
                    <Button type="primary" style={{
                        backgroundColor:"#2bf12b"
                    }} icon={<PlusOutlined/>} onClick={()=>setIsOpen(true)}>
                        ADD STUDENT
                    </Button>
                </div>
            </div>

            <div>
                <Spin spinning={loading}>
                    <DataTable data={users} cols={STUDENTS_COLS}/>
                </Spin>
            </div>
            <PopupModal title={"Add students"} closeHandler={()=>setIsOpen(false)} open={isOpen}>
                    <Form>
                        <Form.Item name="firstname">
                            <Input ref={fnameRef} placeholder="enter firstname"/>
                        </Form.Item>
                        <Form.Item name="middlename">
                            <Input ref={mnameRef} placeholder="enter middlename"/>
                        </Form.Item>
                        <Form.Item name="lastname">
                            <Input ref={lnameRef} placeholder="enter lastname"/>
                        </Form.Item>
                        <Form.Item name="gender">
                            <Select onChange={(e)=>setGender(e)} placeholder="select gender">
                                <Option value="male">Male</Option>
                                <Option value="female">Female</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="email">
                            <Input ref={emailRef} placeholder="enter email address"/>
                        </Form.Item>
                        <Form.Item name="phone">
                            <Input ref={phoneRef} placeholder="enter phone number"/>
                        </Form.Item>
                        <Form.Item name="matricNumber">
                            <Input ref={matRef} placeholder="enter matric/registration number"/>
                        </Form.Item>
                        <Form.Item>
                            <Button onClick={handleSubmit} type="primary" block style={{
                                backgroundColor:"#2bf12b"
                            }}>
                                SUBMIT
                            </Button>
                        </Form.Item>
                    </Form>
            </PopupModal>
        </>
    )
}