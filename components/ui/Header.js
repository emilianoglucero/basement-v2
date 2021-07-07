import Image from "next/image";
import styles from "../../styles/Header.module.css";
export const Header = () => {
  return (
    <header className={styles.wrapper}>
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
        <ul className={styles.nav}>
          <li>Colecciones</li>
          <li>Unite a Nosotros</li>
          <li>Nike Journal</li>
          <li>Tiendas</li>
          <li>SNKRS</li>
        </ul>
      </nav>
      <ul className={styles["signup-wrapper"]}>
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
    </header>
  );
};
