import React, { useState, useEffect, useReducer } from 'react'

import { Link } from 'react-router-dom'

import { moment, formatNumber } from '../../../utils'
import LoadingBalls from '../../../components/loading/LoadingBalls'
import { getWaitingAds } from '../../../services'
import NotHaveAd from '../../../components/notfound/AdNotFound/NotHaveAd'
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

const WaitingAds = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const fetchWaitingAds = async () => {
        dispatch({ type: 'GET_AD_START' })
        let { data } = await getWaitingAds()
        dispatch({ type: 'GET_AD_SUCCESS', payload: data })
    }

    useEffect(() => {
        fetchWaitingAds()
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

export default WaitingAds
