import React, { useState } from 'react'
import { useEffect } from 'react'
import Lightbox from 'react-18-image-lightbox'
import 'react-18-image-lightbox/style.css'

const CustomLightBox = ({ images, photoIndex, setPhotoIndex, isOpen, toggle }) => {
    return (
        <>
            {isOpen && (
                <Lightbox
                    mainSrc={images[photoIndex]}
                    nextSrc={images[(photoIndex + 1) % images.length]}
                    prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                    onCloseRequest={toggle}
                    onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
                    onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
                />
            )}
        </>
    )
}

export default CustomLightBox
