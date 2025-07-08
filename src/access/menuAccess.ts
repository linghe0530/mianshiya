import { UserResp } from '@/api/user/types'
import { menus } from '../../config/menu'
import checkAccess from './checkAccess'

//todo 根据用户权限获取菜单
const getAccessMenu = (loginuser: UserResp, menuItems = menus) => {
    return menuItems.filter((item) => {
        if (!checkAccess(loginuser, item.access)) {
            return false
        }
        if (item.children) {
            item.children = getAccessMenu(loginuser, item.children)
        }
        return true
    })
}

export default getAccessMenu
