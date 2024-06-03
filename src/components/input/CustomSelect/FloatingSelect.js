import React, { Children } from 'react'
import './FloatingSelect.scss'
const FloatingSelect = ({ label, required, errorMessage, className, children, placeholder = 'Chọn', ...props }) => {
    return (
        <div className={`form-floating ${className}`}>
            <select className={`form-select ${errorMessage ? 'is-invalid' : undefined}`} {...props}>
                <option className='text-muted' value={-1}>
                    {placeholder}
                    {required && '*'}
                </option>
                {children}
            </select>
            <label htmlFor='floatingSelect'>{label}</label>
            {errorMessage && <div className='invalid-feedback'>{errorMessage}.</div>}
        </div>
    )
}

export default FloatingSelect
