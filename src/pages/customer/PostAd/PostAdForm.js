import React, { useEffect, useRef, useState } from 'react'
import './PostAdForm.scss'
import Section from '../../../components/customer/Section/Section'
import postAdImg from '../../../assets/images/post-ad.svg'
import GenreSelectModal from './GenreSelectModal'
import FloatingInput from '../../../components/input/CustomInput/FloatingInput'
import OutlineRadioButton from '../../../components/input/CustomRadio/OutlineRadioButton'
import { formatNumber } from '../../../utils/FormatUtils'
import FloatingTextArea from '../../../components/input/CustomInput/FloatingTextArea'
import { postAd } from '../../../services'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { checkUserIsLoggedIn } from '../../../redux/user/user.actions'
const PostAdForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const fileInput = useRef()
    const [formData, setFormData] = useState({
        status: 0,
        price: '',
        title: '',
        color: '',
        origin: '',
        description: '',
    })
    const [errorMessages, setErrorMessages] = useState({
        price: '',
        title: '',
        color: '',
        origin: '',
        description: '',
        images: '',
    })
    const [genres, setGenres] = useState([])
    const [images, setImages] = useState([])

    const [isOpenGenreModal, setIsOpenGenreModal] = useState(false)

    useEffect(() => {
        document.title = 'Rao vặt - Đăng tin'
        dispatch(checkUserIsLoggedIn())
    }, [])

    const toggleGenreModal = () => {
        setIsOpenGenreModal(!isOpenGenreModal)
    }

    const handleClickInputFile = () => {
        if (genres.length > 0) {
            fileInput.current?.click()
        }
    }

    const handleUploadImage = e => {
        let allowType = ['image/jpeg', 'image/png', 'image/webp']
        let file = e.target.files[0]
        resetErrorMessages('images')
        if (file)
            if (allowType.includes(file.type))
                setImages([
                    ...images,
                    {
                        url: URL.createObjectURL(file),
                        file: file,
                    },
                ])
            else
                setErrorMessages({
                    ...errorMessages,
                    images: 'Vui lòng chọn hình có định dạng ' + allowType.join(', '),
                })
    }

    const handleRemoveImage = image => {
        setImages(images.filter(x => x !== image))
        URL.revokeObjectURL(image.url)
    }

    const resetErrorMessages = type => {
        if (type) {
            setErrorMessages({
                ...errorMessages,
                [type]: '',
            })
        } else {
            setErrorMessages({
                ...Object.keys(errorMessages).map(key => ({ [key]: '' })),
            })
        }
    }

    const onChangeInput = e => {
        let { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const onChangePrice = e => {
        let { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value.replace(/\D/g, ''),
        })
    }

    const validateForm = () => {
        let isValid = true
        let { status, ...cpyFormData } = formData
        let errMsg = {
            price: 'Vui lòng chọn giá bán',
            price2: 'Vui lòng chọn giá hơn 15.000 đồng',
            title: 'Vui lòng chọn tiêu đề',
            color: 'Vui lòng chọn màu sắc',
            origin: 'Vui lòng chọn xuất xứ',
            description: 'Vui lòng thêm vài dòng mô tả về sản phẩm',
            images: 'Vui lòng chọn từ 1 đến 6 ảnh sản phẩm',
        }

        resetErrorMessages()

        // required
        Object.keys(cpyFormData).forEach(key => {
            if (!cpyFormData[key]) {
                isValid = false
                setErrorMessages(prev => ({
                    ...prev,
                    [key]: errMsg[key],
                }))
            }
        })

        // price
        if (+formData.price < 15000) {
            isValid = false
            setErrorMessages(prev => ({
                ...prev,
                price: errMsg.price2,
            }))
        }

        // images
        if (images.length === 0) {
            isValid = false
            setErrorMessages(prev => ({
                ...prev,
                images: errMsg.images,
            }))
        }

        return isValid
    }

    const handleSubmitForm = async () => {
        let isValidForm = validateForm()
        if (isValidForm) {
            let data = {
                ...formData,
                genreIds: [...genres.map(genre => genre.id)],
                images: [...images.map(item => item.file)],
            }
            try {
                await postAd(data)
                toast.success('Đăng tin thành công')
                navigate('/quan-ly-tin')
            } catch (e) {
                toast.error('Đăng tin không thành công, vui lòng thử lại')
            }
        }
    }
    return (
        <>
            <Section className='post-ad-container'>
                {/* Ad images */}
                <div className='image-column'>
                    <input ref={fileInput} onChange={handleUploadImage} type='file' style={{ display: 'none' }} />

                    <strong className='mb-2 d-block'>Hình ảnh sản phẩm</strong>
                    {images.length === 0 ? (
                        <div
                            onClick={handleClickInputFile}
                            className={genres.length > 0 ? 'image-select' : 'image-select disabled'}>
                            <i className='fa-regular fa-image'></i>
                            <span className='text-muted mt-2 fs-6'>Chọn tối thiểu 1 ảnh</span>
                        </div>
                    ) : (
                        <>
                            <div className='images-container'>
                                {images.map((item, index) => (
                                    <div key={index} className='image-wrapper'>
                                        <i
                                            onClick={() => handleRemoveImage(item)}
                                            className='fa-solid fa-circle-xmark remove-image-btn'></i>
                                        <img src={item.url} alt='' />
                                        {index === 0 && <div className='thumbnail-text'>Ảnh bìa</div>}
                                    </div>
                                ))}
                                {images.length <= 5 && (
                                    <div onClick={handleClickInputFile} className='image-wrapper add-image-btn'>
                                        <i className='fa-solid fa-plus'></i>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                    {errorMessages.images && <div className='invalid-feedback'>{errorMessages.images}</div>}
                </div>

                {/* Detail ad */}
                <div className='ad-column'>
                    <div onClick={toggleGenreModal} className='select-genre'>
                        {genres.length > 0 ? (
                            <span>{genres.map(item => item.title).join(', ')}</span>
                        ) : (
                            <span>Danh mục sản phẩm</span>
                        )}
                        <i className='fa-solid fa-caret-down'></i>
                    </div>

                    {genres.length === 0 ? (
                        <div className='placeholder-img-wrapper'>
                            <img className='placeholder-img' src={postAdImg} alt='' />
                            <h5 className='text-uppercase fw-bold text-center'>Đăng tin nhanh</h5>
                            <span>Chọn "Danh mục sản phẩm" để bắt đầu đăng tin</span>
                        </div>
                    ) : (
                        <>
                            <div className='post-ad-form'>
                                <h5 className='form-title'>Thông tin sản phẩm</h5>

                                <div className='mb-4'>
                                    <span className='me-4'>Tình trạng sản phẩm</span>
                                    <OutlineRadioButton
                                        className='me-2'
                                        name='status'
                                        value={0}
                                        onChange={onChangeInput}
                                        checked={+formData.status === 0}>
                                        Đã sử dụng
                                    </OutlineRadioButton>
                                    <OutlineRadioButton
                                        className='me-2'
                                        name='status'
                                        value={1}
                                        onChange={onChangeInput}
                                        checked={+formData.status === 1}>
                                        Mới
                                    </OutlineRadioButton>
                                </div>
                                <FloatingInput
                                    label={'Giá bán'}
                                    value={formatNumber(formData.price)}
                                    name='price'
                                    onChange={onChangePrice}
                                    errorMessage={errorMessages.price}
                                    required={true}
                                />
                                <FloatingInput
                                    label={'Màu sắc'}
                                    value={formData.color}
                                    name='color'
                                    onChange={onChangeInput}
                                    errorMessage={errorMessages.color}
                                    required={true}
                                />
                                <FloatingInput
                                    label={'Xuất xứ'}
                                    value={formData.origin}
                                    name='origin'
                                    onChange={onChangeInput}
                                    errorMessage={errorMessages.origin}
                                    required={true}
                                />

                                <h5 className='form-title'>Chi tiết tin đăng</h5>
                                <FloatingInput
                                    label={'Tiêu đề tin đăng'}
                                    value={formData.title}
                                    name='title'
                                    onChange={onChangeInput}
                                    errorMessage={errorMessages.title}
                                    required={true}
                                />

                                <FloatingTextArea
                                    value={formData.description}
                                    onChange={onChangeInput}
                                    name='description'
                                    required={true}
                                    rows={10}
                                    label={'Mô tả chi tiết'}
                                    errorMessage={errorMessages.description}
                                />

                                <div onClick={handleSubmitForm} className='btn btn-main w-100'>
                                    Đăng tin
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </Section>

            <GenreSelectModal
                isOpen={isOpenGenreModal}
                toggle={toggleGenreModal}
                onSubmit={genres => setGenres(genres)}
            />
        </>
    )
}

export default PostAdForm
