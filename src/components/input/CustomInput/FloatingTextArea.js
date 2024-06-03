import React, { useId } from 'react'
import './FloatingTextArea.scss'

const FloatingTextArea = ({
    label,
    className,
    required,
    height = '150px',
    errorMessage,
    placeholder = 'Aa',
    ...others
}) => {
    const id = useId()

    return (
        <div className='form-floating mb-3'>
            <textarea
                id={id}
                style={{ height: height }}
                className={`form-control ${errorMessage ? 'is-invalid' : ''} ${className}`}
                placeholder={placeholder}
                {...others}></textarea>
            <label htmlFor={id}>
                {label} {required ? <span className='text-danger'>*</span> : ''}
            </label>
            {errorMessage && <div className='invalid-feedback'>{errorMessage}.</div>}
        </div>
    )
}

export default FloatingTextArea
