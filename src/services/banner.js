import { bannerApi } from '@api/bannerApi'
import { axios, authAxios } from '../axios'
import { generateFormData } from '@utils/CommonUtils'

export const getDisplayBanners = () => {
    return axios.get(bannerApi.getDisplayBanners)
}

export const getAllBanners = () => {
    return authAxios.get(bannerApi.getAllBanners)
}

export const createBanner = data => {
    var formData = generateFormData(data)
    return authAxios.post(bannerApi.createBanner, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

export const editBanner = data => {
    var formData = generateFormData(data)
    return authAxios.put(bannerApi.editBanner, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

export const deleteBanner = id => {
    return authAxios.delete(bannerApi.deleteBanner, { params: { id } })
}
