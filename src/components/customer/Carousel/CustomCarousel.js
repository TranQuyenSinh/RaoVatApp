import { useEffect, useLayoutEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getDisplayBanners } from '@services/banner'
import { toast } from 'react-toastify'
import './CustomCarousel.scss'
import { useNavigate } from 'react-router-dom'

const slideVariants = {
    initial: {
        opacity: 0,
        transition: {
            duration: 0.5,
        },
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.5,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.5,
        },
    },
}

const dotsVariants = {
    initial: {
        scale: 1,
    },
    animate: {
        scale: 1.2,
    },
    hover: {
        scale: 1.1,
        transition: { duration: 0.2 },
    },
}

const CustomCarousel = () => {
    const [banners, setBanners] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const navigate = useNavigate()

    const fetchBanner = async () => {
        try {
            let { data } = await getDisplayBanners()
            setBanners(data)
        } catch (e) {
            toast.error('Load banner thất bại')
        }
    }
    useEffect(() => {
        fetchBanner()
    }, [])

    const handleNext = () => {
        setCurrentIndex(prevIndex => (prevIndex + 1 === banners?.length ? 0 : prevIndex + 1))
    }

    const handlePrevious = () => {
        setCurrentIndex(prevIndex => (prevIndex - 1 < 0 ? banners?.length - 1 : prevIndex - 1))
    }

    const handleDotClick = index => {
        setCurrentIndex(index)
    }

    return (
        <div className='custom-carousel'>
            <div className='carousel-images'>
                <AnimatePresence mode='popLayout'>
                    <motion.a
                        href={banners[currentIndex]?.url}
                        target='_blank'
                        key={currentIndex}
                        initial='initial'
                        animate='animate'
                        exit='exit'
                        variants={slideVariants}>
                        <img src={banners[currentIndex]?.image} alt='' />
                    </motion.a>
                </AnimatePresence>
                <div className='slide_direction'>
                    <motion.div className='left' onClick={handlePrevious}>
                        <svg xmlns='http://www.w3.org/2000/svg' height='20' viewBox='0 96 960 960' width='20'>
                            <path d='M400 976 0 576l400-400 56 57-343 343 343 343-56 57Z' />
                        </svg>
                    </motion.div>
                    <motion.div className='right' onClick={handleNext}>
                        <svg xmlns='http://www.w3.org/2000/svg' height='20' viewBox='0 96 960 960' width='20'>
                            <path d='m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z' />
                        </svg>
                    </motion.div>
                </div>
            </div>
            <div className='carousel-indicator'>
                {banners?.length > 0 &&
                    banners?.map((item, index) => (
                        <motion.div
                            key={index}
                            className={`dot ${currentIndex === index ? 'active' : ''}`}
                            onClick={() => handleDotClick(index)}
                            initial='initial'
                            animate={currentIndex === index ? 'animate' : ''}
                            whileHover='hover'
                            variants={dotsVariants}></motion.div>
                    ))}
            </div>
        </div>
    )
}
export default CustomCarousel
