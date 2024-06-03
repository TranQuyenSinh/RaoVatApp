import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { loginUser } from '@redux/user/user.actions'
import './Auth.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import logo from '@assets/images/tab_logo_rounded.png'
import FloatingInput from '@components/input/CustomInput/FloatingInput'

const AdminLogin = props => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const btnSubmit = useRef()
    const dispatch = useDispatch()
    const { isLoggedIn, loginErrorMessage } = useSelector(state => state.user)

    useEffect(() => {
        if (isLoggedIn) navigate('/admin')
    }, [isLoggedIn])

    useEffect(() => {
        document.title = 'Rao vặt - Đăng nhập'
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    const handleAdminLogin = async () => {
        let { email, password } = formData
        dispatch(loginUser(email, password))
    }

    const handleKeyDown = event => {
        if (event.keyCode === 13) {
            btnSubmit.current.click()
        }
    }

    const handleChangeInput = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <div className='login-bg login-bg-admin'>
            <div className='login-container'>
                <div className='login-content row'>
                    {/* Logo App */}
                    <div
                        onClick={() => navigate('/')}
                        className='col-12 d-flex-center gap-3'
                        style={{ cursor: 'pointer' }}>
                        <img src={logo} width={75} height={75} className=' my-2' />
                        <h4>Hệ thống quản lý Raovat.net</h4>
                    </div>
                    {/* Error message */}
                    {loginErrorMessage && (
                        <div className='col-12 my-2 error-box'>
                            <FontAwesomeIcon className='danger-icon' icon={faExclamationTriangle} />
                            <span>{loginErrorMessage}</span>
                        </div>
                    )}

                    {/* Input */}
                    <div className='col-12 login-title'>Đăng nhập</div>
                    <div className='col-12 form-group'>
                        <FloatingInput
                            label={'Email'}
                            value={formData.email}
                            onChange={handleChangeInput}
                            name='email'
                            type='text'
                        />
                    </div>
                    <div className='col-12 form-group'>
                        <div className='password-input-container'>
                            <FloatingInput
                                label={'Mật khẩu'}
                                value={formData.password}
                                onChange={handleChangeInput}
                                name='password'
                                type={!showPassword ? 'password' : 'text'}
                            />
                            <FontAwesomeIcon
                                className='show-password-icon'
                                onClick={() => setShowPassword(!showPassword)}
                                icon={showPassword ? faEye : faEyeSlash}
                            />
                        </div>
                        <div className='col-12 mb-4'>
                            <span className='link-primary' style={{ cursor: 'pointer' }}>
                                Quên mật khẩu?
                            </span>
                        </div>
                    </div>

                    {/* Button login, Register */}
                    <div className='col-12'>
                        <button ref={btnSubmit} onClick={handleAdminLogin} className='btn btn-main w-100 btn-login'>
                            Đăng nhập
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin
