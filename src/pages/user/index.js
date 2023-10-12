import { Breadcrumb,Card,Col,Row,Typography,Image, Descriptions, Tag, Avatar, Divider,message,Upload,Button } from "antd"
import {RxDashboard} from "react-icons/rx";
import { FALLBACK_IMAGE,SERVER_URL } from "../../utils/defaults";
import {UserOutlined,UploadOutlined} from "@ant-design/icons";
import DataTable from "../../components/table";
import {userStore,getUserProfile} from "../../store/userStore";
import { useStudentMemos } from "../../hooks/memo";
import { useMyApplication } from "../../hooks/application";
import { useUploadProfilePicture } from "../../hooks/user";



const BREADCRUMB_ITEMS = [
    {
        key:"1",
        title:(
            <>
            <RxDashboard/>
            Dashboard
            </>
        )
    }
];

const MEMO_COLS = [
    {
        title:"S/N",
        key:"s/n",
        render:(_,__,idx)=>idx+1
    },
    {
        title:"Title",
        key:"title",
        dataIndex:"title"
    },
    {
        title:"Subject",
        key:"subject",
        dataIndex:"subject"
    },
    {
        title:"Published Date",
        key:"date",
        dataIndex:"createdAt",
        render:(d)=> new Date(d).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})
    },
]


const {Title} = Typography;




export default function UserDashboard(){
    const currentUser = userStore(state=>state.user);
    const {memos} = useStudentMemos();
    const {application} = useMyApplication();
    const uploadImage = useUploadProfilePicture()

    const setUser = userStore(state=>state.setUser);


    const handleFileUpload = async ({file})=>{
        const formData = new FormData();
        formData.append("image",file);
        const response = await uploadImage(formData);
        const {password,...userData} = await getUserProfile();
        setUser(userData);
        message.success(response);
    }


    return(
        <>
            <div style={{height:"3em",backgroundColor:"white",padding:"1em",margin:"2em 0"}}>
                <Breadcrumb items={BREADCRUMB_ITEMS}/>
            </div>
            <div style={{padding:"0 1em"}}>
                <Title level={3}>
                    <b>{currentUser.firstname}</b> {currentUser.middlename[0]} {currentUser.lastname}
                </Title>
            </div>
            <Row gutter={24}>
                <Col span={8}>
                            <Card>
                                <Row>
                                <Col span={12}>
                                <div style={{height:"100%",width:"100%"}}>
                                {
                                    currentUser.imageUrl? <Image height={120}
                                    width={150}
                                    src={`${SERVER_URL.replace("/api","")}/${currentUser.imageUrl}`}
                                    fallback={FALLBACK_IMAGE}/>:
                                <Avatar shape="square" size={120} icon={<UserOutlined/>}/>
                                }
                                <Upload customRequest={handleFileUpload} showUploadList={false} style={{width:"100%"}}>
                                    <Button type="primary" icon={<UploadOutlined/>} style={{backgroundColor:"#2bf12b",marginTop:"1em",width:"100%"}}>
                                        Upload Picture
                                    </Button>
                                </Upload>
                            </div>
                                </Col>
                            </Row>
                            </Card>
                </Col>
                <Col span={16}>
                    <Card>
                        <Descriptions column={2} title="Basic Information">
                            <Descriptions.Item label="Name">
                                     {currentUser.gender === "male"?"Mr.":"Mrs/Miss."} {currentUser.firstname} {currentUser.middlename} {currentUser.lastname}
                            </Descriptions.Item>
                            <Descriptions.Item label="Matric Number">
                                    {currentUser.matricNumber}
                            </Descriptions.Item>
                            <Descriptions.Item label="Phone">
                                    {currentUser.phone}
                            </Descriptions.Item>
                            <Descriptions.Item label="E-mail">
                                    {currentUser.phone}
                            </Descriptions.Item>
                            <Descriptions.Item label="Gender">
                                    <Tag color="green">{currentUser.gender[0].toUpperCase()}</Tag>
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>
            </Row>
            <Row style={{marginTop:"3em"}}>
                <Card style={{width:"100%"}}>
                    <Row gutter={24}>
                        <Col span={12}>
                            <Divider orientation="left">
                                <Title level={4}>
                                   CLEARANCE PROGRESS
                                </Title>
                            </Divider>
                            <div>
                                <Title level={2}>
                                    Current Status: {application === null?<Tag color="gray">Unknown</Tag>:application.status === "rejected"?<Tag color="red">Rejected</Tag>:application.status === "pending"?<Tag color="orange">Pending</Tag>:<Tag color="green">Successful</Tag>}
                                </Title>
                            </div>
                        </Col>
                        <Col span={12}>
                            <Title level={4}>
                                DEPARTMENTAL MEMOS
                            </Title>
                            <DataTable data={[{...memos[0]}]} cols={MEMO_COLS}/>
                        </Col>
                    </Row>
                </Card>
            </Row>
        </>
    )
}