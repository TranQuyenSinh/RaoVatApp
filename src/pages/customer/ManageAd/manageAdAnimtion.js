export const fadeLeftAnimation = {
    initial: {
        x: 100,
        opacity: 0,
    },
    animate: index => ({
        x: 0,
        opacity: 1,
        transition: { type: 'tween', delay: index * 0.05 },
    }),
}

export const fadeOut = {
    initial: {
        scale: 0,
        opacity: 0,
    },
    animate: {
        scale: 1,
        opacity: 1,
        transition: { type: 'tween', duration: 0.3 },
    },
}
