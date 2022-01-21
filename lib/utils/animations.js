export const pageContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.5,
        },
    },
};

export const pageItem = {
    hidden: { opacity: 0, y: -400 },
    show: { opacity: 1, y: 0 },
};

export const mealFormAnimation = {
    expanded: {
        y: 0,
        height: '100%',
        minHeight: '618px',
        opacity: 1,
        transition: 'easeInOut',
    },
    collapsed: {
        y: -200,
        height: '0%',
        opacity: 0,
        transition: 'easeInOut',
    },
};

const spring = {
    type: 'spring',
    damping: 10,
    stiffness: 100,
};

export const suggestButton = {
    spin: {
        rotate: 0,
        transition: spring,
        opacity: 1,
    },
    spun: {
        rotate: 540,
        transition: spring,
        opacity: 0.5,
    },
};
