import { checkUserRole } from '@services/user'
import React, { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const AdminRoute = () => {
    const { isLoggedIn } = useSelector(state => state.user)

    useLayoutEffect(() => {
        checkUserRole()
    }, [])

    return isLoggedIn ? <Outlet /> : <Navigate to={'/admin/login'} replace />
}

export default AdminRoute
