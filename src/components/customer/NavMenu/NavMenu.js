import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faNewspaper,
    faUserCircle,
    faChevronDown,
    faEdit,
    faHeart,
    faShoppingCart,
    faCog,
    faComment,
    faSignOut,
    faTabletAndroid,
} from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import './NavMenu.scss'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../../redux/user/user.actions'
import no_avatar from '../../../assets/images/no_avatar.png'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import { tapAnimation } from '../../../animation/button'
import FloatForm from './FloatForm'
import useModal from '@hooks/useModal'
const NavMenu = () => {
    const [isOpen, toggle] = useModal()
    const dispatch = useDispatch()
    const { currentUser, isLoggedIn } = useSelector(state => state.user)

    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logoutUser())
        toast.success('Bạn đã đăng xuất khỏi hệ thống')
    }
    return (
        <>
            <div className='navmenu'>
                <Link to={'/quan-ly-tin'} className='navmenu__item'>
                    <FontAwesomeIcon icon={faNewspaper} />
                    <span>Tin của bạn</span>
                </Link>
                {isLoggedIn ? (
                    <div className='navmenu__item user_info dropdown'>
                        <div data-bs-toggle='dropdown' className=''>
                            <img src={currentUser?.avatar || no_avatar} className='user-avatar' alt='' />
                            <span>{currentUser?.fullName}</span>
                            <FontAwesomeIcon icon={faChevronDown} size='xs' />
                        </div>

                        <ul className='user_info--dropdown dropdown-menu custom-menu'>
                            <li className='menu-title'>Tiện ích</li>
                            <li>
                                <Link to='/saved-ads'>
                                    <FontAwesomeIcon className='menu-icon bg-red' icon={faHeart} />
                                    Tin đã lưu
                                </Link>
                                <Link to='/counter'>
                                    <FontAwesomeIcon className='menu-icon bg-blue' icon={faShoppingCart} />
                                    Giỏ hàng của bạn
                                </Link>
                            </li>
                            <li className='menu-title'>Cài đặt</li>
                            <li>
                                <Link to='/settings'>
                                    <FontAwesomeIcon className='menu-icon bg-gray' icon={faCog} />
                                    Cài đặt tài khoản
                                </Link>
                            </li>
                            <li>
                                <Link to='/'>
                                    <FontAwesomeIcon className='menu-icon bg-gray' icon={faComment} />
                                    Đóng góp ý kiến
                                </Link>
                            </li>
                            <li>
                                <a onClick={handleLogout}>
                                    <FontAwesomeIcon className='menu-icon bg-gray' icon={faSignOut} />
                                    Đăng xuất
                                </a>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <Link to={'/login'} className='navmenu__item'>
                        <FontAwesomeIcon icon={faUserCircle} />
                        <> </>
                        Đăng nhập
                    </Link>
                )}
                <motion.button
                    variants={tapAnimation}
                    initial='initial'
                    whileTap='animate'
                    onClick={() => navigate('dang-tin')}
                    // onClick={toggle}
                    className='navmenu__btn'>
                    <FontAwesomeIcon className='me-2' icon={faEdit} />
                    Đăng tin
                </motion.button>
            </div>
            <FloatForm isOpen={isOpen} toggle={toggle} />
        </>
    )
}

export default NavMenu
