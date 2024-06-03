import { motion } from 'framer-motion'

export const tapAnimation = {
    initial: {
        scale: 1,
    },
    animate: {
        scale: [0.95, 1],
        transition: {
            duration: 0.2,
        },
    },
}

export const AnimationButton = ({ children, ...props }) => {
    return (
        <motion.div variants={tapAnimation} whileTap='animate' {...props}>
            {children}
        </motion.div>
    )
}
