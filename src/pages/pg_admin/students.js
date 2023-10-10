import { Breadcrumb,Spin,Typography } from "antd"
import { RxDashboard } from "react-icons/rx";
import { BsMortarboard } from "react-icons/bs";
import DataTable from "../../components/table";
import { useUsers } from "../../hooks/user";

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
        title:"Name",
        key:"name",
        render:(_,{firstname,lastname})=>`${firstname} ${lastname}`
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
    }
]


export default function Students(){

    const {users,loading} = useUsers();
    
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
                </div>
            </div>

            <div>
                <Spin spinning={loading}>
                    <DataTable data={users} cols={STUDENTS_COLS}/>
                </Spin>
            </div>
        </>
    )
}