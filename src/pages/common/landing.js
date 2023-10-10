import {Row,message, Avatar, Button, Input,Typography, Card, Descriptions} from "antd";
import Marquee from "react-fast-marquee";
import Logo from "../../assets/nsuk-logo.jpg"
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useSearchUsers } from "../../hooks/user";
import { extractValueFromInputRef } from "../../utils/helpers";



const {Title} = Typography;


export default function LandingPage(){
    const [show,setShow] = useState(false)
    const [user,setUser] = useState(null)

    const inputRef = useRef(null)

    const navigate = useNavigate();
    const searchUser = useSearchUsers();

    const navigateToLogin = ()=>navigate("/login/user")

    const handleSearch = async()=>{
        const payload = extractValueFromInputRef(inputRef)
        const response = await searchUser(payload)
        if(!response){
            message.error("No user found");
            return;
        }
        setUser(response);

        setTimeout(()=>setUser(null),7000)
    }


    return(
        <>
            <div style={{
                height:"100vh",
                width:"100vw",
            }}>
                <div style={{
                    height:"15vh",
                    width:"100vw",
                    backgroundColor:"#2bf12b",
                    display:"flex",
                    justifyContent:"space-between",
                    alignItems:"center",
                    paddingInline:"2em"
                }}>
                        <Avatar src={Logo} shape="square" size={70}/>
                    <div style={{
                        width:"5em",
                        height:"3em"
                    }}>
                        <Button onClick={navigateToLogin} style={{
                            height:"3em",
                            backgroundColor:"#008000"
                        }} type="primary">
                            LOGIN
                        </Button>
                    </div>
                </div>
                <div style={{
                    height:"85vh",
                    width:"100vw",
                    backgroundImage:"url('/nsuk-gate-2.jpg')",
                    backgroundSize:"cover",
                    backgroundRepeat:"no-repeat",
                    
                }}>

                        <Marquee autoFill speed={40} pauseOnClick pauseOnHover delay={1}>
                                    <div style={{backgroundColor:"white",height:"8vh",padding:"1em",width:"100%"}}>
                                        <Title style={{color:"red",}} level={4}>ENTER YOUR DETAILS TO SEARCH FOR YOUR DETAILS, PROCEED TO LOGIN IF FOUND...</Title>
                                    </div>
                        </Marquee>
                <div style={{
                    flex:1,
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    flexDirection:"column"
                }}>
                    <div style={{
                        height:"30vh",
                        width:"20vw",
                        display:"flex",
                        justifyContent:"center",
                        alignItems:"center",
                        
                    }}>
                        <Input.Search onSearch={handleSearch} ref={inputRef} size="large" placeholder="Enter Reg/Matric Number"/>
                    </div>

                    { user && 
                        <Card style={{height:"30vh",width:"30vw"}}>
                            <Descriptions column={1} title={"search result"}>
                                <Descriptions.Item label={"Name"}>
                                    {user.firstname} {user.middlename} {user.lastname}
                                </Descriptions.Item>
                                <Descriptions.Item label={"Matric Number"}>
                                    {user.matricNumber}
                                </Descriptions.Item>
                                <Descriptions.Item label={"Department"}>
                                    {user.Department.title}
                                </Descriptions.Item>
                            </Descriptions>
                        </Card>
                    }
                </div>
                </div>
            </div>
        </>
    )
}