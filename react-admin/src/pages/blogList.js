/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react'
import { Space, Table, Button, Modal, message, Input } from 'antd'
import moment from 'moment'
import { useHistory, useLocation } from 'react-router-dom'

import {
  getArticleList,
  recoveryArticle,
  recoveryArticleBatch,
  delArticle,
  delArticleBatch
} from '../api/article'

const { Search } = Input

const { confirm } = Modal

function blogList() {
  const routeParams = useLocation()
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  const history = useHistory()

  let searchVal = ''
  let delList = []

  const status = routeParams.pathname.slice(
    routeParams.pathname.lastIndexOf('/') + 1
  )
  const getList = async (curPage, keyword) => {
    const res = await getArticleList({ curPage, keyword, status })
    setData(res.body.list)
    setTotal(res.body.count)
    setPage(curPage)
  }

  const edit = title => {
    history.push({ pathname: '/listDetail', state: title })
  }
  const recoverToDraft = title => {
    confirm({
      title: '提示',
      content: '确定要恢复到草稿箱吗',
      async onOk() {
        const res = await recoveryArticle(title._id)
        if (res.code !== 200) return message.error(res.msg)
        message.success(res.msg)
        getList(page, searchVal)
      },
      onCancel() {
        console.log('Cancel')
      }
    })
  }
  const del = title => {
    confirm({
      title: '提示',
      content:
        title.status === 0
          ? '此操作将把文章加入垃圾箱,可在垃圾箱中恢复, 是否继续?'
          : title.status === 1
          ? '此操作将把文章删除, 是否继续?'
          : '此操作将把文章彻底删除, 是否继续?',
      async onOk() {
        const res = await delArticle({
          id: title._id,
          truely: title.status === 2,
          status: title.status === 0 ? 1 : 2
        })
        if (res.code !== 200) return message.error(res.msg)
        message.success(res.msg)
        await getList(page, searchVal)
      },
      onCancel() {
        console.log('Cancel')
      }
    })
  }
  const batchDel = (list, flag) => {
    const api = flag ? delArticleBatch : recoveryArticleBatch
    const str = flag
      ? '此操作将彻底删除文章, 是否继续?'
      : '此操作将把文章加入垃圾箱,可在垃圾箱中恢复, 是否继续?'
    if (!list.length) return message.warning('请至少选择一篇文章')
    confirm({
      title: '提示',
      content: str,
      async onOk() {
        const res = await api({
          list,
          status: status === '0' ? 1 : 2,
          truely: status === '2'
        })
        if (res.code !== 200) return message.error(res.msg)
        message.success(res.msg)
        getList(page, searchVal)
      },
      onCancel() {
        console.log('Cancel')
      }
    })
  }

  const columns = [
    {
      title: '日期',
      // dataIndex: 'createTime',
      sorter: true,
      width: '20%',
      render: text => (
        <div>{moment(text.createTime).format('YYYY-MM-DD HH:mm:ss')}</div>
      )
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: '20%'
    },
    {
      title: '操作',
      key: 'action',
      render: text => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={
              text.status === 2 ? () => recoverToDraft(text) : () => edit(text)
            }
          >
            {text.status === 2 ? '恢复至草稿箱' : '编辑'}
          </Button>
          <Button onClick={() => del(text)}>
            {text.status === 2 ? '彻底删除' : '删除'}
          </Button>
        </Space>
      )
    }
  ]

  const rowSelection = {
    type: 'checkbox',
    onChange: selectedRowKeys => {
      delList = selectedRowKeys
    }
  }

  // 页面进来只调用一次
  useEffect(() => {
    getList(page, searchVal)
  }, [status])

  let btn = ''
  if (status === '2') {
    console.log('status', status)
    btn = (
      <div>
        <Button
          type="primary"
          onClick={() => {
            batchDel(delList, false)
          }}
        >
          批量恢复
        </Button>
        <Button
          onClick={() => {
            batchDel(delList, true)
          }}
        >
          批量删除
        </Button>
      </div>
    )
  } else {
    btn = (
      <Button
        type="primary"
        onClick={() => {
          batchDel(delList, true)
        }}
      >
        批量删除
      </Button>
    )
  }

  const handleTableChange = val => {
    getList(val.current, searchVal)
  }
  const onSearch = val => {
    searchVal = val
    getList(page, val)
  }

  return (
    <>
      <Search
        allowClear
        placeholder="请输入文章标题"
        onSearch={onSearch}
        enterButton
      />
      <Table
        rowSelection={rowSelection}
        columns={columns}
        rowKey="_id"
        dataSource={data}
        pagination={{ current: page, total }}
        onChange={handleTableChange}
      />
      {btn}
    </>
  )
}

export default blogList
