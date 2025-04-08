export const expand = {
    initial: {
      top: 0,
      opacity: 1, // Translucent to start
    },
    enter: (i) => ({
      top: "100vh",
      opacity: 0.2,
      transition: {
        duration: 1,
        delay: 0.05 * i,
        ease: [0.215, 0.61, 0.355, 1],
      },
      transitionEnd: { height: "0", top: "0" },
    }),
    exit: (i) => ({
      height: "100vh",
      opacity: 1,
      transition: {
        opacity: {
          duration: 0.4,
          delay: 0.05 * i,
          ease: [0.215, 0.61, 0.355, 1],
        },
        height: {
          duration: 0.4,
          delay: 0.05 * i,
          ease: [0.215, 0.61, 0.355, 1],
        },
      },
    }),
}
  


export const opacity = {
    initial: {
        opacity: 0.5
    },
    enter: {
        opacity: 0
    },
    exit: {
        opacity: 0.5,
        
    }
}