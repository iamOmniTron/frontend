import DataTable from "../../components/table"
import { Breadcrumb,Button,Space,Spin,Typography,message } from "antd";
import {AiOutlineUnorderedList} from "react-icons/ai"
import { RxDashboard } from "react-icons/rx";
import { useDepartmentalUsers } from "../../hooks/user";
import { CheckOutlined } from "@ant-design/icons";
import { useContext } from "react";
import RefreshContext from "../../context/refreshContext";
import { useCreateApplication } from "../../hooks/application";



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
                <AiOutlineUnorderedList/>
                List
            </>
        )
    }
];


const LIST_COLS = [
    {
        title:"S/N",
        key:"s/n",
        render:(_,__,idx)=>idx+1
    },
    {
        title:"Name",
        key:"name",
        render:(_,{firstname,lastname})=>`${firstname} ${lastname}`
    },
    {
        title:"Gender",
        key:"gender",
        dataIndex:"gender"
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
        title:"Action",
        key:"action",
        render:(_,s)=><Actions student={s}/>
    }
];

function Actions({student}){
    const {flag,setFlag} = useContext(RefreshContext);

    const createApplication = useCreateApplication();

    const handleApproval = async()=>{
        const payload = {
            userId:student.id
        }
        await createApplication(payload);
        message.success("student application submitted successfully");
        setFlag(!flag);
    }

    return(
        <>
            <Space>
                <Button type="primary" onClick={handleApproval} icon={<CheckOutlined/>} style={{backgroundColor:"#2bf12b"}}>
                    Submit
                </Button>
            </Space>
        </>
    )
}



export default function ListToSubmit(){
    const {flag} = useContext(RefreshContext)
    const {loading,users} = useDepartmentalUsers(flag);
    const filtered = users.filter((u)=>u.Application === null);
    return(
        <>
            <div style={{height:"3em",backgroundColor:"white",padding:"1em",margin:"2em 0"}}>
                <Breadcrumb items={BREADCRUMB_ITEMS}/>
            </div>
            <div style={{padding:"0 1em",display:"flex",justifyContent:"space-between"}}>
                <Title level={3}>
                    STUDENTS AVAILABLE
                </Title>
                <div>
                    {/* <Button type="primary" style={{backgroundColor:"#2bf12b"}}>
                        Submit List
                    </Button> */}
                </div>
            </div>

            <div>
                <Spin spinning={loading}>
                    <DataTable data={filtered} cols={LIST_COLS}/>
                </Spin>
            </div>
        </>
    )
}