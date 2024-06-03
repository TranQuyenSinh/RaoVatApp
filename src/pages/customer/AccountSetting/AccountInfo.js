import React, { useMemo, useState, useEffect } from 'react'

import moment from 'moment'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

import { getUserInfo, saveUserInfo } from '../../../services'
import useModal from '@hooks/useModal'
import { useValidateForm } from '../../../hooks/useValidateForm'
import { updateUserInfo } from '../../../redux/user/user.actions'
import Section from '../../../components/customer/Section/Section'
import FloatingInput from '../../../components/input/CustomInput/FloatingInput'
import FloatingTextArea from '../../../components/input/CustomInput/FloatingTextArea'
import { AddressSelect, AddressSelectModal } from '../../../components/modal/AddressSelectModal/AddressSelectModal'
import { motion } from 'framer-motion'
import { fadeIn, fadeLeft, fadeRight } from '../../../animation'
import './AccountInfo.scss'

const AccountInfo = () => {
    const dispatch = useDispatch()
    const [isOpenAddressModal, toggleAddressModal] = useModal()
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        description: '',
        address: '',
        email: '',
        gender: -1,
        dateOfBirth: '',
    })
    const errorMessages = {
        fullName: 'Họ tên không được để trống',
        phone: 'Số điện thoại không được để trống',
        description: 'Nhập vài dòng giới thiệu về bạn',
        address: 'Vui lòng nhập địa chỉ',
    }
    const validateInput = useMemo(() => {
        const { fullName, phone, description, address } = formData
        return {
            fullName,
            phone,
            description,
            address: address.address + address.province + address.ward + address.district,
        }
    }, [formData])
    const [validate, errors] = useValidateForm(validateInput, errorMessages)

    useEffect(() => {
        ;(async () => {
            try {
                let { data } = await getUserInfo()
                setFormData({
                    fullName: data.fullName || '',
                    phone: data.phone || '',
                    description: data.description || '',
                    email: data.email,
                    gender: data.gender || undefined,
                    dateOfBirth: data.dateOfBirth,
                    address: data.address,
                })
            } catch (e) {
                toast.error('Lỗi load dữ liệu, vui lòng tải lại trang')
            }
        })()
    }, [])
    const handleChangeAddress = address => {
        setFormData({
            ...formData,
            address,
        })
    }
    const handleChangeInput = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }
    const handleChangeGender = e => {
        let gender = e.target.value == -1 ? undefined : e.target.value
        setFormData({ ...formData, gender })
    }

    const handleSubmit = async () => {
        if (!validate()) {
            toast.error('Vui lòng nhập đầy đủ thông tin!')
            return
        }
        try {
            await saveUserInfo(formData)
            dispatch(updateUserInfo(formData))
            toast.success('Lưu thành công')
        } catch (e) {
            toast.error('Có lỗi xảy ra khi lưu, vui lòng thử lại!')
        }
    }

    return (
        <>
            <motion.div variants={fadeIn} initial='initial' animate={'animate'} className='account-info-container'>
                <div className='title'>Hồ sơ công khai</div>
                <div className='row mt-3'>
                    <div className='col-md-6'>
                        <FloatingInput
                            required
                            errorMessage={errors.fullName}
                            name={'fullName'}
                            value={formData.fullName}
                            onChange={handleChangeInput}
                            label={'Họ và tên'}
                        />
                    </div>
                    <div className='col-md-6'>
                        <FloatingInput
                            required
                            errorMessage={errors.phone}
                            name={'phone'}
                            value={formData.phone}
                            onChange={handleChangeInput}
                            label={'Số điện thoại'}
                        />
                    </div>
                    <div className='col-md-12'>
                        <AddressSelect
                            address={formData.address}
                            errorMessage={errors.address}
                            onClick={() => toggleAddressModal()}
                        />
                    </div>
                    <div className='col-md-12'>
                        <FloatingTextArea
                            required
                            errorMessage={errors.description}
                            name={'description'}
                            value={formData.description}
                            onChange={handleChangeInput}
                            label={'Giới thiệu'}
                            placeholder={'Vài dòng giới thiệu về gian hàng của bạn'}
                        />
                    </div>
                </div>

                <div className='title mt-3'>Hồ sơ cá nhân</div>
                <p className='note'>Chỉ bạn mới có thể thấy những thông tin này.</p>
                <div className='row'>
                    <div className='col-md-12'>
                        <FloatingInput label={'Email'} disabled value={formData.email} />
                    </div>
                    <div className='col-md-6'>
                        <label className='form-label'>Giới tính</label>
                        <select
                            name={'gender'}
                            value={formData.gender}
                            onChange={handleChangeGender}
                            className='form-select'>
                            <option value='-1'>Giới tính</option>
                            <option value='false'>Nữ</option>
                            <option value='true'>Nam</option>
                        </select>
                    </div>
                    <div className='col-md-6'>
                        <label className='form-label'>Ngày sinh</label>
                        <input
                            value={moment(formData.dateOfBirth).format('YYYY-MM-DD')}
                            name='dateOfBirth'
                            onChange={handleChangeInput}
                            type='date'
                            placeholder='Ngày sinh'
                            className='form-control'
                        />
                    </div>
                </div>
                <button className='btn btn-main mt-4 float-end' onClick={handleSubmit}>
                    Lưu thay đổi
                </button>
            </motion.div>
            <AddressSelectModal
                isOpen={isOpenAddressModal}
                toggle={toggleAddressModal}
                onSubmit={handleChangeAddress}
            />
        </>
    )
}

export default AccountInfo
