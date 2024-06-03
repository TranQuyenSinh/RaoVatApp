import FloatingTextArea from '@components/input/CustomInput/FloatingTextArea'
import { useValidateForm } from '@hooks/useValidateForm'
import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const ReasonRejectModal = ({ isOpen, toggle, handleSubmit }) => {
    const [reason, setReason] = useState('')
    const [validate, errors] = useValidateForm({ reason }, { reason: 'Vui lòng nhập lý do' }, false)

    const onSubmit = () => {
        if (!validate()) return
        handleSubmit(reason)
        toggle()
    }
    return (
        <Modal isOpen={isOpen} toggle={toggle} className='reason-reject-modal'>
            <ModalHeader>
                <strong>Lý do từ chối</strong>
                <span>
                    <button onClick={toggle} className='btn btn-close'></button>;
                </span>
            </ModalHeader>
            <ModalBody>
                <FloatingTextArea
                    required
                    label={'Aa'}
                    placeholder=''
                    value={reason}
                    errorMessage={errors.reason}
                    onChange={e => setReason(e.target.value)}
                />
            </ModalBody>
            <ModalFooter>
                <div onClick={toggle} className='btn btn-outline-secondary text-uppercase' style={{ flex: 1 }}>
                    Hủy
                </div>
                <div onClick={onSubmit} className='btn btn-main text-uppercase' style={{ flex: 1 }}>
                    Ok
                </div>
            </ModalFooter>
        </Modal>
    )
}
export default ReasonRejectModal
