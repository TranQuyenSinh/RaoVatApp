import React, { useRef, useState, useEffect } from 'react'

import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

import { moment } from '../../../utils'
import { getFavoriteAds } from '../../../services'
import image from '../../../assets/images/test.png'
import { formatNumber } from '../../../utils/FormatUtils'
import CustomBadge from '../../../components/badge/CustomBadge'
import Section from '../../../components/customer/Section/Section'
import { saveAdToFavorite } from '../../../services'
import { AnimatePresence, motion } from 'framer-motion'
import './SavedAd.scss'

const SavedAd = () => {
    const navigate = useNavigate()
    const [ads, setAds] = useState([])

    const fetchData = async () => {
        try {
            let { data } = await getFavoriteAds()
            setAds(data)
        } catch (e) {
            toast.error('Có lỗi xảy ra khi load dữ liệu, vui lòng thử lại sau!')
        }
    }

    useEffect(() => {
        fetchData()
    }, [])
    const navigateDetail = ad => {
        if (!ad.display) return
        navigate('/tin-dang/' + ad.id)
    }
    const unSaveAd = async (e, ad) => {
        e.stopPropagation()
        try {
            await saveAdToFavorite(ad.id)
            fetchData()
            toast.success('Đã bỏ lưu tin')
        } catch (e) {
            toast.error('Có lỗi xảy ra, vui lòng thử lại')
        }
    }
    return (
        <Section className={'saved-ad'}>
            <div className='section-title text-dark py-3 px-2'>Tin đã lưu ({ads?.length}/100)</div>

            <div className='saved-ad-list'>
                <AnimatePresence mode='popLayout'>
                    {ads.length > 0 &&
                        ads.map(item => (
                            <motion.div
                                layout='position'
                                exit={{ y: -300, opacity: 0, transition: { duration: 0.5 } }}
                                key={item.id}
                                onClick={() => navigateDetail(item)}
                                className={`saved-ad-item ${!item.display ? 'saved-ad-item--disabled' : undefined}`}>
                                <div className='saved-ad-item-image'>
                                    <img src={item.thumbnail} />
                                    {item.status == 0 ? (
                                        <CustomBadge type='warning'>Đã sử dụng</CustomBadge>
                                    ) : (
                                        <CustomBadge type='success'>Mới</CustomBadge>
                                    )}
                                </div>
                                <div className='saved-ad-item-info'>
                                    <div className='title'>{item.title}</div>
                                    <div className='price'>{formatNumber(item.price)}</div>
                                    {!item.display ? (
                                        <div className='note'>Sản phẩm đã ẩn hoặc đã bán</div>
                                    ) : (
                                        <div className='note'>
                                            {moment(item.createdAt).fromNow()}
                                            <> - </>
                                            {item.address?.district}, {item.address?.province}
                                        </div>
                                    )}
                                </div>
                                <i
                                    onClick={e => unSaveAd(e, item)}
                                    className='fa-solid fa-heart heart-icon text-red'></i>
                            </motion.div>
                        ))}
                </AnimatePresence>
            </div>
        </Section>
    )
}

export default SavedAd
