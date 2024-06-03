import React from 'react'
import { BouncingBalls } from 'react-cssfx-loading'
import './LoadingBalls.scss'
const LoadingBalls = ({ className, title = 'Đang tải...' }) => {
    return (
        <div className={`loading-wrapper ${className}`}>
            <BouncingBalls color='#FF8800' />
            <span>{title}</span>
        </div>
    )
}

export default LoadingBalls
