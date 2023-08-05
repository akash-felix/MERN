import React, { useEffect } from 'react'
import styles from './style';
import {Card,Form,Input,Typography,Button} from 'antd';
import Title from 'antd/es/skeleton/Title';
import FileBase64 from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createStory,updateStory } from '../../actions/stories';
import { Link } from 'react-router-dom';


const StoryForm = ({selectedId,setSelectedId}) => {
  const [form]=Form.useForm();
  const dispatch =useDispatch();

  const story = useSelector((state)=>selectedId?state.stories.find(story=>story._id===selectedId):null);
  const user = JSON.parse(localStorage.getItem("profile"));
  
  const username = user?.result?.username;
  useEffect(()=>{
    if(story){
      form.setFieldsValue(story);
    }
  },[story,form]);

  const reset=()=>{
    form.resetFields();
    setSelectedId(null);
  }
  
  if(!user){
    return(
      <Card style={styles.formCard}>
        <Title level={4}>
          <span style={styles.formTitle}>
            Welcome to Instaverse
          </span><br/>
          Please <Link to="/authform">login</Link>or {""}
          <Link to="/authform">reegister</Link> for sharing instant moments or ideas.
        </Title>
      </Card>
    )
  }
  const onsubmit = ({formValues})=>{
    selectedId?
    dispatch(updateStory(selectedId,{...formValues,username})):
    dispatch(createStory({...formValues,username}));
  }
  return (
    <Card style={styles.formCard} title={<Title level={4} style={styles.formTitle}> {selectedId?"Editing":"Share"}a story</Title>}>
      <Form
      form={form}
      labelCol={{span:6}}
      wrapperCol={{span:16}}
      layout='horizontal'
      size='middle'
      onFinish={onsubmit}>
        <Form.Item
        name="caption"
        label="Caption"
        rules={[{required:true}]}>
          <Input allowClear autoSize={{minRows:2,maxRows:6}}/>
        </Form.Item>
        <Form.Item
        name="tags"
        label="Tags">
          <Input allowClear autoSize={{minRows:2,maxRows:6}}/>
        </Form.Item>
        <Form.Item
        name="image"
        label="Image">
          <FileBase64 type="file" multiple={false}
          onDone={(e)=>{
            form.setFieldsValue({
              image:e.base64
            })
          }}/>
        </Form.Item>
        <Form.Item
        wrapperCol={{span:16,offset:6}}
        >
          <Button
          type='primary'
          block
          htmlType='submit'>Share</Button>
        </Form.Item>
        {!selectedId ? null:
        <Form.Item
        wrapperCol={{span:16,offset:6}}
        >
          <Button
          type='primary'
          block
          htmlType='button'
          danger
          onClick={reset}>Discard</Button>
        </Form.Item>
        }
      </Form>
    </Card>
  )
}

export default StoryForm