import { Breadcrumb,Typography} from "antd";
import { RxDashboard } from "react-icons/rx";
import {AiFillFolderOpen} from "react-icons/ai"
import DataTable from "../../components/table";
import {useLocation} from "react-router-dom";


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
                <AiFillFolderOpen/>
                Student Folder
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
        title:"Document",
        key:"document",
        dataIndex:"DocumentType",
        render:(t)=>t.title
    },
    {
        title:"Uploaded on",
        key:"date",
        dataIndex:"createdAt",
        render:(d)=> new Date(d).toLocaleDateString("en-US",{month:"short",day:"2-digit",year:"2-digit"})
    }
]



export default function StudentFolder(){
        const {state:student} = useLocation();

    return(
        <>
            <div style={{height:"3em",backgroundColor:"white",padding:"1em",margin:"2em 0"}}>
                <Breadcrumb items={BREADCRUMB_ITEMS}/>
            </div>
            <div style={{padding:"0 1em",display:"flex",justifyContent:"space-between"}}>
                <Title level={3}>
                    {student.firstname} {student.middlename[0]}. {student.lastname}'s Folder
                </Title>
            </div>
            <div>
                    <DataTable data={student.Documents} cols={COLS}/>
            </div>
        </>
    )
}