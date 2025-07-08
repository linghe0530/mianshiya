type UserLoginRequest = {
    userAccount?: string
    userPassword?: string
}
type User = {
    createTime?: string
    editTime?: string
    userId?: number
    isDelete?: number
    updateTime?: string
    userAccount?: string
    userAvatar?: string
    userName?: string
    password?: string
    userProfile?: string
    userRole?: string
}
type UserQueryRequest = {
    current?: number
    pageSize?: number
    id?: number
    sortField?: string
    sortOrder?: string
    userName?: string
    userProfile?: string
    userRole?: string
}

type UserResp = {
    userId?: number
    userAvatar?: string
    userName?: string
    userProfile?: string
    userRole?: string
    createTime?: string
}
export type { UserLoginRequest, User, UserQueryRequest, UserResp }
