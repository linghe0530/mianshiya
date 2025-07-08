import ACCESS_ENUM from '@/access/accessEnum'

export const DEFAULT_USER = {
    userId: undefined,
    userName: '未登录',
    userProfile: '暂无简介',
    userAvatar: '/assets/noLoginUser.png',
    userRole: ACCESS_ENUM.NOT_LOGIN,
}
