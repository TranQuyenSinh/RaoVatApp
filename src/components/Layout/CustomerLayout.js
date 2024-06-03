import React, { Component } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../customer/Header/Header'
import '../../styles/main.scss'
import Footer from '@pages/customer/Footer/Footer'

export class CustomerLayout extends Component {
    static displayName = CustomerLayout.name

    render() {
        return (
            <>
                <Header />
                <div className='main-content container-fluid'>
                    <Outlet />
                </div>
                <Footer />
            </>
        )
    }
}
