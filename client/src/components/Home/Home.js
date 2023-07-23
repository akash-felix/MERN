import Sider from "antd/es/layout/Sider";
import Layout, { Content } from "antd/es/layout/layout";
import React, { useEffect } from "react";
import StoryForm from "../StoryForm";
import StoryList from "../StoryList";
import styles from './style';
import { useDispatch } from "react-redux";
import {getStories} from "../../actions/stories";
const Home = ()=>{
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getStories())
    },[dispatch]);
    return(
        <Layout>
            <Sider width={400} style={styles.sider}>
                <StoryForm/>
            </Sider>
            <Content style={styles.content}>
                <StoryList/>
            </Content>
        </Layout>
    )
}

export default Home;