import React, { useState } from 'react'
import { faLocation, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector, useDispatch } from 'react-redux'
import LocationSelectModal from './LocationSelectModal'
import './LocationSelect.scss'

const LocationSelect = () => {
    const [isOpenModal, setIsOpenModal] = useState(false)

    const toggle = () => {
        setIsOpenModal(!isOpenModal)
    }

    const dispatch = useDispatch()
    const { currentLocation } = useSelector(state => state.app)
    return (
        <>
            <div onClick={toggle} className='location-select-container'>
                <div className='left'>
                    <FontAwesomeIcon className='me-2' icon={faLocation} />
                    <strong>
                        Vị trí của bạn:<> </>
                        <span className='text-main'>{currentLocation}</span>
                    </strong>
                </div>
                <div className='right'>
                    <FontAwesomeIcon icon={faCaretDown} />
                </div>
            </div>

            <LocationSelectModal isOpen={isOpenModal} toggle={toggle} />
        </>
    )
}

export default LocationSelect
