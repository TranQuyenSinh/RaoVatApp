import React, { useState } from 'react'
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import './AddressSelectModal.scss'
import FloatingSelect from '../../input/CustomSelect/FloatingSelect'
import FloatingInput from '../../input/CustomInput/FloatingInput'
import { useLocation } from '../../../hooks/useLocation'
import { toast } from 'react-toastify'

const AddressSelect = ({ address, errorMessage, className, ...props }) => {
    return (
        <div className='mb-3'>
            <div className={`address-select ${className} ${errorMessage ? 'border-danger' : undefined}`} {...props}>
                <span className={!address ? 'text-muted' : undefined}>
                    {address && address.province && address.district && address.ward && address.address ? (
                        `${address.address}, ${address.ward}, ${address.district}, ${address.province}`
                    ) : (
                        <>
                            Địa chỉ<span className='text-danger'> *</span>
                        </>
                    )}
                </span>
                <span>
                    <i className={` fa-solid fa-chevron-right`}></i>
                </span>
            </div>
            {errorMessage && <div className='invalid-feedback'>{errorMessage}.</div>}
        </div>
    )
}

const AddressSelectModal = ({ isOpen, toggle, onSubmit }) => {
    const [provinces, fetchDistricts, fetchWards] = useLocation()
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])

    const [selected, setSelected] = useState({
        province: null,
        district: null,
        ward: null,
        address: '',
    })

    const handleChangeProvince = async e => {
        let pCode = +e.target.value
        let province = provinces.find(p => p.code === pCode)

        let districts = await fetchDistricts(pCode)
        setSelected({
            ...selected,
            province: province,
            district: null,
            ward: null,
        })
        setDistricts(districts)
        setWards([])
    }

    const handleChangeDistrict = async e => {
        let dCode = +e.target.value
        let district = districts.find(d => d.code === dCode)

        let wards = (await fetchWards(dCode)) || []
        setSelected({
            ...selected,
            district: district,
            ward: null,
        })
        setWards(wards)
    }

    const handleChangeWard = async e => {
        let wCode = +e.target.value
        let ward = wards.find(w => w.code === wCode)
        setSelected({
            ...selected,
            ward: ward,
        })
    }

    const handleSubmit = () => {
        if (!validate()) {
            toast.error('Vui lòng chọn đầy đủ thông tin')
            return
        }
        let { province, district, ward, address } = selected
        let data = {
            province: province.name,
            district: district.name,
            ward: ward.name,
            address,
        }
        onSubmit(data)
        toggle()
    }

    const validate = () => {
        for (var item in selected) {
            if (!selected[item]) return false
        }
        return true
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle} className='address-modal'>
            <ModalHeader>
                <strong>Địa chỉ</strong>
                <span>
                    <button onClick={toggle} className='btn btn-close'></button>
                </span>
            </ModalHeader>
            <ModalBody>
                {/* Province */}
                <div className='form-group mb-3'>
                    <FloatingSelect
                        className={'select-container'}
                        placeholder={'Chọn Tỉnh, Thành phố'}
                        label={'Tỉnh, Thành phố'}
                        value={selected.province?.code}
                        onChange={handleChangeProvince}>
                        {provinces?.length > 0 &&
                            provinces.map(p => (
                                <option key={p.code} value={p.code}>
                                    {p.name}
                                </option>
                            ))}
                    </FloatingSelect>
                </div>

                {/* District */}
                <div className='form-group mb-3'>
                    <FloatingSelect
                        className={'select-container'}
                        placeholder={'Chọn Quận, Huyện, Thị xã'}
                        label={'Quận, Huyện, Thị xã'}
                        value={selected.district?.code}
                        onChange={handleChangeDistrict}
                        disabled={districts.length <= 0}>
                        {districts?.length > 0 &&
                            districts.map(d => (
                                <option key={d.code} value={d.code}>
                                    {d.name}
                                </option>
                            ))}
                    </FloatingSelect>
                </div>

                {/* Ward */}
                <div className='form-group mb-3'>
                    <FloatingSelect
                        className={'select-container'}
                        placeholder={'Chọn phường'}
                        label={'Phường'}
                        value={selected.ward?.code}
                        onChange={handleChangeWard}
                        disabled={wards.length <= 0}>
                        {wards?.length > 0 &&
                            wards.map(w => (
                                <option key={w.code} value={w.code}>
                                    {w.name}
                                </option>
                            ))}
                    </FloatingSelect>
                </div>
                <div className='form-group'>
                    <FloatingInput
                        value={selected.address}
                        onChange={e =>
                            setSelected({
                                ...selected,
                                address: e.target.value,
                            })
                        }
                        className='input-container'
                        label={'Địa chỉ cụ thể'}
                    />
                </div>
            </ModalBody>
            <ModalFooter>
                <div onClick={handleSubmit} className='btn btn-main text-uppercase w-100'>
                    Xong
                </div>
            </ModalFooter>
        </Modal>
    )
}

export { AddressSelect, AddressSelectModal }
