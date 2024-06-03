import React from 'react'
import './GridAd.scss'
import AdCard from './AdCard'
import AdNotFound from '../../notfound/AdNotFound/AdNotFound'
import { motion } from 'framer-motion'
import { fadeUpCustom } from '@animation/fade'

const GridAd = ({ data }) => {
    return (
        <>
            <div className='gridAd'>
                {data && data.length > 0 ? (
                    data.map((item, index) => (
                        <motion.div
                            variants={fadeUpCustom}
                            initial='initial'
                            whileInView='animate'
                            viewport={{ once: true }}
                            custom={index}
                            key={item.id}
                            style={{ width: '20%' }}>
                            <AdCard key={item.id} ad={item} />
                        </motion.div>
                    ))
                ) : (
                    <AdNotFound />
                )}
            </div>
        </>
    )
}

export default GridAd
