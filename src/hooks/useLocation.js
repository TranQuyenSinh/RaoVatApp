import { useEffect, useState } from 'react'
import { axios } from '../axios'
export const useLocation = () => {
    const [provinces, setProvinces] = useState([])

    const fetchProvince = async () => {
        let { data } = await axios.get('https://provinces.open-api.vn/api/?depth=2')
        if (data?.length > 0) {
            setProvinces(
                data.map(item => ({
                    code: item.code,
                    name: item.name,
                    districts: item.districts?.map(district => ({
                        code: district.code,
                        name: district.name,
                    })),
                }))
            )
        }
    }

    const fetchDistricts = async provinceCode => {
        let districts = []
        if (provinces?.length > 0) {
            districts = provinces.find(p => p.code === +provinceCode)?.districts || []
        }
        return districts
    }

    const fetchWards = async districtCode => {
        try {
            let { data } = await axios.get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
            let wards = []
            if (data) {
                wards = data.wards?.map(ward => ({ code: ward.code, name: ward.name }))
            }
            return wards
        } catch (e) {
            return []
        }
    }

    useEffect(() => {
        fetchProvince()
    }, [])

    return [provinces, fetchDistricts, fetchWards]
}
