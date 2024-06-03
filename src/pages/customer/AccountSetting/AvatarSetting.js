import React, { useRef, useState, useEffect } from 'react'

import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'

import { changeAvatar } from '../../../services'
import noAvatar from '../../../assets/images/no_avatar.png'
import Section from '../../../components/customer/Section/Section'
import { changeUserAvatar } from '../../../redux/user/user.actions'

import './AvatarSetting.scss'
import { motion } from 'framer-motion'
import { fadeRight } from '../../../animation/fade'

const AvatarSetting = () => {
    const fileInput = useRef()
    const [avatar, setAvatar] = useState(noAvatar)
    const userAvatar = useSelector(state => state.user.currentUser?.avatar)
    const dispatch = useDispatch()
    useEffect(() => {
        if (userAvatar) setAvatar(userAvatar)
    }, [])

    const handleUpload = async e => {
        let allowType = ['image/jpeg', 'image/png', 'image/webp']
        let file = e.target.files[0]
        if (file) {
            if (allowType.includes(file.type)) {
                // upload
                let { data } = await changeAvatar(file)
                setAvatar(data.avatar)
                dispatch(changeUserAvatar(data.avatar))
            } else toast.error('Vui lòng chọn hình có định dạng ' + allowType.join(', '))
        }
    }
    return (
        <motion.div variants={fadeRight} initial='initial' whileInView={'animate'}>
            <Section className='avatar-container m-0'>
                <img className='img-rounded avatar' src={avatar} />
                <button onClick={() => fileInput.current.click()} className='btn btn-main mt-2'>
                    Đổi ảnh đại diện
                </button>
                <input ref={fileInput} type='file' onChange={handleUpload} hidden />
            </Section>
        </motion.div>
    )
}

export default AvatarSetting
