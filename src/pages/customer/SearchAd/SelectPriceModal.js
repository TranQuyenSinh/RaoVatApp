import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import './SelectPriceModal.scss'
import RangeSlider from 'react-range-slider-input'
import 'react-range-slider-input/dist/style.css'
import { formatNumber } from '../../../utils'

const SelectPriceModal = ({ isOpen, toggle, onSubmit }) => {
    const [value, setValue] = useState([0, 100000000])

    const handleSubmit = () => {
        onSubmit(value)
        toggle()
    }

    const RangeSliderConfig = {
        min: 0,
        max: 100000000,
        step: 100000,
        value: value,
        onInput: value => setValue(value),
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle} className='price-modal'>
            <ModalHeader>
                <strong>Chọn giá</strong>
                <span>
                    <button onClick={toggle} className='btn btn-close'></button>
                </span>
            </ModalHeader>
            <ModalBody>
                <p>
                    Giá từ <b>{formatNumber(value[0])}</b> đên <b>{formatNumber(value[1])}</b> đ
                </p>
                <RangeSlider id='range-slider' {...RangeSliderConfig} />
            </ModalBody>
            <ModalFooter className='fill'>
                <div onClick={handleSubmit} className='btn btn-main text-uppercase'>
                    Áp dụng
                </div>
            </ModalFooter>
        </Modal>
    )
}

export default SelectPriceModal
