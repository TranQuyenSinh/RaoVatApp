import React, { useEffect, useState } from 'react'
import Section from '../../../components/customer/Section/Section'
import CustomCarousel from '../../../components/customer/Carousel/CustomCarousel'
import { GenreGrid } from '../../../components/customer/GenreGrid/GenreGrid'
import LocationSelect from '../../../components/customer/LocationSelect/LocationSelect'

import { useSelector } from 'react-redux'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import GridAd from '../../../components/customer/AdCard/GridAd'
import { getLatestCardAds } from '../../../services'

import { useParams } from 'react-router-dom'

export const SpecifyGenre = () => {
    const [latestAds, setLatestAds] = useState([])
    const [index, setIndex] = useState(0)

    const { currentLocation } = useSelector(state => state.app)
    const { genreSlug } = useParams()

    const fetchMoreAds = async () => {
        if (index !== -1) {
            let { data } = await getLatestCardAds(index, currentLocation, genreSlug)
            if (data && data.length > 0) {
                index === 0 ? setLatestAds(data) : setLatestAds([...latestAds, ...data])
            } else {
                // Hết data
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
    }, [currentLocation, genreSlug])

    return (
        <>
            <Section className='p-0'>
                <div className='section-content'>
                    <LocationSelect />
                </div>
            </Section>
            <Section>
                <div className='section-content'>
                    <CustomCarousel id='top-carousel' />
                </div>
            </Section>
            <GenreGrid genreSlug={genreSlug} />
            <Section>
                <div className='section-title'>Tin đăng mới</div>
                <div className='section-content '>
                    <GridAd data={latestAds} />
                </div>
                {index !== -1 && (
                    <div onClick={() => setIndex(index + 1)} className='section-link'>
                        Xem thêm
                    </div>
                )}
            </Section>
        </>
    )
}
