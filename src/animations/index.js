const variants1 = {
  hidden: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.3,
      delay: 0.2,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export const animation1 = () => ({
  variants: variants1,
  initial: "hidden",
  animate: "visible",
  exit: "hidden",
});

///////////////////////////////////////

const postVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      delay: i * 0.2,
    },
  }),
};

export const postAnimation = (i) => ({
  variants: postVariants,
  initial: "hidden",
  animate: "visible",
  custom: i,
});

export const modalWrapperAnimation = () => ({
  variants: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  },
  initial: "hidden",
  animate: "visible",
  exit: "hidden",
});
export const modalAnimation = () => ({
  variants: {
    initial: {
      opacity: 0,
      y: 500,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -500,
    },
  },
  initial: "initial",
  animate: "animate",
  exit: "exit",
});
