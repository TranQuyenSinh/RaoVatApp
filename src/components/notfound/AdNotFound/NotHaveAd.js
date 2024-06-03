import React from 'react'
import notHaveAd from '../../../assets/images/not_have_ad.svg'
import './AdNotFound.scss'
import { Link } from 'react-router-dom'

const NotHaveAd = () => {
    return (
        <div className='ad-not-found pb-4 '>
            <img src={notHaveAd} alt='' />
            <h4>Không tìm thấy tin đăng.</h4>
            <p className='text-muted'>Hiện tại chưa có tin đăng ở trạng thái này</p>
            <Link to={'/dang-tin'} className='btn btn-main mt-3'>
                Đăng tin ngay
            </Link>
        </div>
    )
}

export default NotHaveAd
