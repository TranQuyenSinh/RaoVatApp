import React, { Fragment, useState, useEffect } from 'react'

import { Dropdown } from 'rsuite'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

import MenuIcon from '@rsuite/icons/Menu'

import { getAllGenres } from '../../../services'

import 'rsuite/dist/rsuite.css'

import './GenreDropdown.scss'
const GenreDropdown = () => {
    const [genres, setGenres] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        ;(async () => {
            try {
                let { data } = await getAllGenres()
                setGenres(data)
            } catch (e) {
                toast.error('Có lỗi xảy ra')
            }
        })()
    }, [])

    const navigateBySlug = (e, genreSlug) => {
        e.stopPropagation()
        navigate('/' + genreSlug)
    }

    return (
        <>
            <div className='category-dropdown-container'>
                <Dropdown menuStyle={{ borderRadius: 0 }} icon={<MenuIcon />} title='Danh mục' trigger='hover'>
                    {genres.map(item => (
                        <Fragment key={item.id}>
                            {item.childGenres?.length > 0 ? (
                                <Dropdown.Menu style={{ borderRadius: 0 }} title={item.title}>
                                    {item.childGenres.map(child => (
                                        <Dropdown.Item onClick={e => navigateBySlug(e, child.slug)} key={child.id}>
                                            {child.title}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            ) : (
                                <Dropdown.Item onClick={e => navigateBySlug(e, item.slug)}>{item.title}</Dropdown.Item>
                            )}
                        </Fragment>
                    ))}
                </Dropdown>
            </div>
            {/* <div className='category-dropdown-container'>
                <div className='dropdown-btn'>
                    <FontAwesomeIcon icon={faBars} />
                    <span className='mx-2'>Danh mục</span>
                    <FontAwesomeIcon icon={faChevronDown} />
                </div>

                <ul className='dropdown-list custom-menu'>
                    <li>
                        <Link to='/counter'>Xe cộ</Link>
                    </li>
                    <li>
                        <Link to='/'>Đồ điện tử</Link>
                    </li>
                    <li>
                        <Link to='/'>Thiết bị di động</Link>
                    </li>
                </ul>
            </div> */}
        </>
    )
}

export default GenreDropdown
