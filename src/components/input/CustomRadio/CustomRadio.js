import React from 'react'
import './CustomRadio.scss'

const CustomRadio = ({ children, ...otherProps }) => {
    return (
        <label className='custom-radio'>
            {children}
            <input type='radio' {...otherProps} />
            <span className='checkmark'></span>
        </label>
    )
}

export default CustomRadio
