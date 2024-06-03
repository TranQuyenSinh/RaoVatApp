import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
const LoggedInRoute = () => {
    const { isLoggedIn } = useSelector(state => state.user)
    return isLoggedIn ? <Outlet /> : <Navigate to={'/login'} replace />
}

export default LoggedInRoute
