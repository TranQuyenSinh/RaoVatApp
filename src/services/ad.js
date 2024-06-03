import { authAxios, axios } from '../axios'
import { adApi } from '../api'

export const getLatestCardAds = (index, province, genreSlug) => {
    return axios.get(adApi.getCardAds, { params: { type: 'latest', p: province, i: index, genreSlug: genreSlug } })
}

export const getRelatedCardAds = shopId => {
    return axios.get(adApi.getCardAdsRelated, { params: { type: 'related', shopId } })
}

export const getSimilarAd = adId => {
    return axios.get(adApi.getCardAdsSimilar, { params: { type: 'similar', adId } })
}

export const getDetailAd = (adId, userId = null) => {
    return axios.get(adApi.getDetailAd, { params: { id: adId, userId } })
}

export const saveAdToFavorite = adId => {
    return authAxios.put(adApi.saveAdToFavorite, { adId })
}

export const followShop = shopId => {
    return authAxios.put(adApi.followShop, { shopId })
}

export const searchAd = (filter, currentPage, userId = null) => {
    return axios.post(adApi.searchAd, { ...filter, userId, currentPage })
}
