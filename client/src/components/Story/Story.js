import React, { useState } from 'react';
import { Card, Tooltip, Typography, Image } from "antd";
import { EditOutlined, DeleteTwoTone, HeartTwoTone } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import moment from 'moment';
import styles from './style';
import { deleteStory, likeStory } from '../../actions/stories';
import Paragraph from 'antd/es/skeleton/Paragraph';
import Link from 'antd/es/typography/Link';
import Meta from 'antd/es/card/Meta';
import TextArea from 'antd/es/input/TextArea';
export const Story = ({story}) => {

  const [expand,setExpand] = useState(true);
  console.log(expand);
  return (
    <Card style={styles.Card} cover={<Image src={story.image} actions={[
    <div style={styles.actions}>
      <Tooltip placement='top' title='like' color='magneta'>
      <HeartTwoTone twoToneColor="magneta"/>
      &nbsp;{story.likes}&nbsp;
      </Tooltip>
      </div>
    ,<Tooltip placement='top' title='Edit'><EditOutlined onClick={()=>{}}/></Tooltip>,
    <Tooltip placement='top' title='Delete' color='red'><DeleteTwoTone twoToneColor="red" onClick={()=>{}}/></Tooltip>]}/>}>
      <Meta title={story.username}/>
      <Paragraph style={{margin:0}} ellipsis={{rows:2,expandable:true,Symbol:"more", onExpand:()=>setExpand(true),onEllipsis:()=>setExpand(false)}}>
        {story.caption}</Paragraph> 
        {expand?
        <Link href='#'>{story.tags.split(" ").map((tag)=>`#${tag}`)}</Link>:null}
        <br/>
        <TextArea type="secondary">{moment(story.postDate).fromNow()}</TextArea>
           </Card>
  )
}
export default Story;