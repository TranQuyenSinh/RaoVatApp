export const formatNumber = num => {
    if (num) {
        return Intl.NumberFormat('vi-VN').format(num)
    }
    return 0
}
