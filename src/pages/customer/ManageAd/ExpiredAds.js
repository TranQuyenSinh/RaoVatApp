import React, { useEffect, useReducer, useState } from 'react'

import { Link } from 'react-router-dom'

import { moment, formatNumber } from '../../../utils'
import LoadingBalls from '../../../components/loading/LoadingBalls'
import { getExpiredAds, extendAd, deleteAd } from '../../../services'
import NotHaveAd from '../../../components/notfound/AdNotFound/NotHaveAd'
import ConfirmModal from './ConfirmModal'
import useModal from '@hooks/useModal'
import { motion } from 'framer-motion'
import { fadeLeftAnimation, fadeOut } from './manageAdAnimtion'
const initialState = {
    ads: [],
    isLoading: false,
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'GET_AD_START':
            return {
                ...state,
                isLoading: true,
            }
        case 'GET_AD_SUCCESS':
            return {
                ...state,
                ads: action.payload,
                isLoading: false,
            }
        default:
            return state
    }
}

const ExpiredAds = ({ resetCount }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [isOpenDeleteModal, toggleDeleteModal] = useModal()
    const [selectedAd, setSelectedAd] = useState()

    const handleConfirmDelete = item => {
        toggleDeleteModal()
        setSelectedAd(item)
    }
    const handleExtendAd = async adId => {
        try {
            await extendAd(adId)
            await fetchExpiredAds()
            resetCount()
        } catch (e) {}
    }
    const handleDeleteAd = async () => {
        try {
            await deleteAd(selectedAd.id)
            await fetchExpiredAds()
            resetCount()
        } catch (e) {}
    }

    const fetchExpiredAds = async () => {
        dispatch({ type: 'GET_AD_START' })
        let { data } = await getExpiredAds()
        dispatch({ type: 'GET_AD_SUCCESS', payload: data })
    }

    useEffect(() => {
        fetchExpiredAds()
    }, [])

    return (
        <div className='ad-container'>
            <div className='ad-list'>
                {state.isLoading && <LoadingBalls />}
                {!state.isLoading && (
                    <>
                        {state.ads?.length > 0 ? (
                            state.ads.map((item, index) => (
                                <motion.div
                                    variants={fadeLeftAnimation}
                                    initial='initial'
                                    animate='animate'
                                    custom={index}
                                    key={item.id}
                                    className='ad-item'>
                                    <div className='d-flex gap-3'>
                                        <img className='ad-item__image' src={item.thumbnail} alt='' />
                                        <div className='ad-item-info'>
                                            <Link to={`/tin-dang/${item.id}`} className='ad-item__title'>
                                                {item.title}
                                            </Link>
                                            <div className='ad-item__price'>{formatNumber(item.price)}</div>
                                            <div className='ad-item__location'>
                                                {item.district}, {item.province}
                                            </div>
                                            <div className='ad-item__createdAt'>
                                                Ngày đăng tin:
                                                <span className='ad-item__createdAt--black'>
                                                    {moment(item.createdAt).format('DD/MM/YYYY')}
                                                </span>
                                            </div>
                                            <div className='ad-item__expireAt'>
                                                Hết hạn lúc:
                                                <span className='ad-item__expireAt--black'>
                                                    {moment(item.expireAt).fromNow()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='text-end'>
                                        <button
                                            onClick={() => handleExtendAd(item.id)}
                                            className='btn btn-success bg-green border-0 fw-bold me-2'>
                                            <i className='fa-solid fa-rotate me-2'></i>
                                            Gia hạn tin
                                        </button>
                                        <button
                                            onClick={() => handleConfirmDelete(item)}
                                            className='btn btn-outline-danger border-0 fw-bold'>
                                            <i className='fa-solid fa-trash me-2'></i>
                                            Xóa tin này
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div variants={fadeOut} initial='initial' animate='animate'>
                                <NotHaveAd />
                            </motion.div>
                        )}
                    </>
                )}
            </div>
            <ConfirmModal
                title={'Xác nhận xóa tin'}
                body={'Xác nhận xóa tin, thao tác này không thể phục hồi. Bạn có chắc muốn xóa tin này?'}
                submitText={'Xóa tin'}
                isOpen={isOpenDeleteModal}
                toggle={toggleDeleteModal}
                handleSubmit={handleDeleteAd}
            />
        </div>
    )
}

export default ExpiredAds
