import FloatingInput from '@components/input/CustomInput/FloatingInput'
import FloatingTextArea from '@components/input/CustomInput/FloatingTextArea'
import React, { useRef, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import placeholder_image from '@assets/images/placeholder_image.png'
import { useValidateForm } from '@hooks/useValidateForm'

const AddGenreModal = ({ isOpen, toggle, onSubmit }) => {
    const inputFileRef = useRef()
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: undefined,
    })

    const { title, description } = formData
    const errorMessages = {
        title: 'Tên không được bỏ trống',
        description: 'Vui lòng nhập vài dòng mô tả',
    }
    const [formValidate, errors] = useValidateForm({ title, description }, errorMessages, false)
    const [imgError, setImgError] = useState('')

    const handleSubmit = () => {
        if (!validate()) {
            return
        }
        onSubmit({
            title: formData.title,
            description: formData.description,
            image: formData.image.file,
        })
        setFormData({ title: '', description: '', image: undefined })
    }

    const validate = () => {
        let isValid = true
        if (!formValidate()) isValid = false
        if (!formData.image?.file) {
            setImgError('Hình ảnh không được bỏ trống')
            isValid = false
        }
        return isValid
    }

    const handleChangeInput = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleInputFileChange = e => {
        let allowType = ['image/jpeg', 'image/png', 'image/webp']
        let file = e.target.files[0]
        setImgError('')
        if (file)
            if (allowType.includes(file.type)) {
                URL.revokeObjectURL(formData.image?.url)
                setFormData({
                    ...formData,
                    image: {
                        url: URL.createObjectURL(file),
                        file: file,
                    },
                })
            } else {
                setImgError('Vui lòng chọn hình có định dạng ' + allowType.join(', '))
            }
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle} className='add-genre-modal'>
            <ModalHeader>
                <strong>Thêm danh mục</strong>
                <span>
                    <button onClick={toggle} className='btn btn-close'></button>
                </span>
            </ModalHeader>
            <ModalBody>
                <FloatingInput
                    required
                    name='title'
                    label={'Tên danh mục'}
                    placeholder='Aa'
                    value={formData.title}
                    onChange={handleChangeInput}
                    errorMessage={errors.title}
                />
                <FloatingTextArea
                    required
                    name='description'
                    label={'Mô tả'}
                    placeholder='Aa'
                    value={formData.description}
                    onChange={handleChangeInput}
                    errorMessage={errors.description}
                />
                <label className='form-label'>Hình ảnh</label>
                <br />
                <img
                    onClick={() => inputFileRef.current?.click()}
                    className='genre-img'
                    src={formData.image?.url || placeholder_image}
                    alt=''
                />
                <span className='text-danger ms-2'>{imgError}</span>
                <input type='file' onChange={handleInputFileChange} hidden ref={inputFileRef} />
            </ModalBody>
            <ModalFooter className='fill'>
                <div onClick={toggle} className='btn btn-secondary text-uppercase'>
                    Hủy
                </div>
                <div onClick={handleSubmit} className='btn btn-main text-uppercase'>
                    Thêm mới
                </div>
            </ModalFooter>
        </Modal>
    )
}

export default AddGenreModal
