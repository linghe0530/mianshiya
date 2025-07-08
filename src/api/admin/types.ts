type UserAddRequest = {
    userAccount?: string
    userAvatar?: string
    userName?: string
    userRole?: string
}
type UserUpdateRequest = {
    userId?: number
    userAvatar?: string
    userName?: string
    userProfile?: string
    userRole?: string
}
type UserDeleteRequest = {
    userId: number
}
export type { UserAddRequest, UserUpdateRequest, UserDeleteRequest }
