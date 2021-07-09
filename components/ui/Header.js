import { motion } from "framer-motion";
import Image from "next/image";
import { useContext } from "react";
import { CursorContext } from "../../context/cursor-context";
import styles from "../../styles/Header.module.css";

export const Header = () => {
  const { cursorType, cursorChangeHandler } = useContext(CursorContext);

  return (
    <motion.header
      className={styles.wrapper}
      initial={{ opacity: 0, y: -180 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: "easeInOut", duration: 1.3, delay: 0.6 }}
    >
      <div className={styles["header-logo"]}>
        <Image
          src={"/images/ui/nike-world-logos-header.svg"}
          alt="Nike header logo"
          // layout="fill"
          width={146.41}
          height={37.07}
        />
      </div>
      <nav className={styles["nav-wrapper"]}>
        <ul
          className={styles.nav}
          onMouseEnter={() => cursorChangeHandler("hovered")}
          onMouseLeave={() => cursorChangeHandler("")}
        >
          <li>Colecciones</li>
          <li>Unite a Nosotros</li>
          <li>Nike Journal</li>
          <li>Tiendas</li>
          <li>SNKRS</li>
        </ul>
      </nav>
      <ul
        className={styles["signup-wrapper"]}
        onMouseEnter={() => cursorChangeHandler("hovered")}
        onMouseLeave={() => cursorChangeHandler("")}
      >
        <li>Iniciar sesión</li>
        <li className={styles["signup-items"]}>
          <span>Unirte</span>
          <div className={styles["signup-logo"]}>
            <Image
              src={"/images/ui/signin-user-logo.svg"}
              alt="Signup logo"
              width={18.3}
              height={18.3}
            />
          </div>
        </li>
      </ul>
    </motion.header>
  );
};
