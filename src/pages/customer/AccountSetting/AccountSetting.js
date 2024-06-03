import React, { useEffect, useRef, useState } from 'react'

import { useDispatch } from 'react-redux'

import Section from '../../../components/customer/Section/Section'
import { checkUserIsLoggedIn } from '../../../redux/user/user.actions'
import './AccountSetting.scss'
import AvatarSetting from './AvatarSetting'
import AccountInfo from './AccountInfo'
import ChangePassword from './ChangePassword'

const AccountSetting = () => {
    const dispatch = useDispatch()
    const tabs = useRef([
        { title: 'Thông tin cá nhân', component: <AccountInfo /> },
        { title: 'Mật khẩu', component: <ChangePassword /> },
    ]).current
    const [activeTab, setActiveTab] = useState(tabs[0].title)

    useEffect(() => {
        document.title = 'Rao vặt - Cài đặt tài khoản'
        dispatch(checkUserIsLoggedIn())
    }, [])

    return (
        <>
            <div className='settings-container'>
                <div className='settings-sidebar'>
                    <AvatarSetting />
                    <Section className='menu m-0'>
                        {tabs.map((item, index) => (
                            <span
                                key={index}
                                onClick={() => setActiveTab(item.title)}
                                className={`sidebar-item ${
                                    item.title == activeTab ? 'sidebar-item--selected' : undefined
                                }`}>
                                {item.title}
                            </span>
                        ))}
                    </Section>
                </div>
                <Section className={'settings-content'}>{tabs.find(t => t.title == activeTab).component}</Section>
            </div>
        </>
    )
}

export default AccountSetting
