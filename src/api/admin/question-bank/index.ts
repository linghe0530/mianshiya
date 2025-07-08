import request from '@/utils/request'
import { QuestionBankQueryRequest, QuestionBankDeleteRequest, QuestionBankAddRequest, QuestionBankUpdateRequest } from './types'

const bankAdd = (data: QuestionBankAddRequest) => {
    return request.post('/admin/banks/add', data)
}
const bankUpdate = (data: QuestionBankUpdateRequest) => {
    return request.post('/admin/banks/update', data)
}

const bankDel = (data: QuestionBankDeleteRequest) => {
    return request.post('/admin/banks/del', data)
}

const listbankByPage = (data: QuestionBankQueryRequest) => {
    return request.post('/admin/banks/page', data)
}

const adminBankApi = {
    bankAdd,
    bankUpdate,
    bankDel,
    listbankByPage,
}
export default adminBankApi
