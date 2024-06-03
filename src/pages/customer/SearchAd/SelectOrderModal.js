import React, { useState, useEffect } from 'react'

import RangeSlider from 'react-range-slider-input'
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'

import { formatNumber } from '../../../utils'
import CustomRadio from '../../../components/input/CustomRadio/CustomRadio'

import 'react-range-slider-input/dist/style.css'

import './SelectOrderModal.scss'

const SelectOrderModal = ({ isOpen, toggle, onSubmit }) => {
    const [value, setValue] = useState()

    const handleSubmit = () => {
        onSubmit(value)
        toggle()
    }

    const orderData = [
        { title: 'Tin mới trước', value: 'createdAt', icon: 'fa-regular fa-clock' },
        { title: 'Giá thấp trước', value: 'price', icon: 'fa-solid fa-dollar-sign' },
    ]

    return (
        <Modal isOpen={isOpen} toggle={toggle} className='order-modal'>
            <ModalHeader>
                <strong>Sắp xếp theo</strong>
                <span>
                    <button onClick={toggle} className='btn btn-close'></button>
                </span>
            </ModalHeader>
            <ModalBody>
                {orderData?.map((item, index) => (
                    <CustomRadio key={index} onClick={() => setValue({ ...item })} name='order'>
                        <i className={`${item.icon} me-2`}></i>
                        {item.title}
                    </CustomRadio>
                ))}
            </ModalBody>
            <ModalFooter className='fill'>
                <div onClick={handleSubmit} className='btn btn-main text-uppercase'>
                    Áp dụng
                </div>
            </ModalFooter>
        </Modal>
    )
}

export default SelectOrderModal
