import { motion } from "framer-motion";
import Image from "next/image";
import { useContext } from "react";
import { CursorContext } from "../../context/cursor-context";
import styles from "../../styles/MainDescription.module.css";

export const MainDescription = () => {
  const { cursorType, cursorChangeHandler } = useContext(CursorContext);

  return (
    <section className={styles.wrapper}>
      <motion.div
        className={styles.title}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          ease: "easeInOut",
          duration: 1,
          delay: 2.2,
        }}
      >
        Wmns Air Force 1 Crater
      </motion.div>
      <motion.div
        className={styles.description}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          ease: "easeInOut",
          duration: 1,
          delay: 2.3,
        }}
      >
        <p>
          Una nueva propuesta para el ícono, la Nike Air Force 1 Crater combina
          el estilo clásico del básquetbol con nuevos materiales recuperados.
        </p>
      </motion.div>
      <motion.div
        className={styles["actions-wrapper"]}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          ease: "easeInOut",
          duration: 1,
          delay: 2.4,
        }}
      >
        <div
          className={styles["see-more-wrapper"]}
          onMouseEnter={() => cursorChangeHandler("hovered")}
          onMouseLeave={() => cursorChangeHandler("")}
        >
          <div className={styles["see-more-arrow"]}>
            <Image
              src={"/images/ui/arrow-see-more.svg"}
              alt="Nike header logo"
              // layout="fill"
              width={70}
              height={10}
            />
          </div>
          <span>VER MÁS</span>
        </div>
        <div
          className={styles["buy-wrapper"]}
          onMouseEnter={() => cursorChangeHandler("hovered")}
          onMouseLeave={() => cursorChangeHandler("")}
        >
          <div className={styles["buy-arrow"]}>
            <Image
              src={"/images/ui/arrow-buy.svg"}
              alt="Nike header logo"
              // layout="fill"
              width={55}
              height={10}
            />
          </div>
          <span className={styles.buy}>COMPRAR</span>
        </div>
      </motion.div>
    </section>
  );
};
