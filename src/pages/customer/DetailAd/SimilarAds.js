import React, { useLayoutEffect, useState } from 'react'
import Section from '../../../components/customer/Section/Section'
import { getSimilarAd } from '../../../services'
import './SimilarAds.scss'
import { gridAdCarouselConfigs } from '../../../components/carousel/carouselConfig'
import Slider from 'react-slick'
import AdCard from '../../../components/customer/AdCard/AdCard'
import { Link } from 'react-router-dom'
import AdNotFound from '../../../components/notfound/AdNotFound/AdNotFound'
import { motion } from 'framer-motion'
import { fadeDown, fadeUp } from '../../../animation'

const fadeUpAnimation = {}

const SimilarAds = ({ adId }) => {
    const [ads, setAds] = useState([])
    useLayoutEffect(() => {
        const fetchAd = async () => {
            let { data } = await getSimilarAd(adId)
            data = data?.filter(x => x.id !== +adId)
            setAds(data)
        }
        fetchAd()
    }, [adId])

    return (
        <motion.div variants={fadeUp} initial='initial' whileInView='animate'>
            <Section className='mt-4'>
                <div className='section-title'>Tin rao tương tự</div>
                {ads && ads.length > 0 ? (
                    <>
                        <Slider {...gridAdCarouselConfigs}>
                            {ads.map((item, index) => (
                                <div key={item.id}>
                                    <AdCard ad={item} />
                                </div>
                            ))}
                        </Slider>
                        <Link to={'/'} className='section-link'>
                            Xem tất cả
                        </Link>
                    </>
                ) : (
                    <AdNotFound />
                )}
            </Section>
        </motion.div>
    )
}

export default SimilarAds
