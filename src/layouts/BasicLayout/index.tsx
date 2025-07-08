'use client'
import GlobalFooter from '@/components/GlobalFooter'
import { GithubFilled, LogoutOutlined, SearchOutlined } from '@ant-design/icons'
import { ProLayout } from '@ant-design/pro-components'
import { Dropdown, Input, message, theme } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import './index.css'
import { menus } from '../../../config/menu'
import loginUserStore from '@/stores/loginUserStore'
import getAccessMenu from '@/access/menuAccess'
import userApi from '@/api/user'
import { DEFAULT_USER } from '@/constants/user'
const SearchInput = () => {
    const { token } = theme.useToken()
    return (
        <div
            key='SearchOutlined'
            aria-hidden
            style={{
                display: 'flex',
                alignItems: 'center',
                marginInlineEnd: 24,
            }}
            onMouseDown={(e) => {
                e.stopPropagation()
                e.preventDefault()
            }}
        >
            <Input
                style={{
                    borderRadius: 4,
                    marginInlineEnd: 12,
                    backgroundColor: token.colorBgTextHover,
                }}
                prefix={
                    <SearchOutlined
                        style={{
                            color: token.colorTextLightSolid,
                        }}
                    />
                }
                placeholder='搜索题目'
                variant='borderless'
            />
        </div>
    )
}
interface Props {
    children: React.ReactNode
}
const BasicLayout = ({ children }: Props) => {
    const pathname = usePathname()
    const router = useRouter()
    const { user, setUser, getUser } = loginUserStore()
    const userLogout = async () => {
        try {
            await userApi.UserLogout()
            message.success('退出登录')
            setUser(DEFAULT_USER)
            router.push('/user/login')
            console.log(getUser())
        } catch (e) {
            message.error(e as string)
        }
    }
    return (
        <div
            id='basicLayout'
            style={{
                height: '100vh',
                overflow: 'auto',
            }}
        >
            <ProLayout
                title='面试呀刷题平台'
                layout='top'
                logo={
                    <Image
                        src={'/assets/logo.png'}
                        alt='面试呀刷题网站'
                        height={32}
                        width={32}
                    />
                }
                prefixCls='my-prefix'
                location={{
                    pathname,
                }}
                token={{
                    header: {
                        colorBgMenuItemSelected: 'rgba(0,0,0,0.04)',
                    },
                }}
                avatarProps={{
                    src: user.userAvatar || '/assets/logo.png',
                    size: 'small',
                    title: user.userName || '未登录用户',
                    render: (props, dom) => {
                        if (!user.userId) {
                            return (
                                <div
                                    onClick={() => {
                                        router.push('/user/login')
                                    }}
                                >
                                    {dom}
                                </div>
                            )
                        }
                        return (
                            <Dropdown
                                menu={{
                                    items: [
                                        {
                                            key: 'logout',
                                            icon: <LogoutOutlined />,
                                            label: '退出登录',
                                        },
                                    ],
                                    onClick: (e: { key: React.Key }) => {
                                        const { key } = e
                                        if (key === 'logout') {
                                            userLogout()
                                        }
                                    },
                                }}
                            >
                                {dom}
                            </Dropdown>
                        )
                    },
                }}
                actionsRender={(props) => {
                    if (props.isMobile) return []
                    return [
                        <SearchInput key='SearchInput' />,
                        <a
                            href=''
                            key='github'
                            target='_blank'
                        ></a>,
                        <GithubFilled key='GithubFilled' />,
                    ]
                }}
                headerTitleRender={(logo, title) => {
                    return (
                        <a>
                            {logo}
                            {title}
                        </a>
                    )
                }}
                footerRender={() => {
                    return <GlobalFooter />
                }}
                menuDataRender={() => {
                    return getAccessMenu(user, menus)
                }}
                menuItemRender={(item, dom) => (
                    <Link
                        href={item.path || '/'}
                        target={item.target}
                    >
                        {dom}
                    </Link>
                )}
            >
                {children}
            </ProLayout>
        </div>
    )
}
export default BasicLayout
