import { User } from '@/api/user/types'
import { UserAddRequest } from '@/api/admin/types'
import adminApi from '@/api/admin/index'
import { ProColumns, ProTable } from '@ant-design/pro-components'
import { message, Modal } from 'antd'
import React from 'react'

interface Props {
    visible: boolean
    columns: ProColumns<User>[]
    onSubmit: (values: UserAddRequest) => void
    onCancel: () => void
}

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: UserAddRequest) => {
    const hide = message.loading('正在添加')
    try {
        await adminApi.userAdd(fields)
        hide()
        message.success('创建成功')
        return true
    } catch (error) {
        hide()
        message.error(('创建失败，' + error) as string)
        return false
    }
}

/**
 * 创建弹窗
 * @param props
 * @constructor
 */
const CreateModal: React.FC<Props> = (props) => {
    const { visible, columns, onSubmit, onCancel } = props

    return (
        <Modal
            destroyOnHidden
            title={'创建'}
            open={visible}
            footer={null}
            onCancel={() => {
                onCancel?.()
            }}
        >
            <ProTable
                type='form'
                columns={columns}
                onSubmit={async (values: UserAddRequest) => {
                    const success = await handleAdd(values)
                    if (success) {
                        onSubmit?.(values)
                    }
                }}
            />
        </Modal>
    )
}
export default CreateModal
