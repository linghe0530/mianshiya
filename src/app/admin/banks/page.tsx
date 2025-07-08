'use client'
import CreateModal from './components/CreateModal'
import UpdateModal from './components/UpdateModal'
import { PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { PageContainer, ProTable } from '@ant-design/pro-components'
import { Button, message, Space, Typography } from 'antd'
import React, { useRef, useState } from 'react'
import './index.css'
import { QuestionBank, QuestionBankQueryRequest } from '@/api/admin/question-bank/types'
import adminBankApi from '@/api/admin/question-bank'

/**
 * 题库管理页面
 *
 * @constructor
 */
const QuestionBankAdminPage: React.FC = () => {
    // 是否显示新建窗口
    const [createModalVisible, setCreateModalVisible] = useState<boolean>(false)
    // 是否显示更新窗口
    const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false)
    const actionRef = useRef<ActionType>()
    // 当前题库点击的数据
    const [currentRow, setCurrentRow] = useState<QuestionBank>()

    /**
     * 删除节点
     *
     * @param row
     */
    const handleDelete = async (row: QuestionBank) => {
        const hide = message.loading('正在删除')
        if (!row) return true
        try {
            await adminBankApi.bankDel({
                id: row.id as number,
            })
            hide()
            message.success('删除成功')
            actionRef?.current?.reload()
            return true
        } catch (error) {
            hide()
            message.error(('删除失败，' + error) as string)
            return false
        }
    }

    /**
     * 表格列配置
     */
    const columns: ProColumns<QuestionBank>[] = [
        {
            title: 'id',
            dataIndex: 'id',
            valueType: 'text',
            hideInForm: true,
        },
        {
            title: '标题',
            dataIndex: 'title',
            valueType: 'text',
        },
        {
            title: '描述',
            dataIndex: 'description',
            valueType: 'text',
        },
        {
            title: '图片',
            dataIndex: 'picture',
            valueType: 'image',
            fieldProps: {
                width: 64,
            },
            hideInSearch: true,
        },
        {
            title: '创建时间',
            sorter: true,
            dataIndex: 'createTime',
            valueType: 'dateTime',
            hideInSearch: true,
            hideInForm: true,
        },
        {
            title: '编辑时间',
            sorter: true,
            dataIndex: 'editTime',
            valueType: 'dateTime',
            hideInSearch: true,
            hideInForm: true,
        },
        {
            title: '更新时间',
            sorter: true,
            dataIndex: 'updateTime',
            valueType: 'dateTime',
            hideInSearch: true,
            hideInForm: true,
        },
        {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => (
                <Space size='middle'>
                    <Typography.Link
                        onClick={() => {
                            setCurrentRow(record)
                            setUpdateModalVisible(true)
                        }}
                    >
                        修改
                    </Typography.Link>
                    <Typography.Link
                        type='danger'
                        onClick={() => handleDelete(record)}
                    >
                        删除
                    </Typography.Link>
                </Space>
            ),
        },
    ]

    return (
        <PageContainer>
            <ProTable<QuestionBank>
                headerTitle={'查询表格'}
                actionRef={actionRef}
                rowKey='key'
                search={{
                    labelWidth: 120,
                }}
                toolBarRender={() => [
                    <Button
                        type='primary'
                        key='primary'
                        onClick={() => {
                            setCreateModalVisible(true)
                            console.log(createModalVisible)
                        }}
                    >
                        <PlusOutlined /> 新建
                    </Button>,
                ]}
                request={async (params, sort, filter) => {
                    const sortField = Object.keys(sort)?.[0]
                    const sortOrder = sort?.[sortField] ?? undefined

                    const res = await adminBankApi.listbankByPage({
                        ...params,
                        sortField,
                        sortOrder,
                        ...filter,
                    } as QuestionBankQueryRequest)

                    return {
                        success: res !== null,
                        data: res?.records || [],
                        total: Number(res?.total) || 0,
                    }
                }}
                columns={columns}
            />
            <CreateModal
                visible={createModalVisible}
                columns={columns}
                onSubmit={() => {
                    setCreateModalVisible(false)
                    actionRef.current?.reload()
                }}
                onCancel={() => {
                    setCreateModalVisible(false)
                }}
            />
            <UpdateModal
                visible={updateModalVisible}
                columns={columns}
                oldData={currentRow}
                onSubmit={() => {
                    setUpdateModalVisible(false)
                    setCurrentRow(undefined)
                    actionRef.current?.reload()
                }}
                onCancel={() => {
                    setUpdateModalVisible(false)
                }}
            />
        </PageContainer>
    )
}
export default QuestionBankAdminPage
