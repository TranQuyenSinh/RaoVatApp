import React, { useState } from 'react'
import Section from '../../../components/customer/Section/Section'
import './ChangePassword.scss'
import FloatingInput from '../../../components/input/CustomInput/FloatingInput'
import { useValidateForm } from '../../../hooks/useValidateForm'
import { toast } from 'react-toastify'
import { changePassword } from '../../../services'
import { motion } from 'framer-motion'
import { fadeIn } from '../../../animation'
const ChangePassword = () => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    })
    const [errorMessages, setErrorMessages] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    })
    const onChangeInput = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmit = async () => {
        if (!validate()) {
            toast.error('Vui lòng nhập đầy đủ thông tin')
            return
        }
        let { currentPassword, newPassword } = formData
        try {
            let { data } = await changePassword(currentPassword, newPassword)
            toast.success(data)
        } catch (e) {
            toast.error(e.response?.data)
        }
    }

    const validate = () => {
        let isValid = true
        setErrorMessages({})
        let { newPassword, confirmPassword } = formData
        if (newPassword != confirmPassword) {
            isValid = false
            setErrorMessages(prev => ({
                ...prev,
                confirmPassword: 'Mật khẩu xác nhận chưa khớp, vui lòng nhập lại',
            }))
        }
        if (newPassword.length < 6) {
            isValid = false
            setErrorMessages(prev => ({
                ...prev,
                newPassword: 'Mật khẩu phải dài hơn 6 ký tự',
            }))
        }
        for (let key in formData) {
            if (!formData[key]) {
                isValid = false
                setErrorMessages(prev => ({
                    ...prev,
                    [key]: 'Không được bỏ trống',
                }))
            }
        }
        return isValid
    }

    return (
        <>
            <motion.div variants={fadeIn} initial='initial' animate='animate' className='change-password-container'>
                <div className='title mb-3'>Thay đổi mật khẩu</div>
                <FloatingInput
                    type={'password'}
                    errorMessage={errorMessages.currentPassword}
                    name='currentPassword'
                    value={formData.currentPassword}
                    onChange={onChangeInput}
                    label={'Mật khẩu hiện tại'}
                    required
                />
                <FloatingInput
                    type={'password'}
                    errorMessage={errorMessages.newPassword}
                    name='newPassword'
                    value={formData.newPassword}
                    onChange={onChangeInput}
                    label={'Mật khẩu mới'}
                    required
                />
                <FloatingInput
                    type={'password'}
                    errorMessage={errorMessages.confirmPassword}
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={onChangeInput}
                    label={'Xác nhận mật khẩu mới'}
                    required
                />
                <button onClick={handleSubmit} className='btn btn-main float-end mt-2'>
                    Đổi mật khẩu
                </button>
            </motion.div>
        </>
    )
}

export default ChangePassword
