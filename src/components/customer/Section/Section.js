import React from 'react'
import './Section.scss'

const Section = ({ children, style, className: otherClass, ...otherProps }) => {
    return (
        <div style={style} className={`section-container ${otherClass}`} {...otherProps}>
            {children}
        </div>
    )
}

export default Section
