import { Avatar, Button, Image } from 'antd'
import { Header } from 'antd/es/layout/layout'
import Title from 'antd/es/skeleton/Title'
import React, { useEffect, useState } from 'react'
import decode from 'jwt-decode';
import Styles from './Styles'
import {Link, useNavigate} from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { LOGOUT } from '../../constants/actionTypes'
const AppBar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location =  useNavigate();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    console.log(user);
    useEffect(()=>{
        const token = user?.token;
        if(token){
            const decodedToken = decode(token);
            if(decodedToken.exp *1000< new Date().getTime()) logout();
        }
    },[location])

    const logout =() =>{
        dispatch({type:LOGOUT});
         navigate("/");
         setUser(null);
    }
  return (
    <Header style={Styles.header}>
        <Link to="/">
        <div style={Styles.homeLink}>
        <Image style ={Styles.image} preview={false} src={LogoutOutlined} width={45}/>
        &nbsp;
        <Title style={Styles.title}>Instaverse</Title>
        </div>
        </Link>
        {!user ? (
            <Link to="/authform">
                <Button htmlType='button' style={Styles.login}>
                    LogIn
                </Button>
            </Link>
        ):(
            <div style={Styles.userInfo}>
                <Avatar style={Styles.avatar} alt="username" size="large">
                    {user?.result?.username?.charAt(0)?.toUpperCase()}
                </Avatar>
                <Title style={Styles.title} level={4}>
                    {user?.result?.username}
                </Title>
                <Button htmlType='button' onClick={logout}>
                    Log out
                </Button>
            </div>
        )}
    </Header>
  )
}

export default AppBar