import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const useRetrieveData = (action, selector) => {
    const [returnData, setReturnData] = useState()
    const reduxData = useSelector(selector)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(action())
    }, [])

    useEffect(() => {
        setReturnData(reduxData)
    }, [reduxData])

    return returnData ? [returnData.isLoading, returnData.data] : [true, undefined]
}
