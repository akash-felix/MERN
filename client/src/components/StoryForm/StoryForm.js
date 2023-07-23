import React from 'react'
import styles from './style';
import {Card,Form,Input,Typography,Button} from 'antd';
import Title from 'antd/es/skeleton/Title';
import FileBase64 from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { createStory } from '../../actions/stories';

const StoryForm = () => {
  const [form]=Form.useForm();
  const dispatch =useDispatch();
  const onsubmit = (formValues)=>{
    console.log(formValues);
    dispatch(createStory(formValues));
  }
  return (
    <Card style={styles.formCard} title={<Title level={4} style={styles.formTitle} ></Title>}>
      <Form
      form={form}
      labelCol={{span:6}}
      wrapperCol={{span:16}}
      layout='horizontal'
      size='middle'
      onFinish={onsubmit}>
        <Form.Item
        name="username"
        label="Username"
        rules={[{required:true}]}>
          <Input allowClear />
        </Form.Item>
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
          htmlType='submit'></Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default StoryForm