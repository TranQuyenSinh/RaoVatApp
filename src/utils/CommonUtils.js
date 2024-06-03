export const getCookie = name => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(';').shift()
}

export const generateFormData = data => {
    var formData = new FormData()
    Object.keys(data).forEach(key => {
        if (Array.isArray(data[key])) {
            data[key].forEach(item => formData.append([key], item))
        } else {
            formData.append([key], data[key])
        }
    })
    return formData
}
