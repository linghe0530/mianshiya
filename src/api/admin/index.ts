import request from '@/utils/request'
import { UserAddRequest, UserDeleteRequest, UserUpdateRequest } from './types'
import { UserQueryRequest } from '../user/types'

const userAdd = (data: UserAddRequest) => {
    return request.post('/admin/user/add', data)
}
const userUpdate = (data: UserUpdateRequest) => {
    return request.post('/admin/user/update', data)
}

const userDel = (data: UserDeleteRequest) => {
    return request.post('/admin/user/del', data)
}

const listUserByPage = (data: UserQueryRequest) => {
    return request.post('/admin/user/page', data)
}
const adminApi = {
    userAdd,
    userUpdate,
    userDel,
    listUserByPage,
}
export default adminApi
