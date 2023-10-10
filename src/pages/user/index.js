import { Breadcrumb,Card,Col,Row,Typography,Image, Descriptions, Tag, Avatar, Divider } from "antd"
import {RxDashboard} from "react-icons/rx";
import { FALLBACK_IMAGE } from "../../utils/defaults";
import {UserOutlined} from "@ant-design/icons";
import DataTable from "../../components/table";
import {userStore} from "../../store/userStore";
import { useStudentMemos } from "../../hooks/memo";
import { useMyApplication } from "../../hooks/application";



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
                                        <Avatar shape="square" icon={<UserOutlined/>} size={170}/>
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
                            {/* <Descriptions.Item label="Matric Number">
                                    09902992982
                            </Descriptions.Item> */}
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
                            <DataTable data={memos} cols={MEMO_COLS}/>
                        </Col>
                    </Row>
                </Card>
            </Row>
        </>
    )
}