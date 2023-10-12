import { FaUser } from "react-icons/fa";
import { Avatar, Breadcrumb,Button,message,Col,Descriptions,Row,Typography, Upload,Image } from "antd";
import { RxDashboard } from "react-icons/rx";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { userStore,getUserProfile } from "../../store/userStore";
import { useUploadProfilePicture } from "../../hooks/coordinator";
import { SERVER_URL,FALLBACK_IMAGE } from "../../utils/defaults";


const {Title} = Typography;



export default function UserProfile(){
    const currentUser = userStore(state=>state.user);
    // console.log(currentUser)

    const setUser = userStore(state=>state.setUser)

    const uploadImage = useUploadProfilePicture();


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
                    <Title level={3}>COORDINATOR INFORMATION</Title>
                <Row style={{
                    height:"30vh",
                    width:"100%",
                    marginTop:"3em"
                }}>
                        <Col style={{height:"100%"}} span={8}>
                            <div style={{height:"100%",width:"100%",display:"flex",flexDirection:"column"}}>
                                {
                                    currentUser.imageUrl? <Image height={150}
                                    width={150}
                                    src={`${SERVER_URL.replace("/api","")}/${currentUser.imageUrl}`}
                                    fallback={FALLBACK_IMAGE}/>:
                                <Avatar shape="square" size={200} icon={<UserOutlined/>}/>
                                }
                                <Upload customRequest={handleFileUpload} showUploadList={false} style={{width:"100%"}}>
                                    <Button type="primary" icon={<UploadOutlined/>} style={{backgroundColor:"#2bf12b",marginTop:"1em",width:"100%"}}>
                                        Upload Picture
                                    </Button>
                                </Upload>
                            </div>
                        </Col>
                        <Col span={16}>
                            <Descriptions column={1}>
                                <Descriptions.Item label="Fullname">
                                  {currentUser?.gender === "male"?"Mr.":"Mrs."}  {currentUser?.firstname} {currentUser?.middlename} {currentUser?.lastname}
                                </Descriptions.Item>
                                <Descriptions.Item label="E-mail">
                                    {currentUser?.email}
                                </Descriptions.Item>
                                <Descriptions.Item label="Phone">
                                    {currentUser?.phone}
                                </Descriptions.Item>
                                <Descriptions.Item label="Department">
                                    {currentUser?.Department?.title}
                                </Descriptions.Item>
                                <Descriptions.Item label="User ID">
                                    {currentUser?.userId}
                                </Descriptions.Item>
                                <Descriptions.Item label="Department">
                                    {currentUser?.Department?.title}
                                </Descriptions.Item>
                            </Descriptions>
                        </Col>
                </Row>
                </div>
               
            </div>
        </>
    )
}