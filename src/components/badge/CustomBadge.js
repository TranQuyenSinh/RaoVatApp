import React from 'react'
const CustomBadge = ({
    className,
    children,
    top = 6,
    left = 'unset',
    bottom = 'unset',
    right = -6,
    type = 'success',
}) => {
    return (
        <span
            style={{
                top: top,
                bottom: bottom,
                right: right,
                left: left,
            }}
            className={`position-absolute badge bg-${type} ${className}`}>
            {children}
        </span>
    )
}

export default CustomBadge
