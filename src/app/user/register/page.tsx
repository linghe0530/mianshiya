'use client'

import userApi from '@/api/user'
import { UserLoginRequest } from '@/api/user/types'
import loginUserStore from '@/stores/loginUserStore'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { LoginForm, ProForm, ProFormText } from '@ant-design/pro-components'
import { message } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const UserResigterPage = () => {
    const [form] = ProForm.useForm()
    const router = useRouter()
    const { setUser } = loginUserStore()
    const doSubmit = async (data: UserLoginRequest) => {
        try {
            const res = await userApi.UserLogin(data)
            message.success('登录成功')
            setUser(res)
            router.push('/')
            form.resetFields()
        } catch (e) {
            message.error(e as string)
        }
    }
    return (
        <div id='userLoginPage'>
            <LoginForm
                form={form}
                logo={
                    <Image
                        src={'/assets/logo.png'}
                        alt='面试呀'
                        height={44}
                        width={44}
                    />
                }
                title='面试呀 - 用户注册'
                subTitle='程序员面试刷题平台'
                onFinish={doSubmit}
            >
                <ProFormText
                    name='userAccount'
                    fieldProps={{
                        size: 'large',
                        prefix: <UserOutlined />,
                    }}
                    placeholder={'请输入用户名'}
                    rules={[
                        {
                            required: true,
                            message: '请输入用户名!',
                        },
                    ]}
                />
                <ProFormText.Password
                    name='password'
                    fieldProps={{
                        size: 'large',
                        prefix: <LockOutlined />,
                    }}
                    placeholder={'请输入密码'}
                    rules={[
                        {
                            required: true,
                            message: '请输入密码！',
                        },
                    ]}
                />
                <div
                    style={{
                        marginBlockEnd: 24,
                        textAlign: 'right',
                    }}
                >
                    还没有账号?
                    <Link href={'/user/register'}>去注册</Link>
                </div>
            </LoginForm>
        </div>
    )
}
export default UserResigterPage
