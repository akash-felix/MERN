import { Col, Row, Spin } from 'antd'
import React from 'react'
import Story from '../Story'
import { useSelector } from 'react-redux'

const StoryList = ({setSelectedId}) => {
  const stories = useSelector((state)=>state.stories);

  return !stories.length ? 
  <div style={{textAlign:"center"}}>
    <Spin size='large'></Spin>
  </div>:
  (
    <Row gutter={[48,32]}>
        {stories.map((story)=>{
          return (
            <Col key={story.id} lg={24} xl={12} xxl={8}>
              <Story story={story} setSelectedId={setSelectedId}/>
            </Col>
          )
        })}
    </Row>
  )
}

export default StoryList