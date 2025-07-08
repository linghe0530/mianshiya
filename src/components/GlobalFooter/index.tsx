import React from 'react'
import './index.css'
const GlobalFooter = () => {
    const currentYear = new Date().getFullYear()
    return (
        <div className='global-footer'>
            <div>© {currentYear} 面试呀刷题平台</div>
            <div>by Ant Design</div>
        </div>
    )
}
export default GlobalFooter
