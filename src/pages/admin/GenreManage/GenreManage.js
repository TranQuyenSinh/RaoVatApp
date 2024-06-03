import Section from '@components/admin/Section/Section'
import React, { useEffect, useRef, useState } from 'react'
import { setNavbarTitle } from '@components/admin/Navbar/Navbar'
import './GenreManage.scss'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeIn, fadeUpCustom } from '@animation/fade'
import { tapAnimation } from '@animation/button'
import { createGenre, getRootGenres } from '@services/genre'
import AddGenreModal from './AddGenreModal'
import useModal from '@hooks/useModal'

const GenreManage = () => {
    const [genres, setGenres] = useState([])
    const [filteredGenres, setFilteredGenres] = useState([])

    const [isOpen, toggle] = useModal()
    const [searchKey, setSearchKey] = useState('')

    const navigate = useNavigate()

    const fetchData = async () => {
        let { data } = await getRootGenres()
        setGenres(data)
    }

    useEffect(() => {
        setNavbarTitle.value = 'Quản lý danh mục'
        fetchData()
    }, [])

    useEffect(() => {
        let filteredGenres = genres
        if (searchKey) {
            filteredGenres = genres.filter(g => g.title.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1)
        }
        setFilteredGenres(filteredGenres)
    }, [searchKey, genres])

    const handleCreateGenre = async data => {
        try {
            await createGenre(data)
            toggle()
            fetchData()
        } catch (e) {
            console.log('Có lỗi xảy ra, vui lòng thử lại!')
        }
    }

    return (
        <>
            <motion.div variants={fadeIn} initial='initial' animate='animate' exit='exit' viewport={{ once: true }}>
                <Section className={'genre-manage-container'}>
                    <div className='d-flex gap-3 align-items-center'>
                        <motion.div
                            onClick={toggle}
                            variants={tapAnimation}
                            whileTap={'animate'}
                            className='btn btn-main'>
                            <i className='fa-solid fa-plus me-2'></i>
                            Thêm mới
                        </motion.div>
                        <input
                            type='text'
                            value={searchKey}
                            onChange={e => setSearchKey(e.target.value)}
                            className='form-control w-25'
                            placeholder='Tìm kiếm'
                        />
                    </div>
                    <div className='list w-100 mt-4'>
                        {filteredGenres?.map((item, index) => (
                            <motion.div
                                variants={fadeUpCustom}
                                viewport={{ once: true }}
                                custom={index}
                                onClick={() => navigate('/admin/genres/' + item.id)}
                                key={item.id}
                                className='item'>
                                <img className='item-img' src={item.image} width={100} height={100} alt='' />
                                <div className='item-title'>{item.title}</div>
                            </motion.div>
                        ))}
                    </div>
                </Section>
            </motion.div>
            <AddGenreModal isOpen={isOpen} toggle={toggle} onSubmit={handleCreateGenre} />
        </>
    )
}

export default GenreManage
