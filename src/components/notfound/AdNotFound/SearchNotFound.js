import React from 'react'
import adNotFound from '../../../assets/images/detail_not_found.svg'
import './AdNotFound.scss'
import { useNavigate } from 'react-router-dom'

const SearchNotFound = ({ className }) => {
    const navigate = useNavigate()
    return (
        <div className={`ad-not-found ${className}`}>
            <img src={adNotFound} alt='' />
            <h4>Không tìm thấy sản phẩm nào.</h4>
            <p className='text-muted'>Chưa có sản phẩm nào phù hợp, hãy tìm kiếm với từ khóa khác nào..</p>
            <div onClick={() => navigate('/')} className='btn btn-main'>
                Về trang chủ
            </div>
        </div>
    )
}

export default SearchNotFound
