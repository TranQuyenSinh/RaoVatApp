import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { CustomerPrivateRoutes, CustomerPublicRoutes, SystemPrivateRoutes } from './routes'
import LoggedInRoute from './components/customRoute/LoggedInRoute'
import { Login } from './pages/customer/auth/Login'
import CustomerPageNotFound from './pages/404/CustomerPageNotFound'
import { Register } from './pages/customer/auth/Register'
import CustomToastContainer from './components/toast/CustomToastContainer'
import './styles/custom.scss'
import SystemPageNotFound from '@pages/404/SystemPageNotFound'
import AdminLogin from '@pages/admin/Auth/AdminLogin'
import AdminRoute from '@components/customRoute/AdminRoute'
import SystemNotAllow from '@pages/404/SystemNotAllow'
import { CustomerLayout } from '@components/Layout/CustomerLayout'
import SystemLayout from '@components/Layout/SystemLayout'

const App = () => {
    return (
        <>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/not-allow' element={<SystemNotAllow />} />
                <Route path='/admin/login' element={<AdminLogin />} />

                <Route path='/' element={<CustomerLayout />}>
                    {/* Public customer routes */}
                    {CustomerPublicRoutes.map((route, index) => {
                        const { element, ...rest } = route
                        return <Route key={index} {...rest} element={element} />
                    })}
                    {/* Private customer routes */}
                    <Route element={<LoggedInRoute />}>
                        {CustomerPrivateRoutes.map((route, index) => {
                            const { element, ...rest } = route
                            return <Route key={index} {...rest} element={element} />
                        })}
                    </Route>
                    <Route path='*' element={<CustomerPageNotFound />} />
                </Route>

                <Route path='/admin' element={<SystemLayout />}>
                    <Route element={<AdminRoute />}>
                        {SystemPrivateRoutes.map((route, index) => {
                            return <Route key={index} {...route} />
                        })}
                    </Route>
                    <Route path='*' element={<SystemPageNotFound />} />
                </Route>
            </Routes>
            <CustomToastContainer />
        </>
    )
}

export default App
