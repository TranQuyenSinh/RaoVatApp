import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const ConfirmModal = ({ title, body, submitText, isOpen, toggle, handleSubmit }) => {
    const onSubmit = () => {
        toggle()
        handleSubmit()
    }
    return (
        <Modal isOpen={isOpen} toggle={toggle} className='order-modal'>
            <ModalHeader>
                <strong>{title}</strong>
                <span>
                    <button onClick={toggle} className='btn btn-close'></button>
                </span>
            </ModalHeader>
            <ModalBody>{body}</ModalBody>
            <ModalFooter>
                <div onClick={toggle} className='btn btn-outline-secondary text-uppercase' style={{ flex: 1 }}>
                    Hủy
                </div>
                <div onClick={onSubmit} className='btn btn-main text-uppercase' style={{ flex: 1 }}>
                    {submitText}
                </div>
            </ModalFooter>
        </Modal>
    )
}

export default ConfirmModal
