'use client'
import { User, UserQueryRequest } from '@/api/user/types'
import CreateModal from './components/CreateModal'
import UpdateModal from './components/UpdateModal'
import { PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { PageContainer, ProTable } from '@ant-design/pro-components'
import { Button, message, Space, Typography } from 'antd'
import React, { useRef, useState } from 'react'
import adminApi from '@/api/admin'

/**
 * 用户管理页面
 *
 * @constructor
 */
const UserAdminPage: React.FC = () => {
    // 是否显示新建窗口
    const [createModalVisible, setCreateModalVisible] = useState<boolean>(false)
    // 是否显示更新窗口
    const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false)
    const actionRef = useRef<ActionType>()
    // 当前用户点击的数据
    const [currentRow, setCurrentRow] = useState<User>()

    /**
     * 删除节点
     *
     * @param row
     */
    const handleDelete = async (row: User) => {
        const hide = message.loading('正在删除')
        if (!row) return true
        try {
            await adminApi.userDel({
                userId: row.userId as number,
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
    const columns: ProColumns<User>[] = [
        {
            title: 'userId',
            dataIndex: 'userId',
            valueType: 'text',
            hideInForm: true, //在 Form 中不展示此列
        },
        {
            title: '账号',
            dataIndex: 'userAccount',
            valueType: 'text',
        },
        {
            title: '用户名',
            dataIndex: 'userName',
            valueType: 'text',
        },
        {
            title: '头像',
            dataIndex: 'userAvatar',
            valueType: 'image',
            fieldProps: {
                width: 64,
            },
            hideInSearch: true,
        },
        {
            title: '简介',
            dataIndex: 'userProfile',
            valueType: 'textarea',
        },
        {
            title: '权限',
            dataIndex: 'userRole',
            valueEnum: {
                user: {
                    text: '用户',
                },
                admin: {
                    text: '管理员',
                },
            },
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
            <ProTable<User>
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
                        }}
                    >
                        <PlusOutlined /> 新建
                    </Button>,
                ]}
                request={async (params, sort, filter) => {
                    const sortField = Object.keys(sort)?.[0]
                    const sortOrder = sort?.[sortField] ?? undefined

                    const res = await adminApi.listUserByPage({
                        ...params,
                        sortField,
                        sortOrder,
                        ...filter,
                    } as UserQueryRequest)
                    // 添加 key 属性，使用 userId 或其他唯一标识
                    const dataWithKeys =
                        res?.records?.map((item: User) => ({
                            ...item,
                            key: item.userId, // 使用 userId 作为 key
                        })) || []
                    return {
                        success: res !== null,
                        data: dataWithKeys,
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
export default UserAdminPage
