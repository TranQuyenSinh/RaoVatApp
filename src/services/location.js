import axios from 'axios'

export const getAllLocations = async () => {
    let { data } = await axios.get('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json')
    return data.map(item => item.Name)
}
