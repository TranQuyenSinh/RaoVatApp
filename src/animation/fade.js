export const fadeUp = {
    initial: {
        y: 100,
        opacity: 0,
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: { type: 'tween', duration: 0.7 },
    },
}
export const fadeUpCustom = {
    initial: {
        opacity: 0,
        y: 100,
    },
    animate: index => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.04 * index,
        },
    }),
}
export const fadeDown = {
    initial: {
        y: -100,
        opacity: 0,
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: { type: 'tween', duration: 0.7 },
    },
    exit: {
        y: -100,
        opacity: 0,
    },
}

export const fadeRight = {
    initial: {
        x: -100,
        opacity: 0,
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: { type: 'tween', duration: 0.7 },
    },
}

export const fadeLeft = {
    initial: {
        x: 200,
        opacity: 0,
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: { type: 'tween', duration: 0.7 },
    },
}

export const fadeIn = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: { duration: 0.3 },
    },
    exit: {
        opacity: 0,
        // transition: { duration: 0.3},
    },
}

export const fadeOut = {
    initial: {
        opacity: 1,
    },
    animate: {
        opacity: 0,
        transition: { duration: 0.3 },
    },
}
