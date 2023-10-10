import { FaUser } from "react-icons/fa";
import { Avatar, Breadcrumb,Button,Tag,Col,Descriptions,Row,Typography } from "antd";
import { RxDashboard } from "react-icons/rx";
import { UserOutlined } from "@ant-design/icons";
import { userStore } from "../../store/userStore";
import { useMyApplication } from "../../hooks/application";


const {Title} = Typography;



export default function UserProfile(){
    const currentUser = userStore(state=>state.user);
    const {application} = useMyApplication()


    return(
        <>
             <div style={{
                    display:"flex",
                    justifyContent:"space-between",
                    padding:"1em",
                    marginTop:"1em",
                    marginBottom:"1em",
                    boxShadow:"3px 8px 17px 0px rgba(0,0,0,0.75)"
                }}>

                <Breadcrumb>
                <Breadcrumb.Item>
                <RxDashboard style={{
                    fontSize:"1.5em"
                }}/>
                    Dashboard
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <FaUser style={{
                    fontSize:"1.5em"
                }}/>
                    Profile
                </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div style={{
                height:"100%",
                witdh:"95%",
                marginTop:"2em"
            }}>
                <div style={{
                    height:"100%",
                    witdh:"95%",
                    marginTop:"2em"
                }}>
                    <Title level={3}>USER INFORMATION</Title>
                <Row style={{
                    height:"30vh",
                    width:"100%",
                    marginTop:"3em"
                }}>
                        <Col style={{height:"100%"}} span={8}>
                            <div style={{height:"100%",width:"100%"}}>
                                <Avatar shape="square" size={200} icon={<UserOutlined/>}/>
                            </div>
                        </Col>
                        <Col span={16}>
                            <Descriptions column={1}>
                                <Descriptions.Item label="Fullname">
                                {currentUser.gender === "male"?"Mr.":"Mrs/Miss."} {currentUser.firstname} {currentUser.middlename} {currentUser.lastname}
                                </Descriptions.Item>
                                <Descriptions.Item label="E-mail">
                                    {currentUser?.email}
                                </Descriptions.Item>
                                <Descriptions.Item label="Phone">
                                    {currentUser?.phone}
                                </Descriptions.Item>
                                <Descriptions.Item label="Department">
                                    {currentUser?.Department.title}
                                </Descriptions.Item>
                                <Descriptions.Item label="Matriculation Number">
                                    {currentUser?.matricNumber}
                                </Descriptions.Item>
                                <Descriptions.Item label="Current Status">
                                    <Tag color="green">{application?.status}</Tag>
                                </Descriptions.Item>
                                <Descriptions.Item label="Last Update">
                                    {new Date(application?.updatedAt).toLocaleDateString("en-US",{day:"2-digit",month:"short",year:"2-digit"})}
                                </Descriptions.Item>
                            </Descriptions>
                        </Col>
                </Row>
                </div>
               
            </div>
        </>
    )
}