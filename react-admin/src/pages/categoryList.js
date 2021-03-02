/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
import React, { Fragment, useEffect, useState } from 'react'
import {
  Table,
  Input,
  Popconfirm,
  Form,
  Button,
  Row,
  Col,
  message,
  Modal
} from 'antd'
import {
  getCategoryList,
  createCategory,
  modifyCategory,
  delCategory
} from '../api/category'

const { confirm } = Modal

const EditableCell = ({
  editing,
  dataIndex,
  title,
  record,
  index,
  children,
  ...restProps
}) => {
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0
          }}
          rules={[
            {
              required: true,
              message: `请输入${title}!`
            }
          ]}
        >
          <Input />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}

const EditableTable = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
  const [editingKey, setEditingKey] = useState('')
  const [tagName, setTagName] = useState('')

  const isEditing = record => record._id === editingKey
  const getList = async page => {
    const res = await getCategoryList(page)
    setData(res.body.list)
    setTotal(res.body.count)
  }
  useEffect(() => {
    getList(1)
  }, [])

  const edit = record => {
    form.setFieldsValue({
      categoryName: '',
      ...record
    })
    setEditingKey(record._id)
  }

  const cancel = () => {
    setEditingKey('')
  }
  const handleTagChange = val => {
    setTagName(val)
  }
  const addTag = async () => {
    if (!tagName) return message.warning('请输入分类名')
    const res = await createCategory(tagName)
    if (res.code !== 200) return message.error(res.msg)
    message.success(res.msg)
    await getList(1)
  }

  const save = async record => {
    const row = await form.validateFields()
    const res = await modifyCategory(record._id, row.tagName)
    if (!row) return message.warning('请输入分类名')
    if (res.code !== 200) return message.error(res.msg)
    message.success(res.msg)
    setEditingKey('')
    await getList(1)
  }
  const del = id => {
    confirm({
      title: '提示',
      content: '此操作将把分类删除, 是否继续?',
      async onOk() {
        const res = await delCategory(id)
        if (res.code !== 200) return message.error(res.msg)
        message.success(res.msg)
        await getList(1)
      },
      onCancel() {
        console.log('Cancel')
      }
    })
  }
  const handleTableChange = val => {
    getList(val.current)
  }

  const columns = [
    {
      title: '分类名',
      dataIndex: 'categoryName',
      width: '50%',
      editable: true
    },
    {
      title: '操作',
      render: (_, record) => {
        const editable = isEditing(record)
        return editable ? (
          <span>
            <a
              href="#"
              onClick={() => save(record)}
              style={{
                marginRight: 8
              }}
            >
              保存
            </a>
            <Popconfirm title="确定要取消吗?" onConfirm={cancel}>
              <a>取消</a>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Button disabled={editingKey !== ''} onClick={() => edit(record)}>
              编辑
            </Button>
            <Button type="danger" onClick={() => del(record._id)}>
              删除
            </Button>
          </>
        )
      }
    }
  ]
  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col
    }

    return {
      ...col,
      onCell: record => ({
        record,

        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record)
      })
    }
  })
  return (
    <>
      <Row gutter={16}>
        <Col flex="auto">
          <Input
            onChange={e => handleTagChange(e.target.value)}
            value={tagName}
          />
        </Col>
        <Col flex="100px">
          {' '}
          <Button type="primary" onClick={addTag}>
            +添加分类
          </Button>
        </Col>
      </Row>

      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell
            }
          }}
          rowKey="_id"
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            total,
            onChange: cancel
          }}
          onChange={handleTableChange}
        />
      </Form>
    </>
  )
}
export default EditableTable
