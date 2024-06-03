import React from 'react'
import './CustomSwitch.scss'
const CustomSwitch = ({ checked, onChange, className }) => {
    return (
        <label className={`custom-switch ${className}`}>
            <input checked={checked} type='checkbox' onChange={onChange} />
            <span className='slider'></span>
        </label>
    )
}

export default CustomSwitch
