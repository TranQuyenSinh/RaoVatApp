import React, { useState, useEffect, useReducer } from 'react'

import { Link } from 'react-router-dom'

import ConfirmModal from './ConfirmModal'
import { moment, formatNumber } from '../../../utils'
import { hideAd, getDisplayAds } from '../../../services'
import LoadingBalls from '../../../components/loading/LoadingBalls'
import NotHaveAd from '../../../components/notfound/AdNotFound/NotHaveAd'
import useModal from '@hooks/useModal'

import { motion } from 'framer-motion'
import { fadeLeftAnimation, fadeOut } from './manageAdAnimtion'
import { useNavigate } from 'react-router-dom'
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

const DisplayAds = ({ resetCount }) => {
    const navigate = useNavigate()
    const [state, dispatch] = useReducer(reducer, initialState)
    const [isOpenHideModal, toggleHideModal] = useModal()
    const [selectedAd, setSelectedAd] = useState()

    const handleHideAd = async () => {
        try {
            await hideAd(selectedAd.id)
            await fetchDisplayAds()
            resetCount()
        } catch (e) {}
    }
    const handleConfirmHide = item => {
        toggleHideModal()
        setSelectedAd(item)
    }
    const fetchDisplayAds = async () => {
        dispatch({ type: 'GET_AD_START' })
        let { data } = await getDisplayAds()
        dispatch({ type: 'GET_AD_SUCCESS', payload: data })
    }

    useEffect(() => {
        fetchDisplayAds()
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
                                                Ngày hết hạn:
                                                <span className='ad-item__expireAt--black'>
                                                    {moment(item.expireAt).format('HH:mm DD/MM/YYYY')} (
                                                    {moment(item.expireAt).fromNow()})
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='text-end'>
                                        <button
                                            onClick={() => navigate('/sua-tin/' + item.id)}
                                            className='btn btn-outline-secondary btn-sm fw-bold me-2'>
                                            <i className='fa-regular fa-pen-to-square me-2'></i>Sửa tin
                                        </button>
                                        <button
                                            onClick={() => handleConfirmHide(item)}
                                            className='btn btn-outline-secondary btn-sm fw-bold'>
                                            <i className='fa-solid fa-eye-slash me-2'></i>
                                            Ẩn tin
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
                title={'Xác nhận ẩn tin'}
                body={'Khi bạn đã bán được hàng, hoặc không muốn tin xuất hiện trên Rao vặt, hãy chọn "Ẩn tin".'}
                submitText={'Ẩn tin'}
                isOpen={isOpenHideModal}
                toggle={toggleHideModal}
                handleSubmit={handleHideAd}
            />
        </div>
    )
}

export default DisplayAds
