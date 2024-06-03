import { userTypes } from './user.types'
import { history } from '../../routes/CustomBrowserRouter'
import { toast } from 'react-toastify'

const initialState = {
    isLoggedIn: false,
    isLoading: false,
    loginErrorMessage: null,
    registerErrorMessage: null,
    currentUser: {},
}

const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        // Login
        case userTypes.LOGIN_START:
            return {
                ...state,
                isLoading: true,
                loginErrorMessage: null,
            }
        case userTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                isLoading: false,
                currentUser: payload,
                loginErrorMessage: null,
            }

        // Register
        case userTypes.REGISTER_GUEST_INIT:
            return {
                ...state,
                registerErrorMessage: null,
            }
        case userTypes.REGISTER_GUEST_START:
            return {
                ...state,
                isLoading: true,
                registerErrorMessage: null,
            }
        case userTypes.REGISTER_GUEST_SUCCESS:
            toast.success('Đăng ký tài khoản thành công!')
            history.push('/login')
            return {
                ...state,
                isLoading: false,
                registerErrorMessage: null,
            }

        // check user is logged in
        case userTypes.CHECKISLOGGEDINSUCCESS:
            return state
        case userTypes.CHECKISLOGGEDINFAILURE:
            return {
                ...state,
                isLoggedIn: false,
                currentUser: {},
            }

        // setting user
        case userTypes.CHANGE_USER_AVATAR:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    avatar: payload,
                },
            }

        case userTypes.UPDATE_USER_INFO:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    fullName: payload.fullName,
                    phone: payload.phone,
                },
            }

        // failure cases
        case userTypes.LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                loginErrorMessage: payload,
            }
        case userTypes.REGISTER_GUEST_FAILURE:
            return {
                ...state,
                isLoading: false,
                registerErrorMessage: payload,
            }

        // logout
        case userTypes.LOGOUT:
            return {
                ...state,
                currentUser: {},
                isLoggedIn: false,
            }

        case userTypes.REFRESH_ACCESS_TOKEN:
            let cpyState = { ...state }
            cpyState.currentUser.accessToken = payload
            return {
                ...cpyState,
            }

        default:
            return state
    }
}

export default userReducer
