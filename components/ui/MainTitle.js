import { motion } from "framer-motion";
import styles from "../../styles/MainTitle.module.css";

const transition = { duration: 1.4, ease: [0.6, 0.01, -0.05, 0.9] };
const word = {
  initial: {
    y: 0,
    scaleX: 1,
    scaleY: 1.24,
  },
  animate: {
    y: 0,
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

const letter = {
  initial: {
    y: 400,
  },
  animate: {
    y: 0,
    transition: { duration: 1, ...transition },
  },
};

export const MainTitle = () => {
  return (
    <motion.section
      className={styles.wrapper}
      classname={styles.animation}
      variants={word}
      initial="initial"
      animate="animate"
    >
      <motion.span variants={letter} className={styles.nike}>
        N
      </motion.span>
      <motion.span variants={letter} className={styles.nike}>
        I
      </motion.span>
      <motion.span variants={letter} className={styles.nike}>
        K
      </motion.span>
      <motion.span variants={letter} className={styles.nike}>
        E
      </motion.span>
      <motion.span variants={letter}>&nbsp;</motion.span>
      <motion.span variants={letter}>M</motion.span>
      <motion.span variants={letter}>O</motion.span>
      <motion.span variants={letter}>V</motion.span>
      <motion.span variants={letter}>E</motion.span>
      <motion.span variants={letter}>&nbsp;</motion.span>
      <motion.span variants={letter}>T</motion.span>
      <motion.span variants={letter}>O</motion.span>
      <motion.span variants={letter}>&nbsp;</motion.span>
      <motion.span variants={letter}>Z</motion.span>
      <motion.span variants={letter}>E</motion.span>
      <motion.span variants={letter}>R</motion.span>
      <motion.span variants={letter}>O</motion.span>
      {/* </motion.div> */}
    </motion.section>
  );
};
