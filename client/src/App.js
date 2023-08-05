import React from "react";
import {Layout,Image,Typography} from 'antd';
import Logo from './images/2048px-Instagram_icon.png'
import Home from "./components/Home";
import styles from './style';
import AppBar from "./components/AppBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AuthForm from "./components/AuthForm";
const {Title}=Typography;
const {Header,Footer} = Layout;
const App = ()=>{
    const start = 4500;
    const end = 5500;
    
    // console.log();
    return(
        <BrowserRouter>
        <Layout style={styles.layout}>
            <AppBar/> 
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/authform" element={<AuthForm/>}></Route>
            </Routes>
            
            <Footer style={styles.footer}></Footer>
        </Layout>
        </BrowserRouter>
    )
}
export default App;