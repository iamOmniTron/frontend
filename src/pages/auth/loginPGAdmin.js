import {Row,Col,Typography, Avatar, Card, Form, Input, Button, Checkbox, message} from "antd";
import Logo from "../../assets/nsuk-logo.jpg";
import { useLogin, usePgAdminLogin } from "../../hooks/auth";
import { useRef,useState } from "react";
import { extractValueFromInputRef } from "../../utils/helpers";
import { AUTH_TOKEN_NAME } from "../../utils/defaults";
import { getUserProfile,userStore } from "../../store/userStore";
import { useNavigate } from "react-router-dom";

const {Title} = Typography;





export default function LoginPGAdmin(){
    const [loading,setLoading] = useState(false);

    const loginUser = usePgAdminLogin();;

    const setUser = userStore(state=>state.setUser);
    const navigate = useNavigate()

    const matRef = useRef(null);
    const passRef = useRef(null);


    const handleSubmit = async ()=>{
        setLoading(true)
        const payload = {
            userId:extractValueFromInputRef(matRef),
            password:extractValueFromInputRef(passRef)
        }
        const token = await loginUser(payload);
        if(!token) {
            message.error("cannot log in user");
            setLoading(false);
            return;
        };
        sessionStorage.setItem(AUTH_TOKEN_NAME,token);
        const loggedUser = await getUserProfile();
        if(!loginUser){
            setLoading(false);
            return;
        }
        setUser({...loggedUser});
        setTimeout(()=>{
            message.success("redirecting to dashboard...");
            return navigate("/pg-admin/")
        },1000)
    }

    return(
        <>
        <div style={{
            height:"100vh",
            width:"100vw",
        }}>
            <Row style={{
                height:"100%",
                width:"100%"
            }}>
                <Col span={14} style={{
                    backgroundColor:"#2bf12b",
                    height:"100%",
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    color:"white",
                    flexDirection:"column"
                }}>
                    <Avatar src={Logo} shape="square" size={200}/>
                    <Title level={2} style={{color:"white"}}>
                        NASARAWA STATE UNIVERSITY,KEFFI
                    </Title>
                    <Title level={4} style={{color:"white"}}>
                        SCHOOL OF POST-GRADUATE STUDIES
                    </Title>
                </Col>
                <Col span={10} style={{
                    height:"100%",
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    color:"white",
                    flexDirection:"column",
                    backgroundColor:"lightgray"
                }}>
                    <div style={{
                        height:"45vh",
                        width:"25vw"
                    }}>
                        <Title level={2} style={{textAlign:"center"}}>
                            PG ADMINISTRATOR
                        </Title>
                        <Card style={{
                            backgroundColor:"white",
                            height:"100%"
                        }}>
                            <Title level={4} style={{textAlign:"center"}}>LOG IN</Title>
                            <Form>
                                <Form.Item>
                                    <Input ref={matRef} placeholder="Enter user ID"/>
                                </Form.Item>
                                <Form.Item>
                                    <Input.Password ref={passRef} placeholder="Enter password"/>
                                </Form.Item>
                                <Form.Item>
                                    <Button loading={loading} onClick={handleSubmit} type="primary" block style={{backgroundColor:"#2bf12b"}}>
                                        LOG IN
                                    </Button>
                                </Form.Item>
                            </Form>
                            <Checkbox>
                                Remember me
                            </Checkbox>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
        </>
    )
}