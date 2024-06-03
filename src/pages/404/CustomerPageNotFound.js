import React from 'react'
import NotFoundImage from '../../assets/images/404.png'
import { Link } from 'react-router-dom'

const CustomerPageNotFound = () => {
    return (
        <div className='404-container d-flex flex-column align-items-center justify-content-center'>
            <img src={NotFoundImage} alt='' className='w-25 mt-5' />
            <h5 className='fw-bold mt-3'>Đã có lỗi xảy ra</h5>
            <p>Rất tiếc, không tìm thấy trang. Vui lòng kiểm tra lại đường dẫn</p>
            <Link to={'/'} className='btn btn-main'>
                Về trang chủ
            </Link>
        </div>
    )
}

export default CustomerPageNotFound
