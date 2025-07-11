import { MenuDataItem } from '@ant-design/pro-components'

import { CrownOutlined } from '@ant-design/icons'
import ACCESS_ENUM from '@/access/accessEnum'

/**
 * 顶部菜单项
 */
export const menus = [
    {
        path: '/',
        name: '首页',
    },
    {
        path: '/banks',
        name: '题库',
    },
    {
        path: '/questions',
        name: '题目',
    },
    {
        path: '/admin',
        name: '管理',
        icon: <CrownOutlined />,
        access: ACCESS_ENUM.ADMIN,
        children: [
            {
                path: '/admin/user',
                name: '用户管理',
                access: ACCESS_ENUM.ADMIN,
            },
            {
                path: '/admin/banks',
                name: '题库管理',
                access: ACCESS_ENUM.ADMIN,
            },
            {
                path: '/admin/question',
                name: '题目管理',
                access: ACCESS_ENUM.ADMIN,
            },
        ],
    },
] as MenuDataItem[]

export const findAllMenuItemByPath = (path: string): MenuDataItem | null => {
    return findMenuItemByPath(menus, path)
}
export const findMenuItemByPath = (menus: MenuDataItem[], path: string): MenuDataItem | null => {
    for (const menu of menus) {
        if (menu.path === path) {
            return menu
        }
        if (menu.children) {
            const found = findMenuItemByPath(menu.children, path)
            if (found) {
                return found
            }
        }
    }
    return null
}
