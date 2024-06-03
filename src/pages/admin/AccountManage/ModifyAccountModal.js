import FloatingInput from '@components/input/CustomInput/FloatingInput'
import useModal from '@hooks/useModal'
import ConfirmModal from '@pages/customer/ManageAd/ConfirmModal'
import React, { useRef, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import placeholder_image from '@assets/images/placeholder_image.png'

const ModifyAccountModal = ({ isOpen, toggle, onSubmit, editBanner, onDelete }) => {
   const [isOpenConfirmModal, toggleConfirmModal] = useModal()
   const fileInputRef = useRef()
   const [formData, setFormData] = useState({
      description: '',
      url: '',
      display: true,
      image: undefined,
   })
   return (
      <>
         <Modal isOpen={isOpen} toggle={toggle} className='modify-account-modal'>
            <ModalHeader>
               <strong>Thông tin tài khoản</strong>
               <span>
                  <button onClick={toggle} className='btn btn-close'></button>
               </span>
            </ModalHeader>
            <ModalBody>
               <div className='row'>
                  <div className='col-6'></div>
                  <div className='col-6'></div>
               </div>
               {/* <input onChange={handleChangeInputFile} type='file' hidden ref={fileInputRef} /> */}
               {/* <FloatingInput
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
               </div> */}
            </ModalBody>
            <ModalFooter>
               <div className='d-flex gap-2 w-100'>
                  <div onClick={toggle} className='btn btn-outline-secondary text-uppercase' style={{ flex: 1 }}>
                     Hủy
                  </div>
                  {/* <div onClick={handleSubmit} className='btn btn-main text-uppercase' style={{ flex: 1 }}>
                     Ok
                  </div> */}
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

export default ModifyAccountModal
