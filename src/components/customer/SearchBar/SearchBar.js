import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faClock } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { axios } from '../../../axios'
import './SearchBar.scss'

import { motion, AnimatePresence } from 'framer-motion'

const fadeDown = {
    initial: {
        y: -30,
        opacity: 0,
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: { type: 'tween', duration: 0.3 },
    },
    exit: {
        y: 50,
        opacity: 0,
    },
}

const SearchBar = () => {
    const [isShowRecentSearch, setIsShowRecentSearch] = useState(false)
    const [searchInput, setSearchInput] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const navigate = useNavigate()

    const handleSearch = e => {
        if (e.keyCode === 13) {
            navigate(`search?q=${searchInput}`)
        }
    }

    return (
        <div className='searchbar-container'>
            <div
                onFocus={() => setIsShowRecentSearch(true)}
                onBlur={() => setTimeout(() => setIsShowRecentSearch(false), 100)}
                className='searchbar'>
                <input
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value)}
                    onKeyDown={handleSearch}
                    autoComplete='off'
                    type='search'
                    placeholder='Tìm kiếm sản phẩm'
                />
                <div onClick={() => navigate(`search?q=${searchInput}`)} className='searchbar--btn'>
                    <FontAwesomeIcon icon={faSearch} />
                </div>
                <AnimatePresence>
                    {isShowRecentSearch && (
                        <motion.div
                            variants={fadeDown}
                            exit='exit'
                            initial='initial'
                            whileInView='animate'
                            className='recent-search'>
                            {searchInput ? (
                                <>
                                    <Link to={`search?q=${searchInput}`} className='recent-search__item'>
                                        Tìm kiếm từ khóa "{searchInput}"
                                    </Link>

                                    {searchResult &&
                                        searchResult.length > 0 &&
                                        searchResult.map((item, index) => (
                                            <Link key={item.id} to='/' className='recent-search__item'>
                                                {item.typeName}
                                            </Link>
                                        ))}
                                </>
                            ) : (
                                <>
                                    <div className='recent-search__header'>
                                        <FontAwesomeIcon className='me-2' icon={faClock} />
                                        <strong>Tìm kiếm gần đây</strong>
                                    </div>
                                    <Link to={`search?q=sach`} className='recent-search__item'>
                                        Sách
                                    </Link>
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default SearchBar
