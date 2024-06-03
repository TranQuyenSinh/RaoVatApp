import React, { useState, useEffect } from 'react'

import { useSelector } from 'react-redux'

import { getLatestCardAds } from '@services/ad'
import GridAd from '@components/customer/AdCard/GridAd'
import Section from '@components/customer/Section/Section'
import { GenreGrid } from '@components/customer/GenreGrid/GenreGrid'
import CustomCarousel from '@components/customer/Carousel/CustomCarousel'
import LocationSelect from '@components/customer/LocationSelect/LocationSelect'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Home = () => {
    const [latestAds, setLatestAds] = useState([])
    const [index, setIndex] = useState(0)

    const { currentLocation } = useSelector(state => state.app)

    useEffect(() => {
        document.title = 'Rao vặt - Website mua bán, đăng tin rao'
    }, [])

    const fetchMoreAds = async () => {
        if (index !== -1) {
            let { data } = await getLatestCardAds(index, currentLocation)
            if (data && data?.length > 0) {
                index === 0 ? setLatestAds(data) : setLatestAds([...latestAds, ...data])
            } else {
                setIndex(-1)
                index === 0 && setLatestAds([])
            }
        }
    }

    useEffect(() => {
        fetchMoreAds()
    }, [index])

    useEffect(() => {
        if (index === 0) fetchMoreAds()
        else setIndex(0)
    }, [currentLocation])

    const loadMoreAd = () => {
        setIndex(index + 1)
    }

    return (
        <>
            <Section className='p-0'>
                <div className='section-content'>
                    <LocationSelect />
                </div>
            </Section>
            <Section>
                <div className='section-content'>
                    <CustomCarousel />
                </div>
            </Section>
            <GenreGrid />
            <Section>
                <div className='section-title'>Tin đăng mới</div>
                <div className='section-content '>
                    <GridAd data={latestAds} />
                </div>
                {index !== -1 && (
                    <div onClick={loadMoreAd} className='section-link'>
                        Xem thêm
                    </div>
                )}
            </Section>
        </>
    )
}

export default Home
