import React, { useState } from 'react'
import Slider from 'react-slick'
import { adImagesCarouselConfigs } from '@components/carousel/carouselConfig'
import CustomLightBox from '@components/customer/CustomLightBox/CustomLightBox'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './ImageSlider.scss'
const ImageSlider = ({ images }) => {
    const [isOpenLightBox, setIsOpenLightBox] = useState(false)
    const [photoIndex, setPhotoIndex] = useState(0)

    const toggleLightBox = () => {
        setIsOpenLightBox(!isOpenLightBox)
    }
    const handleShowLightBox = index => {
        setPhotoIndex(index)
        toggleLightBox()
    }

    return (
        <>
            <Slider className='ad-img-slider' {...adImagesCarouselConfigs}>
                {images.map((item, index) => (
                    <div className='slider-item' key={index}>
                        <img onClick={() => handleShowLightBox(index)} src={item} alt='' />
                    </div>
                ))}
            </Slider>
            <CustomLightBox
                images={images}
                photoIndex={photoIndex}
                setPhotoIndex={setPhotoIndex}
                isOpen={isOpenLightBox}
                toggle={toggleLightBox}
            />
        </>
    )
}

export default ImageSlider
