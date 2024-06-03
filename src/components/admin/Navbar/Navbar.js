import React from 'react'
import no_avatar from '@assets/images/no_avatar.png'
import './Navbar.scss'
import { signal } from '@preact/signals-react'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '@redux/user/user.actions'
import { Link } from 'react-router-dom'
export const setNavbarTitle = signal('')

const Navbar = ({ toggleSidebar }) => {
    const { currentUser } = useSelector(state => state.user)
    const dispatch = useDispatch()
    return (
        <nav className='admin-navbar navbar navbar-expand navbar-dark sticky-top px-4 py-0'>
            <a href='index.html' className='navbar-brand d-flex d-lg-none me-4'>
                <h2 className='text-primary mb-0'>
                    <i className='fa fa-user-edit'></i>
                </h2>
            </a>
            <span onClick={toggleSidebar} className='sidebar-toggler flex-shrink-0'>
                <i className='fa fa-bars'></i>
            </span>

            <h5 className='ms-3 text-light'>{setNavbarTitle.value}</h5>

            <div className='navbar-nav align-items-center ms-auto'>
                <div className='nav-item dropdown'>
                    <a href='#' className='nav-link dropdown-toggle' data-bs-toggle='dropdown'>
                        <img
                            className='rounded-circle me-lg-2'
                            src={currentUser?.avatar || no_avatar}
                            alt=''
                            style={{ width: 40, height: 40 }}
                        />
                        <span className='d-none d-lg-inline-flex'>{currentUser?.fullName}</span>
                    </a>
                    <div className='dropdown-menu dropdown-menu-end  border-0 rounded-0 rounded-bottom m-0'>
                        <Link to={'/settings'} className='dropdown-item'>
                            Cài đặt tài khoản
                        </Link>
                        <a onClick={() => dispatch(logoutUser())} className='dropdown-item text-primary'>
                            Đăng xuất
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
