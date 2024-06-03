import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import HiddenAds from './HiddenAds'
import ExpiredAds from './ExpiredAds'
import DisplayAds from './DisplayAds'
import { getAdStatusCount } from '../../../services'
import no_avatar from '../../../assets/images/no_avatar.png'
import Section from '../../../components/customer/Section/Section'

import 'react-tabs/style/react-tabs.css'

import './ManageAd.scss'
import WaitingAds from './WaitingAds'
import RejectedAds from './RejectedAds'
const ManageAd = () => {
    const [statusCount, setStatusCount] = useState({
        display: 0,
        expired: 0,
        rejected: 0,
        waiting: 0,
        hidden: 0,
    })

    const { currentUser, isLoggedIn } = useSelector(state => state.user)
    const resetCount = async () => {
        let { data } = await getAdStatusCount()
        setStatusCount(data)
    }
    useEffect(() => {
        document.title = 'Rao vặt - Quản lý tin'
        resetCount()
    }, [])
    return (
        <Section className='manage-ad-container'>
            <div className='user'>
                <img src={currentUser?.avatar || no_avatar} className='user__avatar' alt='' />
                <span className='fw-bold ms-2 fs-5'>{currentUser?.fullName}</span>
            </div>
            <Tabs>
                <TabList>
                    <Tab>Tin đang hiển thị ({statusCount.display})</Tab>
                    <Tab>Hết hạn ({statusCount.expired})</Tab>
                    <Tab>Bị từ chối ({statusCount.rejected})</Tab>
                    <Tab>Chờ duyệt ({statusCount.waiting})</Tab>
                    <Tab>Đã ẩn ({statusCount.hidden})</Tab>
                </TabList>

                <TabPanel>
                    <DisplayAds resetCount={resetCount} />
                </TabPanel>
                <TabPanel>
                    <ExpiredAds resetCount={resetCount} />
                </TabPanel>
                <TabPanel>
                    <RejectedAds />
                </TabPanel>
                <TabPanel>
                    <WaitingAds />
                </TabPanel>
                <TabPanel>
                    <HiddenAds resetCount={resetCount} />
                </TabPanel>
            </Tabs>
        </Section>
    )
}

export default ManageAd
