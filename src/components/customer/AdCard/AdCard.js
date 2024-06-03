import React from 'react'
import { formatNumber } from '../../../utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import './AdCard.scss'

const AdCard = ({ ad }) => {
    return (
        <>
            {ad && (
                <div className='adcard w-100'>
                    <Link to={`/tin-dang/${ad.id}`} className='adcard__wrapper'>
                        <div className='adcard__image' style={{ backgroundImage: `url(${ad.thumbnail})` }}></div>
                        <div className='adcard__content'>
                            <div className='adcard__content--title'>{ad.title}</div>
                            <div className='adcard__content--price'>{formatNumber(ad.price)}</div>
                        </div>
                        <div className='adcard__footer'>
                            <FontAwesomeIcon icon={faLocationDot} size='sm' className='me-1' />
                            <span>{ad.district}</span>
                        </div>
                    </Link>
                </div>
            )}
        </>
    )
}

export default AdCard
