import React from "react";
import {Layout,Image,Typography} from 'antd';
import Logo from './images/2048px-Instagram_icon.png'
import Home from "./components/Home";
import styles from './style';
const {Title}=Typography;
const {Header,Footer} = Layout;
const App = ()=>{
    return(
        <Layout style={styles.layout}>
            <Header style={styles.header}>
                <Image width= "45" preview="false" src={Logo} style={styles.image}></Image>
                &nbsp;
                <Title style={styles.title}>Instaverse</Title>
            </Header>
            <Home/>
            <Footer style={styles.footer}></Footer>
        </Layout>
    )
}
export default App;