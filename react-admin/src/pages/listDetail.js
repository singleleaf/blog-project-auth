/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'

import { Input, Select, Button, message, Row, Col } from 'antd'
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import { createArticle } from '../api/article'
import { getTagList } from '../api/tag'
import { getCategoryList } from '../api/category'

const { Option } = Select

function detail() {
  const location = useLocation()
  console.log('location', location)
  const history = useHistory()

  const [title, setTitle] = useState('')

  const [html, setHtml] = useState('')
  const [tagArr, setTagArr] = useState([])
  const [tagId, setTagId] = useState([])
  const [categoryId, setcategoryId] = useState('')
  const [categoryArr, setCategoryArr] = useState([])

  // const categoryArr = []
  // 页面进来只调用一次
  useEffect(() => {
    getTagList().then(res => {
      setTagArr(res.body.list)
    })
    getCategoryList().then(res => {
      setCategoryArr(res.body.list)
    })
    if (!location.state) return
    setTitle(location.state.title)
    setTagId(location.state.tagId)
    setcategoryId(location.state.categoryId)
    const htmlcon = BraftEditor.createEditorState(location.state.html)
    setHtml(htmlcon)
  }, [])

  const handleTagChange = val => {
    setTagId(val)
  }
  const handleCategoryChange = val => {
    setcategoryId(val)
  }
  const publish = async flag => {
    const params = {
      tagId,
      categoryId,
      html,
      content: String(html),
      title,
      status: flag ? 0 : 1
      // 0:已发布 1：放入草稿
    }
    // 编辑的时候
    if (location.state) {
      params.id = location.state._id
    }
    const res = await createArticle(params)

    if (res.code !== 200) return message.error(res.msg)
    message.success(res.msg)
    history.push(`/blogList/${flag ? '0' : '1'}`)
  }

  const handleEditorChange = editorState => {
    setHtml(editorState.toHTML())
  }

  return (
    <>
      <Row>
        <Col flex="40px">标题</Col>
        <Col flex="auto">
          <Input
            value={title}
            onChange={e => {
              setTitle(e.target.value)
            }}
            placeholder="请输入标题"
            allowClear
            size="large"
          />
        </Col>
      </Row>
      <Row style={{ margin: '10px 0' }}>
        <Col flex="40px">分类</Col>
        <Col flex="auto">
          <Select
            value={categoryId}
            onChange={handleCategoryChange}
            style={{ width: '100%' }}
            allowClear
          >
            {categoryArr.map(item => {
              return (
                <Option key={item.categoryName} value={item._id}>
                  {item.categoryName}
                </Option>
              )
            })}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col flex="40px">标签</Col>
        <Col flex="auto">
          <Select
            value={tagId}
            onChange={handleTagChange}
            style={{ width: '100%' }}
            mode="multiple"
            allowClear
          >
            {tagArr.map(item => {
              return (
                <Option key={item.tagName} value={item._id}>
                  {item.tagName}
                </Option>
              )
            })}
          </Select>
        </Col>
      </Row>

      <BraftEditor value={html} onChange={handleEditorChange} />
      <Button type="primary" onClick={() => publish(true)}>
        发布
      </Button>
      <Button onClick={() => publish(false)}>保存为草稿</Button>
    </>
  )
}

export default detail
