import React from 'react'
import { ToastContainer, Zoom, cssTransition } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './CustomToastContainer.scss'

const CustomTransition = cssTransition({
    enter: 'fadeIn',
    exit: 'fadeOut',
    collapseDuration: 200,
})

const CustomToastContainer = () => {
    return (
        <ToastContainer
            position='bottom-center'
            autoClose={2000}
            limit={1}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={false}
            theme='dark'
            transition={CustomTransition}
        />
    )
}

export default CustomToastContainer
