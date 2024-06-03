import React, { useRef, useState, useEffect } from 'react'

import moment from 'moment'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'

import { formatNumber } from '@utils/FormatUtils'
import Section from '@components/admin/Section/Section'
import CustomBadge from '@components/badge/CustomBadge'
import { getWaitingApproveAds } from '@services/approveAd'
import { setNavbarTitle } from '@components/admin/Navbar/Navbar'
import DetailAd from './DetailAd'
import './ApproveAd.scss'
import useModal from '@hooks/useModal'
import all_done_img from '@assets/images/all_done.svg'

const ApproveAd = () => {
    const [isOpenDetail, toggleDetail] = useModal()
    const [ads, setAds] = useState([])
    const [filterAds, setFilterAds] = useState([])
    const [selectedAd, setSelectedAd] = useState()
    const [searchKey, setSearchKey] = useState('')

    const fetchData = async () => {
        try {
            let { data } = await getWaitingApproveAds()
            setAds(data)
        } catch (e) {
            toast.error('Có lỗi xảy ra, không load được dữ liệu')
        }
    }

    useEffect(() => {
        setNavbarTitle.value = 'Tin chờ duyệt'
        fetchData()
    }, [])

    useEffect(() => {
        let filteredAds = ads
        if (searchKey) {
            filteredAds = ads.filter(ad => ad.title.toLowerCase().includes(searchKey.toLowerCase()))
        }
        setFilterAds(filteredAds)
    }, [searchKey, ads])

    const handleToggleDetail = ad => {
        setSelectedAd(ad)
        toggleDetail()
    }

    return (
        <motion.div>
            <Section className='approve-ad-container'>
                {ads.length != 0 && (
                    <div className='d-flex gap-3 align-items-center'>
                        <input
                            type='text'
                            value={searchKey}
                            onChange={e => setSearchKey(e.target.value)}
                            className='form-control w-25'
                            placeholder='Tìm kiếm'
                        />
                    </div>
                )}
                <div className='list w-100 mt-4'>
                    {filterAds?.map((item, index) => (
                        <motion.div onClick={() => handleToggleDetail(item)} key={item.id} className='item'>
                            <div className='position-relative'>
                                <img className='item__img' src={item.thumbnail} />
                                {item.status ? (
                                    <CustomBadge type='success'>Mới</CustomBadge>
                                ) : (
                                    <CustomBadge type='warning'>Đã sử dụng</CustomBadge>
                                )}
                            </div>
                            <div className='item__content'>
                                <div>
                                    <div className='item__content--title'>{item.title}</div>
                                    <div className='item__content--price'>{formatNumber(item.price)}</div>
                                </div>
                                <div className='item__content--footer'>Tạo {moment(item.createdAt).fromNow()}</div>
                            </div>
                        </motion.div>
                    ))}
                    {ads?.length == 0 && (
                        <div className='text-center w-100 p-5'>
                            <img width={'100%'} height={300} src={all_done_img} alt='' />
                            <h3 className='mt-2'>Không còn tin nào cần duyệt</h3>
                            <p className='mt-2 text-muted'>Hãy chờ đợi và nhâm nhi tách cà phê thôi nào :)</p>
                        </div>
                    )}
                </div>
            </Section>
            <DetailAd isOpen={isOpenDetail} toggle={toggleDetail} adId={selectedAd?.id} onDone={fetchData} />
        </motion.div>
    )
}

export default ApproveAd
