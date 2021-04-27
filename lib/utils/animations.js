export const pageContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.5
        }
    }
};

export const pageItem = {
    hidden: { opacity: 0, y: -400 },
    show: { opacity: 1, y: 0 }
};