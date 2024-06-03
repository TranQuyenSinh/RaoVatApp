import React, { useId } from 'react'
import './OutlineRadioButton.scss'

const OutlineRadioButton = ({ children, className, ...otherProps }) => {
    const id = useId()
    return (
        <span className={`custom-outline-radio ${className}`}>
            <input type='radio' className='btn-check' id={id} autoComplete='off' {...otherProps} />
            <label className='btn' htmlFor={id}>
                {children}
            </label>
        </span>
    )
}

export default OutlineRadioButton
