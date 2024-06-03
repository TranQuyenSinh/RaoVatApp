import { NextArrow, PrevArrow, NextSquareArrow, PrevSquareArrow } from './CarouselArrows'
import './carouselCustom.scss'

export const genreCarouselConfigs = {
    dots: false,
    infinite: false,
    speed: 800,
    slidesToShow: 1,
    rows: 2,
    slidesPerRow: 7,
    slidesToScroll: 1,
    draggable: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
}

export const adImagesCarouselConfigs = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    dotsClass: 'slick-dots',
    nextArrow: <NextSquareArrow />,
    prevArrow: <PrevSquareArrow />,
}

export const gridAdCarouselConfigs = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 4,
    draggable: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
}
