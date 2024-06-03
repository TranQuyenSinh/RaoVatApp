import React, { useId } from 'react'
import './FloatingInput.scss'
const FloatingInput = ({ label, className = '', required, errorMessage, placeholder = 'Aa', ...others }) => {
    const id = useId()
    return (
        <div className='form-floating mb-3'>
            <input
                className={`form-control ${errorMessage ? 'is-invalid' : ''} ${className}`}
                id={id}
                {...others}
                placeholder={placeholder}
            />
            <label htmlFor={id}>
                {label} {required ? <span className='text-danger'>*</span> : ''}
            </label>
            {errorMessage && <div className='invalid-feedback'>{errorMessage}.</div>}
        </div>
    )
}

export default FloatingInput
