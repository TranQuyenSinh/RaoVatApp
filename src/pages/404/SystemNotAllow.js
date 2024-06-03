import React from 'react'
import { Link } from 'react-router-dom'
import not_allow_img from '@assets/images/not_allow.svg'
import './ErrorPageStyles.scss'
const SystemNotAllow = () => {
    return (
        <div className='full-page-container'>
            <img src={not_allow_img} className='w-25 h-50 mt-5' />
            <h3 className='fw-bold mt-2'>Bạn không có quyền truy cập chức năng này</h3>
            <Link to={'/'} className='btn btn-main mt-2'>
                Về trang chủ Rao vặt
            </Link>
        </div>
    )
}

export default SystemNotAllow
