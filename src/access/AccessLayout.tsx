import { usePathname } from 'next/navigation'
import { findAllMenuItemByPath } from '../../config/menu'
import ACCESS_ENUM from './accessEnum'
import checkAccess from './checkAccess'
import loginUserStore from '@/stores/loginUserStore'
import Forbidden from '@/app/forbidden'

const AccessLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode
}>) => {
    const pathname = usePathname()
    const { user } = loginUserStore()
    const menu = findAllMenuItemByPath(pathname)
    const needAccess = menu?.access || ACCESS_ENUM.NOT_LOGIN
    const canAccess = checkAccess(user, needAccess)
    if (!canAccess) {
        return <Forbidden />
    }
    return children
}
export default AccessLayout
