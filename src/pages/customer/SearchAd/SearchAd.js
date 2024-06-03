import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import './SearchAd.scss'
import FilterBar from './FilterBar'
import Section from '../../../components/customer/Section/Section'
import { formatNumber, moment } from '../../../utils'
import { searchAd } from '../../../services'
import { useSelector } from 'react-redux'
import CustomPaginate from '@components/pagination/CustomPaginate'
import { saveAdToFavorite } from '../../../services'
import { toast } from 'react-toastify'
import SearchNotFound from '../../../components/notfound/AdNotFound/SearchNotFound'
import CustomBadge from '../../../components/badge/CustomBadge'

const SearchAd = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const keyword = searchParams?.get('q') || ''
    const [filter, setFilter] = useState()
    const { currentLocation } = useSelector(state => state.app)
    const { isLoggedIn, currentUser } = useSelector(state => state.user)
    const [currentPage, setCurrentPage] = useState(0)
    const [totalItems, setTotalItems] = useState(0)
    const navigate = useNavigate()

    const [ads, setAds] = useState([])

    const searchProduct = async () => {
        let search
        if (filter) {
            let { genres, prices, order } = filter
            search = { keyword, prices, location: currentLocation, order, genres }
        } else {
            search = { keyword, location: currentLocation }
        }
        let {
            data: { data, totalCount },
        } = await searchAd(search, currentPage, currentUser?.id)
        setTotalItems(totalCount)
        setAds(data)
    }

    const handleFilter = filter => {
        setFilter(filter)
    }

    const handleSaveAd = async (e, item, isFavorite) => {
        e.stopPropagation()
        if (!isLoggedIn) {
            navigate('/login')
            return
        }
        try {
            await saveAdToFavorite(item.id)
            const index = ads.findIndex(ad => ad.id === item.id)
            const cpyAds = [...ads]
            cpyAds[index].isFavorite = isFavorite
            setAds(cpyAds)
            toast.success(isFavorite ? 'Đã lưu tin' : 'Đã bỏ lưu tin')
        } catch (e) {
            toast.error('Có lỗi xảy ra, vui lòng thử lại')
        }
    }

    useEffect(() => {
        setCurrentPage(0)
    }, [filter, keyword])

    useEffect(() => {
        searchProduct()
        window.scrollTo(0, 0)
    }, [filter, currentLocation, currentPage, keyword])

    useEffect(() => {
        document.title = 'Tìm kiếm: ' + keyword
    }, [keyword])

    return (
        <>
            <FilterBar onSubmit={handleFilter} />
            {ads?.length > 0 && (
                <>
                    <div className='search-container'>
                        <div className='mt-2 mb-3 fw-bold'>Tìm kiếm với từ khóa: {keyword}</div>
                        <Section className='search-list-container'>
                            {ads?.length > 0 &&
                                ads?.map(item => (
                                    <div
                                        key={item.id}
                                        className='product-item'
                                        onClick={() => navigate('/tin-dang/' + item.id)}>
                                        <div className='product-image-wrapper'>
                                            <img src={item.thumbnail} />
                                            {item.status ? (
                                                <CustomBadge type='success'>Mới</CustomBadge>
                                            ) : (
                                                <CustomBadge type='warning'>Đã sử dụng</CustomBadge>
                                            )}
                                        </div>
                                        <div className='product-info'>
                                            <div className='top'>
                                                <div className='title'>
                                                    <span>{item.title}</span>
                                                </div>
                                                <div className='price'>{formatNumber(item.price)}</div>
                                            </div>
                                            <div className='bottom'>
                                                <div className='location'>
                                                    <i className='fa-regular fa-clock me-2'></i>
                                                    {moment(item.createdAt).fromNow()} . {item.district} -{' '}
                                                    {item.province}
                                                </div>
                                                <i
                                                    onClick={e => handleSaveAd(e, item, !item.isFavorite)}
                                                    className={
                                                        item.isFavorite
                                                            ? 'fa-solid fa-heart favorite-icon'
                                                            : 'fa-regular fa-heart favorite-icon'
                                                    }></i>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            {ads?.length == 0 && <SearchNotFound className={'py-5'} />}
                        </Section>

                        <CustomPaginate
                            totalItems={totalItems}
                            itemsPerPage={10}
                            onChange={pageNum => setCurrentPage(pageNum)}
                        />
                    </div>
                </>
            )}
        </>
    )
}

export default SearchAd
