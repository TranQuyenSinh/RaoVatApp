import { authAxios } from '../axios'
import { approveAdApi } from '../api'

export const getWaitingApproveAds = () => {
    return authAxios.get(approveAdApi.getWaitingApproveAds)
}

export const getDetailAd = adId => {
    return authAxios.get(approveAdApi.getDetailAd, { params: { adId } })
}

export const approveAd = adId => {
    return authAxios.put(approveAdApi.approveAd, { adId, approveStatus: 1 })
}

export const rejectAd = (adId, rejectReason) => {
    return authAxios.put(approveAdApi.approveAd, { adId, approveStatus: 2, rejectReason })
}
