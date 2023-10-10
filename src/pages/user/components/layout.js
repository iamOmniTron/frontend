import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import HeaderComponent from "./header";


const {Content} = Layout;


export default function UserLayout(){

    return(
        <>
            <Layout>
                 <HeaderComponent/>
                 <Content style={{
                padding: '2em',
                height:"90vh",
                overflowY:"scroll"
              }}>
                    <Outlet/>
                 </Content>
            </Layout>
        </>
    )
}