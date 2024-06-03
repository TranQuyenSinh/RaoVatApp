import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './AccountManage.scss'
import { fadeIn } from '@animation/fade'
import Section from '@components/admin/Section/Section'
import { tapAnimation } from '@animation/button'
import { getAllAccount, getAllRole, lockAccount, phanQuyen } from '@services/account'
import no_avatar from '@assets/images/no_avatar.png'
import { accountApi } from '@api/accountApi'
import ModifyAccountModal from './ModifyAccountModal'
import useModal from '@hooks/useModal'
import FloatingSelect from '@components/input/CustomSelect/FloatingSelect'
import { toast } from 'react-toastify'
import { setNavbarTitle } from '@components/admin/Navbar/Navbar'

const AccountManage = () => {
   const [searchKey, setSearchKey] = useState('')
   const [accounts, setAccounts] = useState([])
   const [roles, setRoles] = useState([])

   const [filteredAccount, setFilteredAccount] = useState([])

   const fetchData = async () => {
      try {
         let { data: accountData } = await getAllAccount()
         let { data: roleData } = await getAllRole()

         setAccounts(accountData)
         setRoles(roleData)
      } catch (e) {
         toast.error('Có lỗi xảy ra, vui lòng thử lại')
      }
   }

   useEffect(() => {
      setNavbarTitle.value = 'Quản lý tài khoản'
      fetchData()
   }, [])

   useEffect(() => {
      let list = accounts
      if (searchKey) {
         let searchKeyLower = searchKey.toLowerCase()
         list = list.filter(
            x => x.fullName.toLowerCase().match(searchKeyLower) || x.email.toLowerCase().match(searchKeyLower)
         )
      }
      setFilteredAccount(list)
   }, [searchKey, accounts])

   const handleLockAccount = async userId => {
      try {
         await lockAccount(userId)
         toast.success('Thay đổi trạng thái thành công')
         fetchData()
      } catch (e) {
         toast.error('Thay đổi thất bại, vui lòng thử lại')
      }
   }
   const RoleSelect = ({ user }) => {
      const handlePhanQuyen = async e => {
         let roleId = e.target.value
         try {
            await phanQuyen(user.id, roleId)
            toast.success('Thay đổi quyền thành công')
            fetchData()
         } catch (e) {
            toast.error('Phân quyền thất bại, vui lòng thử lại')
         }
      }
      return (
         <select onChange={handlePhanQuyen} className='form-select'>
            {roles?.map(role => (
               <option selected={user.role.id === role.id} key={role.id} value={role.id}>
                  {role.roleName}
               </option>
            ))}
         </select>
      )
   }

   return (
      <>
         <motion.div variants={fadeIn} initial='initial' animate='animate' className='account-manage-container'>
            <Section>
               <div className='d-flex gap-2 align-items-center'>
                  <input
                     type='text'
                     value={searchKey}
                     onChange={e => setSearchKey(e.target.value)}
                     className='form-control w-25'
                     placeholder='Tìm kiếm'
                  />
               </div>
               <div className='mt-4'>
                  <table className='table table-bordered table-table-striped account-table'>
                     <thead>
                        <td>#</td>
                        <td>Ảnh</td>
                        <td>Tên đăng nhập</td>
                        <td>Họ tên</td>
                        <td>Quyền hạn</td>
                        <td>Giới tính</td>
                        <td>Địa chỉ</td>
                        <td>Hành động</td>
                     </thead>
                     <tbody>
                        {filteredAccount?.map((item, index) => (
                           <tr key={item.id}>
                              <td>{index + 1}</td>
                              <td>
                                 <img
                                    src={item.avatar || no_avatar}
                                    alt=''
                                    width={100}
                                    height={100}
                                    className='user-avatar'
                                 />
                              </td>
                              <td>{item.email}</td>
                              <td>{item.fullName}</td>
                              <td>
                                 <RoleSelect user={item} />
                              </td>
                              <td>{item.gender ? 'Nam' : 'Nữ'}</td>
                              <td>{item.address}</td>
                              <td>
                                 <div className='d-flex flex-column gap-2 align-items-center'>
                                    {item.isLocked ? (
                                       <motion.div
                                          onClick={() => handleLockAccount(item.id)}
                                          variants={tapAnimation}
                                          initial='initial'
                                          whileTap={'animate'}
                                          className='btn btn-primary'>
                                          <i className='fa-solid fa-lock-open me-2'></i>
                                          Mở khóa
                                       </motion.div>
                                    ) : (
                                       <motion.div
                                          onClick={() => handleLockAccount(item.id)}
                                          variants={tapAnimation}
                                          initial='initial'
                                          whileTap={'animate'}
                                          className='btn btn-danger'>
                                          <i className='fa-solid fa-lock me-2'></i>
                                          Khóa
                                       </motion.div>
                                    )}
                                 </div>
                              </td>
                              {/* <td>
                                 <motion.div
                                    variants={tapAnimation}
                                    initial='initial'
                                    whileTap={'animate'}
                                    className='btn btn-main'>
                                    <i className='fa-solid fa-star me-2'></i>
                                    Phân quyền
                                 </motion.div>
                              </td> */}
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </Section>
         </motion.div>
      </>
   )
}

export default AccountManage
