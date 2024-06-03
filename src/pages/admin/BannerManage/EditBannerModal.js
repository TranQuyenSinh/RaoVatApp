import FloatingInput from '@components/input/CustomInput/FloatingInput'
import FloatingTextArea from '@components/input/CustomInput/FloatingTextArea'
import useChangeInput from '@hooks/useChangeInput'
import { useValidateForm } from '@hooks/useValidateForm'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import placeholder_banner from '@assets/images/placeholder_banner.png'
import useChangeInputFile from '@hooks/useChangeInputFile'
import CustomSwitch from '@components/input/CustomSwitch/CustomSwitch'
import useModal from '@hooks/useModal'
import ConfirmModal from '@pages/customer/ManageAd/ConfirmModal'

const EditBannerModal = ({ isOpen, toggle, onSubmit, editBanner, onDelete }) => {
    const [isOpenConfirmModal, toggleConfirmModal] = useModal()
    const fileInputRef = useRef()
    const [formData, setFormData] = useState({
        description: '',
        url: '',
        display: true,
        image: undefined,
    })
    const [imageError, setImageError] = useState('')
    const handleChangeInput = useChangeInput(formData, setFormData)
    const errorMessages = useRef({
        description: 'Vui lòng nhập vài mô tả cho banner này',
        url: 'URL không được bỏ trống',
    }).current
    const validateInput = useMemo(() => {
        const { description, url } = formData
        return { url, description }
    }, [formData])
    const [validate, errors] = useValidateForm(validateInput, errorMessages, false)
    const handleChangeInputFile = useChangeInputFile(formData, setFormData, setImageError)

    useEffect(() => {
        if (editBanner?.id) {
            setFormData({
                description: editBanner.description,
                url: editBanner.url,
                display: editBanner.display,
                image: {
                    url: editBanner.image,
                },
            })
        }
    }, [editBanner])

    useEffect(() => {
        console.log(formData.display)
    }, [isOpen])

    const handleSubmit = () => {
        if (!validate()) {
            if (!formData.image?.url) {
                setImageError('Hình ảnh banner không được bỏ trống')
            }
            return
        }
        onSubmit(formData)
        setFormData({ description: '', url: '', display: true, image: undefined })
    }

    return (
        <>
            {' '}
            <Modal isOpen={isOpen} toggle={toggle} className='edit-banner-modal'>
                <ModalHeader>
                    <strong>Thông tin banner</strong>
                    <span>
                        <button onClick={toggle} className='btn btn-close'></button>
                    </span>
                </ModalHeader>
                <ModalBody>
                    <div className='text-center mb-3'>
                        <img
                            src={formData.image?.url || placeholder_banner}
                            className='img'
                            onClick={() => fileInputRef.current?.click()}
                        />
                        <div className='text-danger'>{imageError}</div>
                    </div>
                    <input onChange={handleChangeInputFile} type='file' hidden ref={fileInputRef} />
                    <FloatingInput
                        required
                        name='description'
                        label={'Mô tả'}
                        placeholder='Aa'
                        value={formData.description}
                        onChange={handleChangeInput}
                        errorMessage={errors.description}
                    />
                    <FloatingInput
                        required
                        label={'URL'}
                        placeholder='Aa'
                        name='url'
                        value={formData.url}
                        errorMessage={errors.url}
                        onChange={handleChangeInput}
                    />
                    <div className='d-flex align-items-center gap-3'>
                        <label className='form=label'>Hiển thị</label>
                        <CustomSwitch
                            checked={formData.display}
                            onChange={e => setFormData({ ...formData, display: e.target.checked })}
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <div className='d-flex gap-2 w-100'>
                        <div onClick={toggle} className='btn btn-outline-secondary text-uppercase' style={{ flex: 1 }}>
                            Hủy
                        </div>
                        <div onClick={handleSubmit} className='btn btn-main text-uppercase' style={{ flex: 1 }}>
                            Ok
                        </div>
                    </div>
                    {editBanner?.id && (
                        <div onClick={toggleConfirmModal} className='btn btn-outline-danger  w-100'>
                            Xóa banner này
                        </div>
                    )}
                </ModalFooter>
            </Modal>
            <ConfirmModal
                title={'Xác nhận xóa banner'}
                body={'Bạn có chắc chắn muốn xóa banner này (thao tác này không thể hoàn tác)?'}
                submitText={'Xác nhận'}
                isOpen={isOpenConfirmModal}
                toggle={toggleConfirmModal}
                handleSubmit={() => onDelete(editBanner.id)}
            />
        </>
    )
}
export default EditBannerModal
