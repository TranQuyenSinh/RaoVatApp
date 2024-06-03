import React from 'react'
import adNotFound from '../../../assets/images/detail_not_found.svg'
import './AdNotFound.scss'
import { useNavigate } from 'react-router-dom'

const DetailNotFound = () => {
    const navigate = useNavigate()
    return (
        <div className='ad-not-found mt-5'>
            <img src={adNotFound} alt='' />
            <h4>Tin đăng không còn tồn tại.</h4>
            <p className='text-muted'>Tin đăng này đã ẩn/bán hoặc đã hết hạn. Hãy tìm những tin đăng khác.</p>
            <div onClick={() => navigate(-1)} className='btn btn-main'>
                Về trang trước
            </div>
        </div>
    )
}

export default DetailNotFound
