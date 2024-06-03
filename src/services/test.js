import { axios } from '../axios'

export const fetchGenres = () => {
    return axios.get('/api/customerhome/getparentgenres')
}
