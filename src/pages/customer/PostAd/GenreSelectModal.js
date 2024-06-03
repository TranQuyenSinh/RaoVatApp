import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import { getAllGenres } from '../../../services'
import '../../../styles/_mixin.scss'
import './GenreSelectModal.scss'

const GenreSelectModal = ({ isOpen, toggle, onSubmit }) => {
    const [genres, setGenres] = useState([])
    const [selectedParentGenre, setselectedParentGenre] = useState()
    const [selectedChildGenre, setSelectedChildGenre] = useState()

    useEffect(() => {
        const fetchGenres = async () => {
            let { data } = await getAllGenres()
            setGenres(data)
        }
        fetchGenres()
    }, [])

    useEffect(() => {
        if (isOpen === true) {
            setselectedParentGenre()
            setSelectedChildGenre()
        }
    }, [isOpen])

    const handleSelectParentGenre = genre => {
        setselectedParentGenre(genre)
    }

    const handleSelectChildGenre = genre => {
        setSelectedChildGenre(genre)
        toggle()
        onSubmit([selectedParentGenre, genre])
    }

    return (
        <Modal scrollable isOpen={isOpen} toggle={toggle} centered className='genre-modal'>
            <ModalHeader>
                <strong>Chọn danh mục sản phẩm</strong>
                <span>
                    <button onClick={toggle} className='btn btn-close'></button>
                </span>
            </ModalHeader>
            <ModalBody>
                {genres.length > 0 &&
                    !selectedParentGenre &&
                    genres.map((item, index) => (
                        <div onClick={() => handleSelectParentGenre(item)} className='genre-item' key={item.id}>
                            <span>{item.title}</span>
                            <i className='fa-solid fa-chevron-right'></i>
                        </div>
                    ))}
                {selectedParentGenre &&
                    selectedParentGenre.childGenres?.map((item, index) => (
                        <div onClick={() => handleSelectChildGenre(item)} className='genre-item' key={item.id}>
                            <span>{item.title}</span>
                            <i className='fa-solid fa-chevron-right'></i>
                        </div>
                    ))}
            </ModalBody>
        </Modal>
    )
}

export default GenreSelectModal
