import React from 'react'
import './FloatForm.scss'
import { AnimatePresence, motion } from 'framer-motion'

const fade = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: { duration: 0.3 },
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.3 },
    },
}

const float = {
    initial: {
        x: '100vw',
    },
    animate: {
        x: 0,
        transition: { duration: 0.7, type: 'tween' },
    },
    exit: {
        x: '100vw',
        transition: { duration: 0.7 },
    },
}
const FloatForm = ({ isOpen, toggle }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className='float-overlay'
                        variants={fade}
                        initial='initial'
                        animate='animate'
                        exit={'exit'}
                        onClick={toggle}>
                        <motion.div onClick={e => e.stopPropagation()} variants={float} className='float-form'>
                            <h2>Đăng nhập</h2>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default FloatForm
