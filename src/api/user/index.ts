import request from '@/utils/request'
import { UserLoginRequest } from './types'

const UserLogin = (data: UserLoginRequest) => {
    return request.post('/user/login', data)
}
const UserLogout = () => {
    return request.get('/user/get/login')
}

const getLoginUser = () => {
    return request.get('/user/get/login')
}
const user = {
    UserLogin,
    getLoginUser,
    UserLogout,
}
export default user
