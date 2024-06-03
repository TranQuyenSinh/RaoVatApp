import React, { useState, useEffect } from 'react'

import Slider from 'react-slick'
import { useNavigate } from 'react-router-dom'

import Section from '../Section/Section'
import { getRootGenres, getGenreBySlug } from '../../../services'
import { genreCarouselConfigs } from '../../../components/carousel/carouselConfig'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './GenreGrid.scss'

export const GenreGrid = ({ genreSlug }) => {
    const [genres, setGenres] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchGenre = async () => {
            if (genreSlug) {
                let {
                    data: { childGenres },
                } = await getGenreBySlug(genreSlug)
                setGenres(childGenres)
            } else {
                let { data } = await getRootGenres()
                setGenres(data)
            }
        }
        fetchGenre()
    }, [genreSlug])

    return (
        <>
            {genres && genres.length > 0 && (
                <Section>
                    <div className='section-title'>Danh mục nổi bật</div>
                    <div className='section-content '>
                        <Slider {...genreCarouselConfigs} className='genres-container'>
                            {genres.map((item, index) => (
                                <div onClick={() => navigate('/' + item.slug)} key={item.id} className='genre-item'>
                                    <img src={item.image} alt='' />
                                    <div className='genre-title'>{item.title}</div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </Section>
            )}
        </>
    )
}
