import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { registerGuest, registerGuestInit } from '../../../redux/user/user.actions'
import './Register.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../../assets/images/logo.png'
import FloatingInput from '../../../components/input/CustomInput/FloatingInput'

export const Register = props => {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
    })
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const btnSubmit = useRef()
    const dispatch = useDispatch()
    const { isLoggedIn, registerErrorMessage } = useSelector(state => state.user)

    useEffect(() => {
        document.title = 'Rao vặt - Đăng ký'
    }, [])

    useEffect(() => {
        if (isLoggedIn) navigate('/')
    }, [isLoggedIn, navigate])

    useEffect(() => {
        dispatch(registerGuestInit())

        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [dispatch])

    const handleRegister = async () => {
        let { fullname, email, password } = formData
        dispatch(registerGuest(fullname, email, password))
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
        <>
            <div className='register-bg'>
                <div className='register-container'>
                    <div className='register-content'>
                        {/* Logo App */}
                        <div onClick={() => navigate('/')} style={{ cursor: 'pointer' }} className='text-center'>
                            <img src={logo} className='w-25 my-2' />
                        </div>

                        {/* Error message */}
                        {registerErrorMessage && (
                            <div className='my-2 error-box'>
                                <FontAwesomeIcon className='danger-icon' icon={faExclamationTriangle} />
                                <span>{typeof registerErrorMessage === 'string' && registerErrorMessage}</span>
                            </div>
                        )}

                        {/* Input */}
                        <div className='register-title'>Đăng ký tài khoản</div>
                        <div className='form-group'>
                            <FloatingInput
                                label={'Họ và tên'}
                                value={formData.fullname}
                                onChange={handleChangeInput}
                                name='fullname'
                                type='text'
                            />
                        </div>
                        <div className='form-group'>
                            <FloatingInput
                                label={'Email'}
                                value={formData.email}
                                onChange={handleChangeInput}
                                name='email'
                                type='text'
                            />
                        </div>
                        <div className=' form-group'>
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
                        </div>

                        {/* Button register, Register */}
                        <div className=''>
                            <button
                                ref={btnSubmit}
                                onClick={handleRegister}
                                className='btn btn-main w-100 btn-register mt-2'>
                                Đăng ký
                            </button>
                        </div>

                        <div className=' text-center  mt-4'>
                            <span className='text-muted'>Đã có tài khoản?</span>
                            <> </>
                            <Link to={'/login'} className='link-primary'>
                                Đăng nhập ngay
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
