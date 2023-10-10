import {Col,Row,Card,Typography} from "antd";
import { Link } from "react-router-dom";
import { BiSync } from "react-icons/bi";
const {Title} = Typography


export default function CardItem(props){
    const {title,icon,link} = props;
    return(
        <>
           <Col span={8} style={{
                        height:"100%",
                    }}>
                        <Link to={link}>
                            <Card style={{
                            backgroundColor:"#2bf12b",
                            height:"100%"
                        }}>
                            <Row style={{
                                height:"100%"
                            }}>
                                <Col span={20} style={{
                                height:"100%",
                                display:"flex",
                                alignItems:"space-between",
                                flexDirection:"column",
                                color:"white"
                            }}>
                                {icon}
                                <Title level={2} style={{color:"white"}}>
                                    {title}
                                </Title>
                                </Col>
                                <Col span={4} style={{
                                height:"100%"
                            }}>
                                <BiSync style={{color:"white"}}/>
                                </Col>
                            </Row>
                            </Card>
                        </Link>
                    </Col>
        </>
    )
}