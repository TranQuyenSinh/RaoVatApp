import React, { useEffect, useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { getAllLocations } from '../../../services'
import { useDispatch, useSelector } from 'react-redux'
import CustomRadio from '../../input/CustomRadio/CustomRadio'
import { changeCustomerLocation } from '../../../redux/app/app.actions'
import './LocationSelectModal.scss'

const LocationSelectModal = ({ isOpen, toggle }) => {
    const currentLocation = useSelector(state => state.app.currentLocation)
    const [allProvinces, setAllProvinces] = useState()
    const [selectedLocation, setSelectedLocation] = useState()
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchAllProvinces = async () => {
            let allProvinces = await getAllLocations()
            allProvinces = ['Toàn quốc', ...allProvinces]
            setAllProvinces(allProvinces)
        }

        fetchAllProvinces()
    }, [])

    const handleChangeLocation = () => {
        dispatch(changeCustomerLocation(selectedLocation))
        toggle()
    }

    return (
        <Modal scrollable isOpen={isOpen} toggle={toggle} centered className='location-modal'>
            <ModalHeader>
                <strong>Chọn tỉnh, thành phố</strong>
                <span>
                    <button onClick={toggle} className='btn btn-close'></button>
                </span>
            </ModalHeader>
            <ModalBody>
                {allProvinces &&
                    allProvinces.map((item, index) => (
                        <CustomRadio onClick={() => setSelectedLocation(item)} name='provinceCode' key={index}>
                            {item}
                        </CustomRadio>
                    ))}
            </ModalBody>
            <ModalFooter>
                <div className='btn btn-main w-100' onClick={handleChangeLocation}>
                    Xác nhận
                </div>
            </ModalFooter>
        </Modal>
    )
}

export default LocationSelectModal
