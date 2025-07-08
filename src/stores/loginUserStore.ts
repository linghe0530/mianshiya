import { DEFAULT_USER } from '@/constants/user'
import { create } from 'zustand'
interface User {
    userId?: number
    userName: string
    userProfile: string
    userAvatar: string
    userRole: string
}
interface UserState {
    user: User
    setUser: (user: User) => void
    getUser: () => User
}

export default create<UserState>((set, get) => ({
    user: DEFAULT_USER,
    setUser: (user: User) =>
        set((state) => {
            return {
                user: {
                    ...state.user,
                    ...user,
                },
            }
        }),
    getUser: () => {
        return get().user
    },
}))
