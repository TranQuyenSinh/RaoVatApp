const useChangeInputFile = (
    formData,
    setFormData,
    setImageError,
    allowType = ['image/jpeg', 'image/png', 'image/webp']
) => {
    return e => {
        let file = e.target.files[0]
        setImageError && setImageError('')
        if (file)
            if (allowType.includes(file.type)) {
                URL.revokeObjectURL(formData.image?.url)
                setFormData({
                    ...formData,
                    image: {
                        url: URL.createObjectURL(file),
                        file: file,
                    },
                })
            } else {
                setImageError && setImageError('Vui lòng chọn hình có định dạng ' + allowType.join(', '))
            }
    }
}

export default useChangeInputFile
