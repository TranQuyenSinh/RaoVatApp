import React, { useState, useEffect } from 'react'

import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'

import ImageSlider from '@components/slider/ImageSlider'

import OtherAds from './OtherAds'
import SimilarAds from './SimilarAds'
import { moment } from '../../../utils'
import ShopSideBar from './ShopSideBar'
import { formatNumber } from '../../../utils'
import { tapAnimation } from '../../../animation'
import { getDetailAd, saveAdToFavorite } from '../../../services'
import Section from '../../../components/customer/Section/Section'
import LoadingBalls from '../../../components/loading/LoadingBalls'
import DetailNotFound from '../../../components/notfound/AdNotFound/DetailNotFound'

import './DetailAd.scss'

const DetailAd = () => {
    const { adId } = useParams()
    const navigate = useNavigate()
    const { isLoggedIn, currentUser } = useSelector(state => state.user)

    const [detailAd, setDetailAd] = useState()
    const [isLoadingDetail, setIsLoadingDetail] = useState(false)
    const [error, setError] = useState(false)

    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {
        ;(async () => {
            window.scrollTo(0, 0)
            setIsLoadingDetail(true)
            setError(false)
            let { data } = await getDetailAd(adId, currentUser?.id)
            if (data) {
                document.title = data.title
                setDetailAd(data)
                setIsFavorite(data.isFavorite)
            } else {
                document.title = 'Rao vặt - Không tìm thấy tin'
                setError(true)
            }
            setIsLoadingDetail(false)
        })()
    }, [adId])

    const handleSaveAd = async isFavorite => {
        if (!isLoggedIn) {
            navigate('/login')
            return
        }
        try {
            await saveAdToFavorite(detailAd.id)
            setIsFavorite(isFavorite)
            toast.success(isFavorite ? 'Đã lưu tin' : 'Đã bỏ lưu tin')
        } catch (e) {
            toast.error('Có lỗi xảy ra, vui lòng thử lại')
        }
    }

    return (
        <div className='ad-detail-container'>
            {/* Detail Ad */}

            {detailAd && !error && (
                <>
                    {!isLoadingDetail ? (
                        <>
                            <Section className='ad-detail-section'>
                                {/* Infor */}
                                <div className='ad-infor'>
                                    <ImageSlider images={detailAd.images} />
                                    <div className='ad-title'>{detailAd.title}</div>
                                    <div className='ad-price'>
                                        <span>{formatNumber(detailAd.price)} đ</span>

                                        <motion.div
                                            variants={tapAnimation}
                                            initial='initial'
                                            whileTap='animate'
                                            onClick={() => handleSaveAd(!isFavorite)}
                                            className='save-ad-btn btn-outline'>
                                            <AnimatePresence initial={false} mode='popLayout'>
                                                {isFavorite ? (
                                                    <motion.div
                                                        key={1}
                                                        initial={{ y: -50, opacity: 0 }}
                                                        animate={{ y: 0, opacity: 1, transition: { type: 'tween' } }}
                                                        exit={{ y: -50, opacity: 0 }}>
                                                        <span>Đã lưu</span>
                                                        <i className='fa-solid fa-heart ms-1'></i>
                                                    </motion.div>
                                                ) : (
                                                    <motion.div
                                                        key={2}
                                                        initial={{ y: 50, opacity: 0 }}
                                                        animate={{ y: 0, opacity: 1, transition: { type: 'tween' } }}
                                                        exit={{ y: 50, opacity: 0 }}>
                                                        <span>Lưu tin</span>
                                                        <i className='fa-regular fa-heart ms-1'></i>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    </div>
                                    <p className='ad-description'>{detailAd.description}</p>
                                    <div className='ad-param-container'>
                                        <div className='ad-param-item'>
                                            <i className='fa-solid fa-clipboard-list'></i> Tình trạng: {detailAd.status}
                                        </div>
                                        <div className='ad-param-item'>
                                            <i className='fa-solid fa-palette'></i> Màu sắc: {detailAd.color}
                                        </div>
                                        <div className='ad-param-item'>
                                            <i className='fa-solid fa-globe'></i> Xuất xứ: {detailAd.origin}
                                        </div>
                                    </div>
                                    <div className='ad-createdAt'>
                                        Tin được đăng {moment(detailAd.createdAt).fromNow()}
                                    </div>
                                </div>

                                <ShopSideBar shopId={detailAd.shopId} />
                            </Section>

                            {/* Tin cùng shop */}
                            {detailAd.shopId && <OtherAds shopId={detailAd.shopId} />}

                            {/* Tin tương tự */}
                            {adId && <SimilarAds adId={adId} />}
                        </>
                    ) : (
                        <>
                            <LoadingBalls />
                        </>
                    )}
                </>
            )}
            {error && <DetailNotFound />}
        </div>
    )
}

export default DetailAd
