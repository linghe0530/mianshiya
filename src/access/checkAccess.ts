import { UserResp } from '@/api/user/types'
import ACCESS_ENUM from './accessEnum'
//todo
const checkAccess = (loginUser: UserResp, needAccess: string = ACCESS_ENUM.NOT_LOGIN) => {
    const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN
    //不需要权限
    if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
        return true
    }
    if (needAccess === ACCESS_ENUM.USER) {
        if (loginUserAccess == ACCESS_ENUM.NOT_LOGIN) {
            return false
        }
    }
    if (needAccess === ACCESS_ENUM.ADMIN) {
        if (loginUserAccess !== ACCESS_ENUM.ADMIN) {
            return false
        }
    }
    return true
}
export default checkAccess
