import Sider from "antd/es/layout/Sider";
import Layout, { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import StoryForm from "../StoryForm";
import StoryList from "../StoryList";
import styles from './style';
import { useDispatch } from "react-redux";
import {getStories} from "../../actions/stories";
const Home = ()=>{
    const dispatch = useDispatch();
    const [selectedId,setSelectedId]= useState(null);
    useEffect(()=>{
        dispatch(getStories())
    },[dispatch]);
    return(
        <Layout>
            <Sider width={400} style={styles.sider}>
                <StoryForm selectedId={selectedId} setSelectedId={setSelectedId}/>
            </Sider>
            <Content style={styles.content}>
                <StoryList setSelectedId={setSelectedId}/>
            </Content>
        </Layout>
    )
}

export default Home;