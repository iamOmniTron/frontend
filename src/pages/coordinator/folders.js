import { Breadcrumb,Typography,Button,Spin,Tag, Space } from "antd";
import { RxDashboard } from "react-icons/rx";
import {AiFillFolderOpen} from "react-icons/ai"
import DataTable from "../../components/table";
import { useDepartmentalUsers } from "../../hooks/user";
import {EyeOutlined} from "@ant-design/icons"
import { useNavigate } from "react-router-dom";


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
                Folders
            </>
        )
    }
];



const FOLDER_COLS = [
    {
        title:"S/N",
        key:"s/n",
        render:(_,__,idx)=>idx+1
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
        title:"Folder Items",
        key:"items",
        dataIndex:"Documents",
        render:(d)=><Tag color={"blue"}>{d.length} items</Tag>
    },
    {
        title:"Actions",
        key:"actions",
        render:(_,f)=><PreviewFolder folder={f}/>
    }
];



function PreviewFolder({folder}){

    const navigate = useNavigate();

    const navigateToFolder = ()=>navigate("/coordinator/student-folder/preview",{state:folder})

    return(
        <>
            <Space>
                <Button type="primary" onClick={navigateToFolder} style={{backgroundColor:"#2bf12b"}} size="large" icon={<EyeOutlined/>}/>
            </Space>
        </>
    )
}



export default function Folders(){


    const {loading,users} = useDepartmentalUsers();
    return(
        <>
              <div style={{height:"3em",backgroundColor:"white",padding:"1em",margin:"2em 0"}}>
                <Breadcrumb items={BREADCRUMB_ITEMS}/>
            </div>
            <div style={{padding:"0 1em",display:"flex",justifyContent:"space-between"}}>
                <Title level={3}>
                    SELECT STUDENT FOLDER
                </Title>
            </div>

            <div>
                <Spin spinning={loading}>
                    <DataTable data={users} cols={FOLDER_COLS}/>
                </Spin>
            </div>
        </>
    )
}