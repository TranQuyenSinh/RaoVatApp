import React, { useState, useEffect } from 'react'

import { motion, AnimatePresence } from 'framer-motion'

import { getDetailAd } from '@services/approveAd'
import { fadeIn, fadeDown } from '@animation/fade'
import LoadingBalls from '@components/loading/LoadingBalls'
import ImageSlider from '@components/slider/ImageSlider'
import { formatNumber } from '@utils/FormatUtils'
import moment from 'moment'
import { getDetailShop } from '@services/user'
import { toast } from 'react-toastify'

import ConfirmModal from '@pages/customer/ManageAd/ConfirmModal'
import useModal from '@hooks/useModal'
import ReasonRejectModal from './ReasonRejectModal'
import { approveAd, rejectAd } from '@services/approveAd'
import { signal } from '@preact/signals-react'
import { isShowSidebar } from '@components/Layout/SystemLayout'

const isApproving = signal(false)

const DetailAd = ({ isOpen, toggle, adId, onDone }) => {
    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={fadeIn}
                        initial='initial'
                        animate='animate'
                        exit='exit'
                        className='approve-ad-detail-container'>
                        {/* Overlay */}
                        <motion.div
                            onClick={toggle}
                            style={{
                                left: isShowSidebar.value ? 250 : 0,
                            }}
                            className='overlay'>
                            {/* Modal content */}
                            <motion.div variants={fadeDown} className='content' onClick={e => e.stopPropagation()}>
                                <DetailContent adId={adId} onDone={onDone} toggle={toggle} />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

const DetailContent = ({ adId, toggle, onDone }) => {
    const [ad, setAd] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const fetchData = async () => {
        try {
            let { data } = await getDetailAd(adId)
            setAd(data)
            console.log(data)
            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (adId) {
            setIsLoading(true)
            fetchData()
        }
    }, [adId])
    return (
        <>
            {ad && !isLoading && (
                <>
                    <ImageSlider images={ad.images} />
                    <div className='detail-info-container'>
                        <ShopInfo shopId={ad.shopId} />

                        <TableInfo ad={ad} />

                        <ApproveButtons toggle={toggle} onDone={onDone} adId={ad.id} />
                    </div>
                    {isApproving.value && (
                        <div className='approving-loader'>
                            <LoadingBalls title='Đang xử lý tin...' />
                        </div>
                    )}
                </>
            )}

            {isLoading && (
                <div className=''>
                    <LoadingBalls />
                </div>
            )}
        </>
    )
}

const TableInfo = ({ ad }) => {
    return (
        <table className='table table-light table-bordered table-detail'>
            <tbody>
                <tr>
                    <th>Tiêu đề</th>
                    <td>{ad.title}</td>
                </tr>
                <tr>
                    <th>Danh mục</th>
                    <td>{ad.genres?.map(genre => genre.title)?.join(', ')}</td>
                </tr>
                <tr>
                    <th>Giá</th>
                    <td>{formatNumber(ad.price)}</td>
                </tr>
                <tr>
                    <th>Mô tả</th>
                    <td>{ad.description}</td>
                </tr>
                <tr>
                    <th>Tình trạng</th>
                    <td>{ad.status ? 'Đã sử dụng' : 'Mới'}</td>
                </tr>
                <tr>
                    <th>Màu sắc</th>
                    <td>{ad.color}</td>
                </tr>
                <tr>
                    <th>Xuất xứ</th>
                    <td>{ad.origin}</td>
                </tr>
                <tr>
                    <th>Đăng lúc</th>
                    <td>
                        {moment(ad.createdAt).format('DD/MM/YYYY HH:mm:ss')} ({moment(ad.createdAt).fromNow()})
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

const ShopInfo = ({ shopId }) => {
    const [shop, setShop] = useState()
    const fetchData = async () => {
        try {
            let { data } = await getDetailShop(shopId)
            setShop(data)
            console.log(data)
        } catch (e) {
            toast.error('Không thể lấy thông tin shop, có lỗi xảy ra!')
        }
    }

    useEffect(() => {
        if (shopId) {
            fetchData()
        }
    }, [shopId])

    return (
        <>
            {shop && (
                <div className='shop-info-container'>
                    <img className='img' src={shop.avatar} width={30} height={30} />
                    <div className='info'>
                        <div className='name'>{shop.name}</div>
                        <div className='location'>
                            <i className='fa-solid fa-location-dot me-2'></i>
                            {shop.district}, {shop.province}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

const ApproveButtons = ({ adId, toggle, onDone }) => {
    const [isOpenConfirmApproved, toggleConfirmApproved] = useModal()
    const [isOpenReasonReject, toggleReasonReject] = useModal()
    const handleApproveAd = async () => {
        try {
            isApproving.value = true
            await approveAd(adId)
            isApproving.value = false
            toggle()
            onDone()
            toast.success('Duyệt thành công')
        } catch (e) {
            toast.error('Có lỗi xảy ra, duyệt thất bại!')
        }
    }

    const handleRejectAd = async reason => {
        try {
            isApproving.value = true
            await rejectAd(adId, reason)
            isApproving.value = false
            toggle()
            onDone()
            toast.success('Đã xử lý tin')
        } catch (e) {
            toast.error('Có lỗi xảy ra, duyệt thất bại!')
        }
    }
    return (
        <>
            <div className='approve-btns-container'>
                <div onClick={toggle} className='btn btn-secondary me-auto'>
                    <i className='fa-solid fa-chevron-left me-2'></i>
                    Quay lại
                </div>
                <div onClick={toggleConfirmApproved} className='btn btn-success'>
                    <i className='fa-solid fa-check me-2'></i>
                    Duyệt tin
                </div>
                <div onClick={toggleReasonReject} className='btn btn-danger'>
                    <i className='fa-solid fa-close me-2'></i>
                    Từ chối
                </div>
            </div>
            <ConfirmModal
                title={'Xác nhận duyệt tin'}
                body={'Bạn có chắc chắn muốn duyệt tin này?'}
                submitText={'Xác nhận'}
                isOpen={isOpenConfirmApproved}
                toggle={toggleConfirmApproved}
                handleSubmit={handleApproveAd}
            />
            <ReasonRejectModal isOpen={isOpenReasonReject} toggle={toggleReasonReject} handleSubmit={handleRejectAd} />
        </>
    )
}

export default DetailAd
