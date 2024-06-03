import React, { useState, useEffect } from 'react'

import { toast } from 'react-toastify'

import useModal from '@hooks/useModal'
import Section from '@components/admin/Section/Section'
import { setNavbarTitle } from '@components/admin/Navbar/Navbar'
import { editBanner, createBanner, getAllBanners, deleteBanner } from '@services/banner'

import './BannerManage.scss'
import EditBannerModal from './EditBannerModal'
import { motion } from 'framer-motion'
import { tapAnimation } from '@animation/button'
import { fadeIn } from '@animation/fade'

const BannerManage = () => {
   const [isOpenEditModal, toggleEditModal] = useModal()
   const [isOpenCreateModal, toggleCreateModal] = useModal()

   const [banners, setBanners] = useState([])
   const [selectedBanner, setSelectedBanner] = useState()

   const fetchData = async () => {
      try {
         let { data } = await getAllBanners()
         setBanners(data)
      } catch (e) {
         toast.error('Load dữ liệu thất bại, vui lòng thử lại sau')
      }
   }

   useEffect(() => {
      setNavbarTitle.value = 'Quản lý banner'
      fetchData()
   }, [])

   const handleCreateBanner = async data => {
      try {
         let {
            description,
            url,
            display,
            image: { file },
         } = data
         await createBanner({ description, url, image: file, display })
         toast.success('Lưu thành công')
         toggleCreateModal()
         fetchData()
      } catch (e) {
         toast.error('Lưu thất bại, vui lòng thử lại sau')
      }
   }

   const handleEditBanner = async data => {
      try {
         let {
            description,
            url,
            display,
            image: { file },
         } = data
         await editBanner({ id: selectedBanner.id, description, url, image: file, display })
         toast.success('Lưu thành công')
         toggleEditModal()
         fetchData()
      } catch (e) {
         toast.error('Lưu thất bại, vui lòng thử lại sau')
      }
   }

   const handleDeleteBanner = async id => {
      try {
         await deleteBanner(id)
         toast.success('Xóa thành công')
         toggleEditModal()
         fetchData()
      } catch (e) {
         toast.error('Xóa thất bại, vui lòng thử lại sau')
      }
   }

   return (
      <motion.div variants={fadeIn} initial='initial' animate='animate' className='banner-manage-container'>
         <Section>
            <div className='d-flex gap-3 align-items-center'>
               <motion.div
                  variants={tapAnimation}
                  initial='initial'
                  whileTap={'animate'}
                  onClick={toggleCreateModal}
                  className='btn btn-main'>
                  <i className='fa-solid fa-plus me-2'></i>
                  Thêm mới
               </motion.div>
            </div>
            <div className='section-title mt-4'>Banner đang hiển thị</div>
            <div className='list w-100'>
               {banners
                  ?.filter(b => b.display)
                  .map((item, index) => (
                     <div
                        key={item.id}
                        onClick={() => {
                           setSelectedBanner(item)
                           toggleEditModal()
                        }}
                        className='item'>
                        <img className='item-img' src={item.image} />
                        <div className='item-title'>{item.description}</div>
                        <div className='item-url'>
                           URL:
                           <> </>
                           <a className='link-primary' target='_blank' href={item.url}>
                              {item.url}
                           </a>
                        </div>
                     </div>
                  ))}
            </div>
            <div className='section-title mt-4'>Banner đang ẩn</div>
            <div className='list w-100'>
               {banners
                  ?.filter(b => !b.display)
                  .map((item, index) => (
                     <div
                        key={item.id}
                        onClick={() => {
                           setSelectedBanner(item)
                           toggleEditModal()
                        }}
                        custom={index}
                        viewport={{ once: true }}
                        className='item'>
                        <img className='item-img' src={item.image} />
                        <div className='item-title'>{item.description}</div>
                        <div className='item-url'>
                           URL:
                           <> </>
                           <a className='link-primary' target='_blank' href={item.url}>
                              {item.url}
                           </a>
                        </div>
                     </div>
                  ))}
            </div>
         </Section>
         <EditBannerModal
            isOpen={isOpenCreateModal}
            toggle={toggleCreateModal}
            editBanner={editBanner}
            onSubmit={handleCreateBanner}
         />
         <EditBannerModal
            isOpen={isOpenEditModal}
            toggle={toggleEditModal}
            editBanner={selectedBanner}
            onSubmit={handleEditBanner}
            onDelete={handleDeleteBanner}
         />
      </motion.div>
   )
}

export default BannerManage
