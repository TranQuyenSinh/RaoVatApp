import React from 'react'

const useChangeInput = (formData, setFormData) => {
    return e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
}

export default useChangeInput
