import adminBankApi from '@/api/admin/question-bank'
import { QuestionBank, QuestionBankAddRequest, QuestionBankUpdateRequest } from '@/api/admin/question-bank/types'
import { ProColumns, ProTable } from '@ant-design/pro-components'
import { message, Modal } from 'antd'
import React from 'react'

interface Props {
    oldData?: QuestionBank
    visible: boolean
    columns: ProColumns<QuestionBank>[]
    onSubmit: (values: QuestionBankAddRequest) => void
    onCancel: () => void
}

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: QuestionBankUpdateRequest) => {
    const hide = message.loading('正在更新')
    try {
        await adminBankApi.bankUpdate(fields)
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
                onSubmit={async (values: QuestionBankAddRequest) => {
                    const success = await handleUpdate({
                        ...values,
                        id: oldData.id as number,
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
