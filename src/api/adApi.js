export const adApi = {
    // common
    saveAdToFavorite: 'api/ad-view/save-ad-to-favorite',
    followShop: 'api/ad-view/follow-shop',

    // home
    getCardAds: 'api/ad-view/card-ads',

    // detail
    getCardAdsRelated: 'api/ad-view/card-ads',
    getCardAdsSimilar: 'api/ad-view/card-ads',
    getDetailAd: 'api/ad-view/detail-ad',

    // search
    searchAd: 'api/ad-view/search-ad',

    // Manage ad
    displayAds: 'api/manage-ad/ads?type=display',
    hiddenAds: 'api/manage-ad/ads?type=hidden',
    expiredAds: 'api/manage-ad/ads?type=expired',
    waitingAds: 'api/manage-ad/ads?type=waiting',
    rejectedAds: 'api/manage-ad/ads?type=rejected',
    favoriteAds: 'api/manage-ad/ads?type=favorite',

    hideAd: 'api/manage-ad/handle?type=hide',
    showAd: 'api/manage-ad/handle?type=show',
    extendAd: 'api/manage-ad/handle?type=extend',
    deleteAd: 'api/manage-ad/handle?type=delete',

    statusCount: 'api/manage-ad/status-count',
}
