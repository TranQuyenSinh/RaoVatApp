import React, { useEffect, useState } from 'react'
import './FilterBar.scss'
import LocationSelectModal from '../../../components/customer/LocationSelect/LocationSelectModal'
import { useSelector } from 'react-redux'
import GenreSelectModal from '../PostAd/GenreSelectModal'
import SelectPriceModal from './SelectPriceModal'
import { formatNumber } from '../../../utils'
import SelectOrderModal from './SelectOrderModal'

const FilterBar = ({ onSubmit }) => {
    const [filter, setFilter] = useState({
        genres: undefined,
        order: undefined,
        prices: undefined,
    })

    const [isOpenLocationModal, setIsOpenLocationModal] = useState(false)
    const [isOpenGenreModal, setIsOpenGenreModal] = useState(false)
    const [isOpenPriceModal, setIsOpenPriceModal] = useState(false)
    const [isOpenOrderModal, setIsOpenOrderModal] = useState(false)

    const { currentLocation } = useSelector(state => state.app)

    const toggleLocationModal = () => {
        setIsOpenLocationModal(!isOpenLocationModal)
    }
    const toggleGenreModal = () => {
        setIsOpenGenreModal(!isOpenGenreModal)
    }
    const togglePriceModal = () => {
        setIsOpenPriceModal(!isOpenPriceModal)
    }
    const toggleOrderModal = () => {
        setIsOpenOrderModal(!isOpenOrderModal)
    }

    const handleRemoveFilter = (e, type) => {
        e.stopPropagation()
        setFilter({
            ...filter,
            [type]: undefined,
        })
    }

    const handleSubmit = () => {
        let submitData = {
            ...filter,
            genres: filter.genres?.map(item => item.id),
            order: filter.order?.value,
        }
        onSubmit(submitData)
    }
    return (
        <>
            <div className='filter-container'>
                <div onClick={toggleOrderModal} className='btn btn-filter'>
                    {filter?.order ? (
                        <>
                            <i className={filter.order.icon}></i>
                            <span>{filter.order.title}</span>
                            <i onClick={e => handleRemoveFilter(e, 'order')} className='fa-solid fa-xmark'></i>
                        </>
                    ) : (
                        <>
                            <i className='fa-solid fa-filter'></i>
                            <span>Lọc</span>
                            <i className='fa-solid fa-caret-down'></i>
                        </>
                    )}
                </div>
                <div onClick={toggleLocationModal} className='btn btn-filter'>
                    <i className='fa-solid fa-location-dot'></i>
                    <span>{currentLocation}</span>
                    <i className='fa-solid fa-caret-down'></i>
                </div>
                <div onClick={toggleGenreModal} className='btn btn-filter'>
                    {filter?.genres ? (
                        <>
                            <span>{filter.genres.map(item => item.title).join(', ')}</span>
                            <i onClick={e => handleRemoveFilter(e, 'genres')} className='fa-solid fa-xmark'></i>
                        </>
                    ) : (
                        <>
                            <span>Tất cả danh mục</span>
                            <i className='fa-solid fa-caret-down'></i>
                        </>
                    )}
                </div>
                <div onClick={togglePriceModal} className='btn btn-filter'>
                    {filter?.prices ? (
                        <>
                            <span>
                                {formatNumber(filter.prices[0])} - {formatNumber(filter?.prices[1])} đ
                            </span>
                            <i onClick={e => handleRemoveFilter(e, 'prices')} className='fa-solid fa-xmark'></i>
                        </>
                    ) : (
                        <>
                            <span>Giá</span>
                            <i className='fa-solid fa-caret-down'></i>
                        </>
                    )}
                </div>
                <div onClick={handleSubmit} className='btn btn-main btn-filter border-0'>
                    <span>Lọc kết quả</span>
                </div>
            </div>

            <LocationSelectModal isOpen={isOpenLocationModal} toggle={toggleLocationModal} />
            <GenreSelectModal
                isOpen={isOpenGenreModal}
                toggle={toggleGenreModal}
                onSubmit={genres => setFilter({ ...filter, genres })}
            />
            <SelectPriceModal
                isOpen={isOpenPriceModal}
                toggle={togglePriceModal}
                onSubmit={prices => setFilter({ ...filter, prices })}
            />
            <SelectOrderModal
                isOpen={isOpenOrderModal}
                toggle={toggleOrderModal}
                onSubmit={order => setFilter({ ...filter, order })}
            />
        </>
    )
}

export default FilterBar
