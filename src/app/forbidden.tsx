import { Button, Result } from 'antd'

const Forbidden = () => {
    return (
        <Result
            status={403}
            title='403'
            subTitle='抱歉，您没有权限访问此页面。'
            extra={<Button type='primary'>返回首页</Button>}
        />
    )
}
export default Forbidden
