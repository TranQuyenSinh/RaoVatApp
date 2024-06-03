import React from 'react'
import adNotFound from '../../../assets/images/ad_not_found.svg'
import './AdNotFound.scss'

const AdNotFound = ({ className }) => {
    return (
        <div className={`ad-not-found ${className}`}>
            <img src={adNotFound} alt='' />
            <h4>Hiện chưa có sản phẩm nào.</h4>
        </div>
    )
}

export default AdNotFound
