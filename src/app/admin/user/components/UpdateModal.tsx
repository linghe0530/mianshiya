import adminApi from '@/api/admin'
import { UserAddRequest, UserUpdateRequest } from '@/api/admin/types'
import { User } from '@/api/user/types'
import { ProColumns, ProTable } from '@ant-design/pro-components'
import { message, Modal } from 'antd'
import React from 'react'

interface Props {
    oldData?: User
    visible: boolean
    columns: ProColumns<User>[]
    onSubmit: (values: UserAddRequest) => void
    onCancel: () => void
}

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: UserUpdateRequest) => {
    const hide = message.loading('正在更新')
    try {
        await adminApi.userUpdate(fields)
        hide()
        message.success('更新成功')
        return true
    } catch (error) {
        hide()
        message.error(('更新失败，' + error) as string)
        return false
    }
}

/**
 * 更新弹窗
 * @param props
 * @constructor
 */
const UpdateModal: React.FC<Props> = (props) => {
    const { oldData, visible, columns, onSubmit, onCancel } = props

    if (!oldData) {
        return <></>
    }

    return (
        <Modal
            destroyOnHidden
            title={'更新'}
            open={visible}
            footer={null}
            onCancel={() => {
                onCancel?.()
            }}
        >
            <ProTable
                type='form'
                columns={columns}
                form={{
                    initialValues: oldData,
                }}
                onSubmit={async (values: UserAddRequest) => {
                    const success = await handleUpdate({
                        ...values,
                        id: oldData?.userId as number,
                    })
                    if (success) {
                        onSubmit?.(values)
                    }
                }}
            />
        </Modal>
    )
}
export default UpdateModal
