import { settingApi } from '../api'
import { authAxios } from '../axios'

export const changeAvatar = avatar => {
    let formData = new FormData()
    formData.append('avatar', avatar)
    return authAxios.post(settingApi.changeAvatar, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

export const changePassword = (currentPassword, newPassword) => {
    return authAxios.post(settingApi.changePassword, { currentPassword, newPassword })
}

export const getUserInfo = () => {
    return authAxios.get(settingApi.userInfo)
}

export const saveUserInfo = userInfo => {
    return authAxios.post(settingApi.saveUserInfo, userInfo)
}
