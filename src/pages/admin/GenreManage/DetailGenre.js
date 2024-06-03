import Section from '@components/admin/Section/Section'
import React, { useEffect, useRef, useState } from 'react'
import { setNavbarTitle } from '@components/admin/Navbar/Navbar'
import './GenreManage.scss'
import testimg from '@assets/images/test.png'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeIn, fadeUpCustom } from '@animation/fade'
import FloatingInput from '@components/input/CustomInput/FloatingInput'
import FloatingTextArea from '@components/input/CustomInput/FloatingTextArea'
import { AnimationButton, tapAnimation } from '@animation/button'
import placeholder_image from '@assets/images/placeholder_image.png'
import { createGenre, deleteGenre, getGenreById, saveEditGenre } from '@services/genre'
import { toast } from 'react-toastify'
import ConfirmModal from '@pages/customer/ManageAd/ConfirmModal'
import useModal from '@hooks/useModal'
import AddGenreModal from './AddGenreModal'
import EditChildGenreModal from './EditChildGenreModal'

const DetailGenre = () => {
    const fileInputRef = useRef()

    const [isOpenConfirmModal, toggleConfirmModal] = useModal()
    const [isOpenAddGenreModal, toggleAddGenreModal] = useModal()

    const [isOpenEditGenreModal, toggleEditGenreModal] = useModal()
    const [editChildGenre, setEditChildGenre] = useState()

    const navigate = useNavigate()
    const { genreId } = useParams()
    const [genre, setGenre] = useState()
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: undefined,
    })

    const fetchData = async () => {
        try {
            let { data } = await getGenreById(genreId)
            setGenre(data)
            setFormData({
                title: data.title,
                description: data.description,
                image: {
                    url: data.image,
                },
            })
            setNavbarTitle.value = data.title
        } catch (e) {
            toast.error('Có lỗi xảy ra, vui lòng thử lại')
            navigate(-1)
        }
    }

    useEffect(() => {
        fetchData()
    }, [genreId])

    const handleChangeInput = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleInputFileChange = e => {
        let allowType = ['image/jpeg', 'image/png', 'image/webp']
        let file = e.target.files[0]
        if (file)
            if (allowType.includes(file.type)) {
                URL.revokeObjectURL(formData?.image?.url)
                setFormData({
                    ...formData,
                    image: {
                        url: URL.createObjectURL(file),
                        file: file,
                    },
                })
            } else {
                toast.error('Vui lòng chọn hình có định dạng ' + allowType.join(', '))
            }
    }

    const handleDelete = async () => {
        try {
            await deleteGenre(genreId)
            toast.success('Xóa thành công')
            navigate('/admin/genres')
        } catch (e) {
            toast.error('Không thể xóa, có lỗi xảy ra!')
        }
    }

    const handleDeleteChild = async genreId => {
        if (window.confirm('Bạn có chắc muốn xóa danh mục này?')) {
            try {
                await deleteGenre(genreId)
                toast.success('Xóa thành công')
                fetchData()
            } catch (e) {
                toast.error('Không thể xóa, có lỗi xảy ra!')
            }
        }
    }

    const handleCreateChildGenre = async data => {
        try {
            await createGenre({ ...data, parentId: genreId })
            toggleAddGenreModal()
            fetchData()
        } catch (e) {
            toast.error('Không thể xóa, có lỗi xảy ra!')
        }
    }

    const handleEditChildGenre = async data => {
        try {
            await saveEditGenre(data)
            toggleEditGenreModal()
            fetchData()
        } catch (e) {
            toast.error('Lưu thất bại, có lỗi xảy ra!')
        }
    }

    const handleSubmit = async () => {
        try {
            let { title, description, image } = formData
            await saveEditGenre({ id: genreId, title, description, image: image.file })
            toast.success('Lưu thảnh công')
        } catch (e) {
            toast.error('Lưu thất bại, có lỗi xảy ra')
        }
    }

    return (
        <>
            <motion.div variants={fadeIn} initial='initial' animate='animate' exit='exit' viewport={{ once: true }}>
                <Section className={'genre-manage-container'}>
                    <div className='section-title'>Thông tin danh mục</div>
                    <div className='row align-items-center'>
                        <div className='col-2 text-center overflow-hidden'>
                            <img
                                className='detail-genre-image'
                                onClick={() => fileInputRef?.current?.click()}
                                src={formData?.image?.url || placeholder_image}
                            />
                            <input
                                onChange={handleInputFileChange}
                                ref={fileInputRef}
                                type='file'
                                className='mt-3'
                                hidden
                            />
                        </div>
                        <div className='col-10'>
                            <FloatingInput
                                name='title'
                                value={formData.title}
                                onChange={handleChangeInput}
                                label={'Tên'}
                                placeholder='Tên'
                            />
                            <FloatingTextArea
                                name='description'
                                value={formData.description}
                                onChange={handleChangeInput}
                                label={'Mô tả'}
                                placeholder='Mô tả'
                            />
                            <div className='d-flex gap-2'>
                                <AnimationButton
                                    onClick={() => navigate('/admin/genres')}
                                    className='btn btn-secondary'>
                                    Quay lại
                                </AnimationButton>
                                <AnimationButton onClick={handleSubmit} className='btn btn-main'>
                                    Lưu thay đổi
                                </AnimationButton>
                                <AnimationButton onClick={toggleConfirmModal} className='btn btn-danger ms-auto'>
                                    Xóa danh mục này
                                </AnimationButton>
                            </div>
                        </div>
                    </div>

                    <div className='section-title mt-5 mb-2'>
                        Danh mục con
                        <AnimationButton
                            onClick={toggleAddGenreModal}
                            className='btn btn-main justify-content-center ms-2'>
                            <i className='fa-solid fa-plus me-2'></i>
                            Thêm
                        </AnimationButton>
                    </div>
                    <div className='list w-100'>
                        {genre?.childGenres?.map((item, index) => (
                            <motion.div
                                className='item'
                                variants={fadeUpCustom}
                                viewport={{ once: true }}
                                custom={index}
                                key={index}>
                                <img className='item-img' src={item.image} width={100} height={100} alt='' />
                                <div className='item-title'>{item.title}</div>
                                <div className='overlay'>
                                    <div
                                        onClick={() => {
                                            setEditChildGenre(item)
                                            toggleEditGenreModal()
                                        }}
                                        className='bg-warning text-white p-2'>
                                        <i className='fa-solid fa-pen-to-square'></i>
                                    </div>
                                    <div
                                        onClick={() => handleDeleteChild(item.id)}
                                        className='bg-danger text-white p-2'>
                                        <i className='fa-solid fa-xmark'></i>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </Section>
            </motion.div>
            <ConfirmModal
                isOpen={isOpenConfirmModal}
                toggle={toggleConfirmModal}
                submitText={'Xác nhận'}
                body={'Bạn có chắc muốn xóa danh mục này? (Thao tác này cũng sẽ xóa tất cả danh mục con của nó)'}
                title={'Xác nhận xóa danh mục này?'}
                handleSubmit={handleDelete}
            />
            <AddGenreModal
                isOpen={isOpenAddGenreModal}
                toggle={toggleAddGenreModal}
                onSubmit={handleCreateChildGenre}
            />
            <EditChildGenreModal
                isOpen={isOpenEditGenreModal}
                toggle={toggleEditGenreModal}
                editChildGenre={editChildGenre}
                onSubmit={handleEditChildGenre}
            />
        </>
    )
}

export default DetailGenre
