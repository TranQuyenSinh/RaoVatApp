import React, { useEffect, useReducer, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { moment, formatNumber } from '../../../utils'
import LoadingBalls from '../../../components/loading/LoadingBalls'
import { getRejectedAds, extendAd, deleteAd } from '../../../services'
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

const RejectedAds = ({ resetCount }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const navigate = useNavigate()

    const fetchRejectedAds = async () => {
        dispatch({ type: 'GET_AD_START' })
        let { data } = await getRejectedAds()
        dispatch({ type: 'GET_AD_SUCCESS', payload: data })
    }

    useEffect(() => {
        fetchRejectedAds()
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
                                            {/* <div className='ad-item__createdAt'>
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
                                            </div> */}
                                        </div>
                                        <div className='reject-container'>
                                            <div className='reject-reason'>
                                                <i className='fa-solid fa-triangle-exclamation text-danger me-2'></i>
                                                <span>Tin đăng này bị từ chối vì:</span>
                                                <div>{item.rejectReason}</div>
                                            </div>
                                            <div className='reject-action'>
                                                <button
                                                    onClick={() => navigate('/sua-tin/' + item.id)}
                                                    className='btn btn-sm btn-outline-warning'>
                                                    Chỉnh sửa lại tin
                                                </button>
                                                <button
                                                    onClick={() => navigate('/dang-tin')}
                                                    className='btn btn-sm btn-success bg-green border-0'>
                                                    Đăng tin mới
                                                </button>
                                            </div>
                                        </div>
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
        </div>
    )
}

export default RejectedAds
