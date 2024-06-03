import { useEffect, useRef, useState } from 'react'

export const useValidateForm = (formData, errorMessages = {}, realTimeCheck = true) => {
    const initErrors = useRef(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: '' }), {})).current
    const [errors, setErrors] = useState(initErrors)

    useEffect(() => {
        if (realTimeCheck) validate()
    }, [formData])

    const validate = () => {
        let isValid = true
        setErrors(initErrors)
        for (let key in formData) {
            if (!formData[key] || formData[key] == -1) {
                setErrors(prev => ({
                    ...prev,
                    [key]: errorMessages[key],
                }))
                isValid = false
            }
        }
        return isValid
    }

    return [validate, errors]
}
